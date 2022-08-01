import type {
  NotionQuoteBlock,
  NotionColor,
  NotionBlock,
} from "../../types/notion";

import { renderBlocks, renderRichText } from "../../utils/render-utils";
import { Block, CreatableBlock } from "../Block";

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
    let childBlocks: CreatableBlock[] = [];
    for (const child of this.children) {
      const block = await Block.create(child);
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
}
