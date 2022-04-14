import type { NotionHeading1Block, NotionRichText } from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class Heading1Block {
  text: string;

  constructor(params: NotionHeading1Block) {
    this.text = renderRichText(params.heading_1.rich_text);
  }

  render() {
    return `# ${this.text}`;
  }
}
