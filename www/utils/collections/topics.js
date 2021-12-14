/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the "topics" collection from the "Topic" tag, removing and
   * adjusting items that are not meant to be used at face value.
   */
  eleventyConfig.addCollection("topics", (collectionApi) => {
    let topics = collectionApi
      .getFilteredByTag("Topic")
      .sort((a, b) =>
        a.data.title.toLowerCase() > b.data.title.toLowerCase() ? 1 : -1
      );

    return topics;
  });
};
