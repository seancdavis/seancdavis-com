import type { NotionDividerBlock } from "../../types/notion";

export class DividerBlock {
  constructor(_: NotionDividerBlock) {}

  render() {
    return "---";
  }
}
