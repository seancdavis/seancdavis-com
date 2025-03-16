"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderBlocks = exports.trailingNewlines = exports.renderRichText = void 0;
const chalk_1 = __importDefault(require("chalk"));
const blocks_1 = require("../lib/blocks");
/**
 * Given a an array of rich text objects from Notion, return a markdown string.
 *
 * @returns {string} Text to render to the markdown file.
 */
function renderRichText(richText) {
    return richText.map((text) => renderRichTextItem(text)).join("");
}
exports.renderRichText = renderRichText;
/**
 * Replaces characters used in Notion with those better suited for markdown
 * files.
 *
 * @param text Text to be sanitized
 * @returns Text with characters replaced for markdown usage
 */
function sanitizeText(text) {
    return text
        .replace(/…/g, "...")
        .replace(/[“|”]/g, '"')
        .replace(/[’|’]/g, "'");
}
/**
 * Given a rich text object from Notion, return the resulting markdown string.
 *
 * @returns {string} Text to render to the markdown file.
 */
function renderRichTextItem(richText) {
    // A mention appears as a link, but the link is to a Notion page, which is
    // likely inaccessible to the public. We log and ignore these for now.
    if (richText.type === "mention") {
        const msg = `Mention found: ${richText.plain_text} (${richText.href})`;
        console.log(chalk_1.default.cyan.bold("[info]"), msg);
        return "";
    }
    if (richText.type !== "text") {
        throw new Error(`Rich text type not supported: ${richText.type}`);
    }
    if (richText.text.link) {
        // Remove site domain from the URL to make it an internal link. Otherwise it
        // will open in a new tab within the post.
        const url = richText.text.link.url.replace(/^https?:\/\/www\.seancdavis\.com\//, "/");
        return `[${sanitizeText(richText.text.content)}](${url})`;
    }
    return wrapRichTextItem(sanitizeText(richText.text.content), richText.annotations);
}
/**
 * Wrap the text in the appropriate markdown annotations.
 *
 * @param content Content from the rich text object
 * @param annotations Annotation flags from the rich text object
 * @returns Rich text with the proper markdown annotations
 */
function wrapRichTextItem(content, annotations) {
    const leadingWhitespace = (content.match(/^\s+/) || [""])[0];
    const trailingWhitespace = (content.match(/\s+$/) || [""])[0];
    let text = content.trim();
    if (annotations.code)
        text = `\`${text}\``;
    if (annotations.italic)
        text = `_${text}_`;
    if (annotations.bold)
        text = `**${text}**`;
    return `${leadingWhitespace}${text}${trailingWhitespace}`;
}
/**
 * Determine the number of newlines to insert after a specific block within a
 * series of blocks.
 *
 * @param blocks An array of supported block types
 * @param index The current index from the array
 * @returns A string representing the number of newlines to follow
 */
function trailingNewlines(blocks, index) {
    const block = blocks[index];
    // If there isn't a next item, return a single newline.
    if (!blocks[index + 1])
        return "\n";
    // All blocks other than lists always get two newlines
    if (!(block instanceof blocks_1.BulletedListItemBlock) &&
        !(block instanceof blocks_1.NumberedListItemBlock)) {
        return "\n\n";
    }
    // Bulleted and numbered list items get one only if the subsequent item is
    // of the same type.
    if (block.constructor === blocks[index + 1].constructor)
        return "\n";
    // Otherwise, return two.
    return "\n\n";
}
exports.trailingNewlines = trailingNewlines;
/**
 * Render an array of blocks to a markdown string.
 *
 * @param blocks An array of supported block types
 * @param linePrefix Preceding string to insert before each line
 * @returns String of markdown
 */
function renderBlocks(blocks, linePrefix) {
    return blocks
        .map((block, idx) => {
        let text = block.render();
        // If the render method doesn't return a string, skip it.
        if (!text)
            return "";
        // If necessary, prepend the line with the designated characters.
        if (linePrefix)
            text = `${linePrefix ?? ""}${text}`;
        // Add newlines after the block ...
        const newlines = trailingNewlines(blocks, idx);
        // ... inserting the prefix as necessary
        text += newlines === "\n\n" ? `\n${linePrefix ?? ""}\n` : "\n";
        return text;
    })
        .join("");
}
exports.renderBlocks = renderBlocks;
