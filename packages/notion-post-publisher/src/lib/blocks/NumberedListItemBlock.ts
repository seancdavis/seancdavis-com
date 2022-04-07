import type { NotionNumberedListItemBlock } from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class NumberedListItemBlock {
  text: string;

  constructor(params: NotionNumberedListItemBlock) {
    this.text = renderRichText(params.numbered_list_item.rich_text);
  }

  render() {
    return `1. ${this.text}`;
  }
}
