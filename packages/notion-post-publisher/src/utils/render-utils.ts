import { Block } from "../lib/Block";
import { BulletedListItemBlock, NumberedListItemBlock } from "../lib/blocks";
import { NotionRichText } from "../types/notion";

/**
 * Given a an array of rich text objects from Notion, return a markdown string.
 *
 * @returns {string} Text to render to the markdown file.
 */
export function renderRichText(richText: NotionRichText[]): string {
  return richText.map((text) => renderRichTextItem(text)).join("");
}

/**
 * Given a rich text object from Notion, return the resulting markdown string.
 *
 * @returns {string} Text to render to the markdown file.
 */
function renderRichTextItem(richText: NotionRichText): string {
  if (richText.type !== "text") {
    throw new Error(`Rich text type not supported: ${richText.type}`);
  }
  if (richText.text.link) {
    return `[${richText.text.content}](${richText.text.link.url})`;
  }
  let content = richText.text.content;
  // Wrap the text in annotations, as necessary.
  if (richText.annotations.code) content = `\`${content}\``;
  if (richText.annotations.italic) content = `_${content}_`;
  if (richText.annotations.bold) content = `**${content}**`;
  return content;
}

/**
 * Determine the number of newlines to insert after a specific block within a
 * series of blocks.
 *
 * @param blocks An array of supported block types
 * @param index The current index from the array
 * @returns A string representing the number of newlines to follow
 */
export function trailingNewlines(
  blocks: ReturnType<typeof Block.create>[],
  index: number
): string {
  const block = blocks[index];
  // All blocks other than lists always get two newlines
  if (
    !(block instanceof BulletedListItemBlock) &&
    !(block instanceof NumberedListItemBlock)
  ) {
    return "\n\n";
  }
  // If there isn't a next item, return a single newline.
  if (!blocks[index + 1]) return "\n";
  // Bulleted and numbered list items get one only if the subsequent item is
  // of the same type.
  if (block.constructor === blocks[index + 1].constructor) return "\n";
  // Otherwise, return two.
  return "\n\n";
}
