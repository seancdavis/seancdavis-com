import type { NotionQuoteBlock, NotionColor } from "../../types/notion";

import { renderRichText, trailingNewlines } from "../../utils/render-utils";
import { Block } from "../Block";

export class QuoteBlock {
  text: string;
  color: NotionColor;

  constructor(params: NotionQuoteBlock) {
    this.color = params.quote.color;
    this.text = renderRichText(params.quote.rich_text);
    if (params.has_children && params.children && params.children.length > 0) {
      const childBlocks = (params.children ?? []).map((child) => {
        return Block.create(child);
      });
      const childText = childBlocks
        .map((block, idx) => {
          let text = `> ${block.render()}`;
          const newlines = trailingNewlines(childBlocks, idx);
          // Add the necessary syntax to double newlines.
          text += newlines === "\n\n" ? "\n>\n" : "\n";
          return text;
        })
        .join("");
      this.text += `\n>\n${childText}`;
    }
  }

  render() {
    return `> ${this.text}`;
  }
}
