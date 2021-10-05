/**
 * Given a string and a maximum number of characters, return the characters
 * within that maximum threshold, along with those remaining.
 *
 * @param {string} input The input string from which to extract the next line.
 * @param {number} maxChars The maximum number of characters for the next line.
 * @returns { line: string, remainingChars: string}
 */
const getMaxNextLine = (input, maxChars = 20) => {
  // Split the string into an array of words.
  const allWords = input.split(" ");
  // Find the index in the words array at which we should stop or we will exceed
  // maximum characters.
  const lineIndex = allWords.reduce((prev, cur, index) => {
    if (prev?.done) return prev;
    const endLastWord = prev?.position || 0;
    const position = endLastWord + 1 + cur.length;
    return position > maxChars ? { done: true, index } : { position, index };
  });
  // Using the index, build a string for this line ...
  const line = allWords.slice(0, lineIndex.index).join(" ");
  // And determine what's left.
  const remainingChars = allWords.slice(lineIndex.index).join(" ");
  // Return the result.
  return { line, remainingChars };
};

/**
 * Given a title, break it up into a maximum of two lines, adding ellipses at
 * the end of the second line if it is too long.
 *
 * @param {string} title The title of the object being built.
 * @returns {array}
 */
module.exports = (title) => {
  let output = [];
  // If the title is 40 characters or longer, look to add ellipses at the end of
  // the second line.
  if (title.length > 40) {
    const firstLine = getMaxNextLine(title);
    const secondLine = getMaxNextLine(firstLine.remainingChars);
    output = [firstLine.line];
    let fmSecondLine = secondLine.line;
    if (secondLine.remainingChars.length > 0) fmSecondLine += " ...";
    output.push(fmSecondLine);
  }
  // If 20 characters or longer, add the entire second line, using a max of half
  // the characters, making the first line always slightly shorter than the
  // second.
  else if (title.length > 20) {
    const firstLine = getMaxNextLine(title, title.length / 2);
    output = [firstLine.line, firstLine.remainingChars];
  }
  // Otherwise, return the short title.
  else {
    output = [title];
  }

  return output;
};
