import type {
  ParagraphBlockResponse,
  RichTextItemResponse,
  ApiColor,
} from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class ParagraphBlock {
  type: "paragraph";
  rich_text: Array<RichTextItemResponse>;
  color: ApiColor;

  constructor(params: ParagraphBlockResponse) {
    this.type = "paragraph";
    this.rich_text = params.paragraph.rich_text;
    this.color = params.paragraph.color;
    // console.log(this.rich_text);
    // console.log(params);
  }

  render() {
    const text = this.rich_text.map((text) => renderRichText(text)).join("");
    return `${text}\n`;
  }
}
