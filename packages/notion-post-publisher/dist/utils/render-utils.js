"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderRichText = void 0;
/**
 * Given a rich text object from Notion, return the resulting markdown string.
 *
 * @returns {string} Text to render to the markdown file.
 */
function renderRichText(richText) {
    if (richText.type !== "text") {
        throw new Error(`Rich text type not supported: ${richText.type}`);
    }
    if (richText.text.link) {
        return `[${richText.text.content}](${richText.text.link.url})`;
    }
    return richText.text.content;
}
exports.renderRichText = renderRichText;
