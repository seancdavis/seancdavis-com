/**
 * Add a "print" filter, which prints an object to the screen.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addFilter("print", (input) => JSON.stringify(input, null, 2));
};
