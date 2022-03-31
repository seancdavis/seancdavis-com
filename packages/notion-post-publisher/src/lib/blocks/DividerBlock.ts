import type { DividerBlockResponse } from "../../types/notion";

export class DividerBlock {
  type: "divider";

  constructor(_: DividerBlockResponse) {
    this.type = "divider";
  }

  render() {
    return "---\n";
  }
}
