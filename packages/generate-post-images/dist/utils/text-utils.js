"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTitle = void 0;
/**
 * Builds a string to use to set the current font on the canvas.
 */
function fontString(fontSize) {
    return `bold ${fontSize}pt 'DM Serif Display'`;
}
/**
 * Given a title, split it in two lines.
 */
function splitLines(title) {
    // Maximum number of characters in the first line is half the total title
    // length.
    const maxChars = title.length / 2;
    // Split the string into an array of words.
    const allWords = title.split(" ");
    // Control that tells the reducer to stop adding words.
    let lineBroken = false;
    // Find the first line
    const firstLine = allWords.reduce((prev, cur) => {
        const withNextWord = `${prev} ${cur}`;
        // Add the next word to the first line if the line hasn't been broken yet
        // and the next word will fit within the limit.
        if (!lineBroken && withNextWord.length < maxChars)
            return withNextWord;
        // Otherwise we've broken the line and continue to return the first line.
        lineBroken = true;
        return prev;
    });
    const secondLine = title.replace(firstLine, "").trim();
    // Return the result.
    return [firstLine, secondLine];
}
function findMaxFontSize(text, context, maxFontSize, maxLineWidth) {
    let fontSize = maxFontSize;
    do {
        fontSize--;
        context.font = fontString(fontSize);
    } while (context.measureText(text).width > maxLineWidth);
    return fontSize;
}
/**
 * Formats a title to the proper font size and number of lines based on the
 * input parameters.
 */
function formatTitle(title, context, options) {
    // Return references
    let fontSize = options.maxFontSize;
    let text = [title];
    // If everything can fit on one line, that's all we need to do.
    context.font = fontString(options.maxFontSize);
    const { width } = context.measureText(title);
    if (width <= options.maxLineWidth)
        return { fontSize, text };
    // Next, try to reduce the font size with a single line and see if we meet the
    // minimum threshold.
    const singleLineFontSize = findMaxFontSize(title, context, options.maxFontSize, options.maxLineWidth);
    if (singleLineFontSize >= options.minSingleLineFontSize) {
        return { fontSize: singleLineFontSize, text };
    }
    // Otherwise, title spans two lines, and reduces the font size until the
    // longer line fits within our maxLineWidth.
    //
    // (The code here is a fancy way of calling findMaxFontSize() for each line
    // and determining the smaller value.)
    text = splitLines(title);
    fontSize = Math.min(...text.map((line) => findMaxFontSize(line, context, options.maxFontSize, options.maxLineWidth)));
    return { fontSize, text };
}
exports.formatTitle = formatTitle;
