import type { NotionBlock, NotionCalloutBlock } from "../../types/notion";

import { renderRichText, trailingNewlines } from "../../utils/render-utils";
import { Block, CreatableBlock } from "../Block";

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
    let childBlocks: CreatableBlock[] = [];
    for (const child of this.children) {
      const block = await Block.create(child);
      childBlocks.push(block);
      // Run prerender if necessary()
      if ("prerender" in block) await block.prerender();
    }
    // Add children rendered text to callout's text.
    const childText = childBlocks
      .map((block, idx) => block.render() + trailingNewlines(childBlocks, idx))
      .join("");
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
}
