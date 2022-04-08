import type { NotionCalloutBlock } from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export const CalloutTypeMap: { [key: string]: string } = {
  "⚠️": "warning",
  "⚡": "tip",
  "📋": "tl;dr",
  "💡": "idea",
};

export class CalloutBlock {
  text: string;
  type: string;

  constructor(params: NotionCalloutBlock) {
    this.text = renderRichText(params.callout.rich_text);
    this.type = this.getType(params.callout.icon);
  }

  /**
   * Determines the type for the callout, following the emoji map at the top of
   * this file. Default is `note`.
   *
   * @param icon Icon object from Notion response
   * @returns String to use as the callout type
   */
  private getType(icon: NotionCalloutBlock["callout"]["icon"]) {
    if (
      icon &&
      icon.type === "emoji" &&
      Object.keys(CalloutTypeMap).includes(icon.emoji)
    ) {
      return CalloutTypeMap[icon.emoji];
    }
    return "note";
  }

  render() {
    return `{% callout type="${this.type}" %}\n${this.text}\n{% endcallout %}`;
  }
}
