import type { NotionDividerBlock } from "../../types/notion";

export class DividerBlock {
  type: "divider";

  constructor(_: NotionDividerBlock) {
    this.type = "divider";
  }

  render() {
    return "---\n";
  }
}
