import type { NotionCalloutBlock, NotionColor } from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class CalloutBlock {
  text: string;
  color: NotionColor;

  constructor(params: NotionCalloutBlock) {
    this.text = renderRichText(params.callout.rich_text);
    this.color = params.callout.color;
  }

  render() {
    return `??? ${this.text}\n`;
  }
}
