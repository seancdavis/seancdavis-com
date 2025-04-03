import type {
  NotionBlock,
  NotionColor,
  NotionQuoteBlock,
} from "../../types/notion";
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
import { ToggleBlock } from "./ToggleBlock";
import { VideoBlock } from "./VideoBlock";

const QuoteChildBlockMap = {
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
  toggle: ToggleBlock,
  video: VideoBlock,
};

type QuoteChildBlockType = keyof typeof QuoteChildBlockMap;
type QuoteChildBlock =
  QuoteChildBlockType extends keyof typeof QuoteChildBlockMap
    ? InstanceType<(typeof QuoteChildBlockMap)[QuoteChildBlockType]>
    : never;

export class QuoteBlock {
  text: string;
  color: NotionColor;
  processedChildren: boolean = false;
  children: NotionBlock[];

  constructor(params: NotionQuoteBlock) {
    this.color = params.quote.color;
    this.text = renderRichText(params.quote.rich_text);
    this.children = params.children ?? [];
  }

  async prerender() {
    // Escape if there are no children.
    if (this.children.length === 0) {
      this.processedChildren = true;
      return;
    }
    // Create blocks from children data.
    let childBlocks: QuoteChildBlock[] = [];
    for (const child of this.children) {
      const block = await this.createChildBlocks(child);
      childBlocks.push(block);
      // Run prerender if necessary()
      if ("prerender" in block) await block.prerender();
    }
    // Add children rendered text to callout's text.
    const childText = renderBlocks(childBlocks, "> ");
    this.text += `\n>\n${childText}`;
    // Children have been processed.
    this.processedChildren = true;
  }

  render() {
    if (!this.processedChildren) {
      const msg = "Children have not been processed. Call prerender() first.";
      throw new Error(msg);
    }
    return `> ${this.text}`;
  }

  private async createChildBlocks(
    params: NotionBlock
  ): Promise<QuoteChildBlock> {
    logger.debug(`Creating child quote block: ${params.type}`);
    // If the block is not supported, throw an error.
    if (!Object.keys(QuoteChildBlockMap).includes(params.type)) {
      throw new Error(`Block not supported: ${params.type}`);
    }
    // Otherwise, pick a block from the allowed children and return a new
    // instance of it.
    const blockType = params.type as keyof typeof QuoteChildBlockMap;
    const block = new QuoteChildBlockMap[blockType](params as any);
    // If prerender() exists on the block instance, run it.
    if ("prerender" in block) await block.prerender();
    // Return the block instance.
    return block;
  }
}
