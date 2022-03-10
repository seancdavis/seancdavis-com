/**
 * Given a GitHub URL, return the repo path - i.e. [owner]/[repo].
 *
 * @param {string} url full URL to GitHub repo
 * @returns repo name
 */
exports.extractGitHubRepoPath = (url) => {
  if (!url) return null;
  const match = url.match(
    /^https?:\/\/(www\.)?github.com\/(?<owner>[\w\.\-]+)\/(?<repo>[\w\-\.]+)/
  );
  if (!match || !(match.groups?.owner && match.groups?.repo)) return null;
  return `${match.groups.owner}/${match.groups.repo}`;
};

/**
 * Given a URL, extract the GitHub repo path.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addFilter("github_repo", (url) =>
    this.extractGitHubRepoPath(url)
  );
};
