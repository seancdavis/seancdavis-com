/**
 * Given a Twitter URL, return the profile name, with a preceding @.
 *
 * @param {string} url full URL to twitter profile
 * @returns handle, including preceding @
 */
exports.extractTwitterHandle = (url) => {
  if (!url) return null;
  const match = url.match(/^https?:\/\/(www\.)?twitter.com\/@?(?<handle>\w+)/);
  return match?.groups?.handle ? `@${match.groups.handle}` : null;
};

/**
 * Given a URL, extract the twitter handle.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addFilter("twitter_handle", (url) =>
    this.extractTwitterHandle(url)
  );
};
