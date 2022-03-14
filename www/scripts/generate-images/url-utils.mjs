/**
 * Given a Twitter URL, return the profile name, with a preceding @.
 *
 * @param {string} url full URL to twitter profile
 * @returns handle, including preceding @
 */
export function extractTwitterHandle(url) {
  if (!url) return null;
  const match = url.match(/^https?:\/\/(www\.)?twitter.com\/@?(?<handle>\w+)/);
  return match?.groups?.handle ? `@${match.groups.handle}` : null;
}

/**
 * Given a full URL, extract the domain name - e.g.
 * "https://www.seancdavis.com/" -> "seancdavis.com"
 *
 * @param {string} url full URL
 * @returns domain name
 */
export function extractDomainName(url) {
  if (!url) return null;
  const urlObj = new URL(url);
  return urlObj.hostname;
}

/**
 * Given a GitHub URL, return the repo path - i.e. [owner]/[repo].
 *
 * @param {string} url full URL to GitHub repo
 * @returns repo name
 */
export function extractGitHubRepoPath(url) {
  if (!url) return null;
  const match = url.match(
    /^https?:\/\/(www\.)?github.com\/(?<owner>[\w\.\-]+)\/(?<repo>[\w\-\.]+)/
  );
  if (!match || !(match.groups?.owner && match.groups?.repo)) return null;
  return `${match.groups.owner}/${match.groups.repo}`;
}
