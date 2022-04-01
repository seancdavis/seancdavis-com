import type {
  NotionParagraphBlock,
  NotionRichText,
  NotionColor,
} from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class ParagraphBlock {
  rich_text: Array<NotionRichText>;
  color: NotionColor;

  constructor(params: NotionParagraphBlock) {
    this.rich_text = params.paragraph.rich_text;
    this.color = params.paragraph.color;
  }

  render() {
    const text = this.rich_text.map((text) => renderRichText(text)).join("");
    return `${text}\n`;
  }
}
