import type { NotionImageBlock, NotionColor } from "../../types/notion";

// import { renderRichText } from "../../utils/render-utils";

export class ImageBlock {
  // text: string;
  // color: NotionColor;

  constructor(params: NotionImageBlock) {
    // this.text = renderRichText(params.quote.rich_text);
    // this.color = params.quote.color;
  }

  render() {
    // return `> ${this.text}\n`;
    return "I am an image";
  }
}
