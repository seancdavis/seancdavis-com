/**
 * Add a "sort_by" filter, which sorts an array of objects by a specific
 * property.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addFilter("sort_by", (input, prop, reverse = false) => {
    return input.sort((a, b) =>
      reverse ? b[prop] - a[prop] : a[prop] - b[prop]
    );
  });
};
