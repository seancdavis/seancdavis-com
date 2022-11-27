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
