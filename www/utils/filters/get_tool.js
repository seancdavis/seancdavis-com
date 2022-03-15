/**
 * Add a "get_tool" filter, which retrieves a tool object from the collection,
 * using the `fileSlug` value.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addFilter("get_tool", (slug, all_tools) => {
    return all_tools.find((tool) => tool.fileSlug === slug);
  });
};
