/**
 * Given a full URL, extract the domain name - e.g.
 * "https://www.seancdavis.com/" -> "seancdavis.com"
 *
 * @param {string} url full URL
 * @returns domain name
 */
exports.extractDomainName = (url) => {
  if (!url) return null;
  const urlObj = new URL(url);
  return urlObj.hostname;
};

/**
 * Given a URL, extract the hostname.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addFilter("domain_name", (url) => this.extractDomainName(url));
};
