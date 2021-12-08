/**
 * Add a "console" filter, which prints an object to the console.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Logs the input to the console.
   */
  eleventyConfig.addFilter("console", (input) => {
    console.log(input);
    return input;
  });

  /**
   * Logs the keys of the object to the console.
   */
  eleventyConfig.addFilter("console.keys", (input) => {
    console.log(Object.keys(input));
    return input;
  });
};
