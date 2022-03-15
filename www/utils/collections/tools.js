/**
 * Creates the "tools" collection from the "Tool" tag, attaching "topics" as
 * the "Topic" collection intersection.
 */
exports.getToolsCollection = (collectionApi) => {
  // Get raw collection data.
  const topics = collectionApi
    .getFilteredByTag("Topic")
    .sort((a, b) => a.data.title - b.data.title);
  let tools = collectionApi
    .getFilteredByTag("Tool")
    .sort((a, b) => b.data.title - a.data.title);
  const findTagObj = (slug) => topics.find((topic) => topic.fileSlug === slug);
  tools.map((tool) => {
    // Add "topics" attribute with rich objects from tag strings (topic slugs).
    let toolTags = (tool.data.tags || []).map((tag) => findTagObj(tag));
    tool.data.topics = toolTags.filter((x) => !!x);
  });
  // Return the tools collection.
  return tools;
};

/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the "tools" collection from the "Tool" tag, attaching "topics" as
   * the "Topic" collection intersection.
   */
  eleventyConfig.addCollection("tools", (collectionApi) =>
    this.getToolsCollection(collectionApi)
  );
};
