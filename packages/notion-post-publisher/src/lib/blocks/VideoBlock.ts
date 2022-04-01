import type {
  NotionVideoBlock,
  NotionRichText,
  NotionColor,
} from "../../types/notion";

import { renderRichText } from "../../utils/render-utils";

export class VideoBlock {
  // rich_text: Array<NotionRichText>;
  // color: NotionColor;

  constructor(params: NotionVideoBlock) {
    console.log(params);
  }

  render() {
    return `Video goes here ...\n`;
  }
}
