/**
 * Add a prettier "debug" filter, which prints an object to the screen.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addFilter("debug", (input) => JSON.stringify(input, null, 2));
};
