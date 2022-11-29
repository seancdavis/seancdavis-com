/**
 * Extracts the YouTube ID value from a valid YouTube URL.
 *
 * @param url Full URL string
 * @returns ID of the YouTube video
 */
export function extractYouTubeId(url: string): string {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  if (!match || match[7].length !== 11) {
    throw new Error(`Not a valid YouTube ID: ${url}`);
  }
  return match[7];
}

/**
 * Capitalizes the first character in every word in a string.
 *
 * @param str Input string
 * @returns String with first character in every word capitalized
 */
export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
