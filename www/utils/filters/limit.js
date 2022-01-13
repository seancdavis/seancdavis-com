/**
 * Add a "limit" filter, which slices an array (of collection items).
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addFilter("limit", (input, count) => {
    return input.slice(0, count);
  });
};
