function fontString(fontSize) {
  return `bold ${fontSize}pt 'DM Serif Display'`;
}

function splitLines(title) {
  // Maximum number of characters in the first line is half the total title
  // length.
  const maxChars = title.length / 2;
  // Split the string into an array of words.
  const allWords = title.split(" ");
  // Find the index in the words array at which we should stop or we will exceed
  // maximum characters.
  const lineIndex = allWords.reduce((prev, cur, index) => {
    if (prev?.done) return prev;
    const endLastWord = prev?.position || 0;
    const position = endLastWord + 1 + cur.length;
    return position >= maxChars ? { done: true, index } : { position, index };
  });
  // Using the index, build a string for this line ...
  const line1 = allWords.slice(0, lineIndex.index).join(" ");
  // And determine what's left.
  const line2 = allWords.slice(lineIndex.index).join(" ");
  // Return the result.
  return [line1, line2];
}

export function formatTitle({ title, context, maxFontSize, maxLineWidth }) {
  // Return references
  let fontSize = maxFontSize;
  let text = [title];
  // If everything can fit on one line, that's all we need to do.
  context.font = fontString(maxFontSize);
  const { width } = context.measureText(title);
  if (width <= maxLineWidth) return { fontSize, text };

  // Otherwise, assume spanning two lines, and reduce until it fits.
  text = splitLines(title);
  for (const line of text) {
    do {
      fontSize--;
      context.font = fontString(fontSize);
    } while (context.measureText(line).width > maxLineWidth);
  }
  return { fontSize, text };
}
