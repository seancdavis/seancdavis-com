const { getPostsCollection } = require("./posts");

exports.getRepostsCollection = (collectionApi) => {
  return getPostsCollection(collectionApi).filter(
    (post) => !!post.data.tags.find((tag) => tag.startsWith("repost-"))
  );
};

/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the `reposts` collection as a subset of the `posts` collection
   * containing those with tags beginning with "repost-".
   */
  eleventyConfig.addCollection("reposts", (collectionApi) => {
    return this.getRepostsCollection(collectionApi);
  });
};
