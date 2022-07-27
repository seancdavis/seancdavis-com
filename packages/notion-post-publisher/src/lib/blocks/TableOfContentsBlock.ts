import type { NotionTableOfContentsBlock } from "../../types/notion";

/**
 * This block does nothing. Its render() method returns null.
 */
export class TableOfContentsBlock {
  constructor(_: NotionTableOfContentsBlock) {}

  render() {
    return null;
  }
}
