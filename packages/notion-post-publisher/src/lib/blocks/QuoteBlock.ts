import type { NotionQuoteBlock, NotionColor } from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class QuoteBlock {
  text: string;
  color: NotionColor;

  constructor(params: NotionQuoteBlock) {
    this.text = renderRichText(params.quote.rich_text);
    this.color = params.quote.color;
  }

  render() {
    return `> ${this.text}`;
  }
}
