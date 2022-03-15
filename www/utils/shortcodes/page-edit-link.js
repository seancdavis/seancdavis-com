/**
 * Add a "page_edit_link" shortcode, which figures out the edit path for the
 * current page on GitHub.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addShortcode("page_edit_link", (page) => {
    const prefix =
      "https://github.com/seancdavis/seancdavis-com/edit/main/www/";
    const { inputPath } = page;
    const url = new URL(inputPath, prefix);
    return url.href;
  });
};
