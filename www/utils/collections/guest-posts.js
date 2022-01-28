const { getPostsCollection } = require("./posts");

exports.getGuestPostsCollection = (collectionApi) => {
  return getPostsCollection(collectionApi).filter(
    (post) => !!post.data.contributor
  );
};

/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the `guest_posts` collection as a subset of the `posts` collection
   * containing contributor data.
   */
  eleventyConfig.addCollection("guest_posts", (collectionApi) => {
    return this.getGuestPostsCollection(collectionApi);
  });
};
