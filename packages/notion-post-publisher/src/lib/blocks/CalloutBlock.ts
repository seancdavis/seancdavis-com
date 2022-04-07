import type { NotionCalloutBlock } from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class CalloutBlock {
  text: string;

  constructor(params: NotionCalloutBlock) {
    this.text = renderRichText(params.callout.rich_text);
  }

  render() {
    return `{% callout type="note" %}\n${this.text}\n{% endcallout %}`;
  }
}
