import type { NotionHeading2Block, NotionRichText } from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class Heading2Block {
  text: string;

  constructor(params: NotionHeading2Block) {
    this.text = renderRichText(params.heading_2.rich_text);
  }

  render() {
    return `## ${this.text}\n`;
  }
}
