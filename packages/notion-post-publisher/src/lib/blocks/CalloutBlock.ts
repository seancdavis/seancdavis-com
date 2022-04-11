import type { NotionCalloutBlock } from "../../types/notion";

import { renderRichText, trailingNewlines } from "../../utils/render-utils";
import { Block } from "../Block";

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
    this.type = this.getType(params.callout.icon);
    this.text = renderRichText(params.callout.rich_text) + "\n";
    if (params.has_children && params.children && params.children.length > 0) {
      const childBlocks = (params.children ?? []).map((child) => {
        return Block.create(child);
      });
      const childText = childBlocks
        .map((block, idx) => {
          return block.render() + trailingNewlines(childBlocks, idx);
        })
        .join("");
      this.text += `\n${childText}`;
    }
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
    return `{% callout type="${this.type}" %}\n${this.text}{% endcallout %}`;
  }
}
