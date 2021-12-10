const { getPostsCollection } = require("./posts");
/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the "blog" collection as a superset of all other collection items
   * that can appear in the feed.
   */
  eleventyConfig.addCollection("blog", (collectionApi) => {
    let posts = getPostsCollection(collectionApi);
    return posts;
  });
};
