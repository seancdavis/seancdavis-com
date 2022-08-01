import type { NotionChildPageBlock } from "../../types/notion";

/**
 * This block does nothing. Its render() method returns null.
 */
export class ChildPageBlock {
  constructor(_: NotionChildPageBlock) {}

  render() {
    return null;
  }
}
