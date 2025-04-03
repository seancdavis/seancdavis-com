import type { NotionBlock, NotionCalloutBlock } from "../../types/notion";
import { logger } from "../../utils/logger-utils";
import { renderBlocks, renderRichText } from "../../utils/render-utils";

import { BulletedListItemBlock } from "./BulletedListItemBlock";
import { CodeBlock } from "./CodeBlock";
import { DividerBlock } from "./DividerBlock";
import { EmbedBlock } from "./EmbedBlock";
import { Heading1Block } from "./Heading1Block";
import { Heading2Block } from "./Heading2Block";
import { Heading3Block } from "./Heading3Block";
import { ImageBlock } from "./ImageBlock";
import { NumberedListItemBlock } from "./NumberedListItemBlock";
import { ParagraphBlock } from "./ParagraphBlock";
import { QuoteBlock } from "./QuoteBlock";
import { ToggleBlock } from "./ToggleBlock";
import { VideoBlock } from "./VideoBlock";

const CalloutChildBlockMap = {
  bulleted_list_item: BulletedListItemBlock,
  code: CodeBlock,
  divider: DividerBlock,
  embed: EmbedBlock,
  heading_1: Heading1Block,
  heading_2: Heading2Block,
  heading_3: Heading3Block,
  image: ImageBlock,
  numbered_list_item: NumberedListItemBlock,
  paragraph: ParagraphBlock,
  quote: QuoteBlock,
  toggle: ToggleBlock,
  video: VideoBlock,
};

type CalloutChildBlockType = keyof typeof CalloutChildBlockMap;
type CalloutChildBlock =
  CalloutChildBlockType extends keyof typeof CalloutChildBlockMap
    ? InstanceType<(typeof CalloutChildBlockMap)[CalloutChildBlockType]>
    : never;

export const CalloutTypeMap: { [key: string]: string } = {
  "⚠️": "warning",
  "⚡": "tip",
  "📋": "tl;dr",
  "💡": "idea",
};

export class CalloutBlock {
  text: string;
  type: string;
  processedChildren: boolean = false;
  children: NotionBlock[];

  constructor(params: NotionCalloutBlock) {
    this.type = this.getType(params.callout.icon);
    this.text = renderRichText(params.callout.rich_text) + "\n";
    this.children = params.children ?? [];
  }

  /**
   * Determines the type for the callout, following the emoji map at the top of
   * this file. Default is `note`.
   *
   * @param icon Icon object from Notion response
   * @returns String to use as the callout type
   */
  private getType(icon: NotionCalloutBlock["callout"]["icon"]) {
    if (
      icon &&
      icon.type === "emoji" &&
      Object.keys(CalloutTypeMap).includes(icon.emoji)
    ) {
      return CalloutTypeMap[icon.emoji];
    }
    return "note";
  }

  async prerender() {
    // Escape if there are no children.
    if (this.children.length === 0) {
      this.processedChildren = true;
      return;
    }
    // Create blocks from children data.
    let childBlocks: CalloutChildBlock[] = [];
    for (const child of this.children) {
      const block = await this.createChildBlocks(child);
      childBlocks.push(block);
      // Run prerender if necessary()
      if ("prerender" in block) await block.prerender();
    }
    // Add children rendered text to callout's text.
    const childText = renderBlocks(childBlocks);
    this.text += `\n${childText}`;
    // Children have been processed.
    this.processedChildren = true;
  }

  render() {
    if (!this.processedChildren) {
      const msg = "Children have not been processed. Call prerender() first.";
      throw new Error(msg);
    }
    return `{% callout type="${this.type}" %}\n${this.text}{% endcallout %}`;
  }

  private async createChildBlocks(
    params: NotionBlock
  ): Promise<CalloutChildBlock> {
    logger.debug(`Creating child callout block: ${params.type}`);
    // If the block is not supported, throw an error.
    if (!Object.keys(CalloutChildBlockMap).includes(params.type)) {
      throw new Error(`Block not supported: ${params.type}`);
    }
    // Otherwise, pick a block from the allowed children and return a new
    // instance of it.
    const blockType = params.type as keyof typeof CalloutChildBlockMap;
    const block = new CalloutChildBlockMap[blockType](params as any);
    // If prerender() exists on the block instance, run it.
    if ("prerender" in block) await block.prerender();
    // Return the block instance.
    return block;
  }
}
