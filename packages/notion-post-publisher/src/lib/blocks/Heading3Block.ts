import type { NotionHeading3Block, NotionRichText } from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class Heading3Block {
  text: string;

  constructor(params: NotionHeading3Block) {
    this.text = renderRichText(params.heading_3.rich_text);
  }

  render() {
    return `### ${this.text}\n`;
  }
}
