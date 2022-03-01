const { getDateToCompare } = require("./news-events");
const { getEventsCollection } = require("./events");
const { getNewsCollection } = require("./news");
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
    let events = getEventsCollection(collectionApi);
    let news = getNewsCollection(collectionApi);

    // Concatenate all collections and sort in reverse chronological order.
    const blog = [...posts, ...videos, ...events, ...news].sort((a, b) => {
      return getDateToCompare(b) - getDateToCompare(a);
    });

    return blog;
  });
};
