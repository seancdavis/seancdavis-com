const { getPostsCollection } = require("./posts");
const { getVideosCollection } = require("./videos");

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
    let videos = getVideosCollection(collectionApi);

    // Concatenate all collections and sort in reverse chronological order.
    const blog = [...posts, ...videos].sort((a, b) => b.date - a.date);

    return blog;
  });
};
