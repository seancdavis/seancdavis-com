/**
 * Extracts the YouTube ID value from a valid YouTube URL.
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
