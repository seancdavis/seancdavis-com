import type { NotionBulletedListItemBlock } from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class BulletedListItemBlock {
  text: string;

  constructor(params: NotionBulletedListItemBlock) {
    this.text = renderRichText(params.bulleted_list_item.rich_text);
  }

  render() {
    return `- ${this.text}`;
  }
}
