import type { NotionParagraphBlock, NotionColor } from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class ParagraphBlock {
  text: string;
  color: NotionColor;

  constructor(params: NotionParagraphBlock) {
    this.text = renderRichText(params.paragraph.rich_text);
    this.color = params.paragraph.color;
  }

  render() {
    return this.text;
  }
}
