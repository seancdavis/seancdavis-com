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
  return richText.text.content;
}
