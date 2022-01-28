const { getPostsCollection } = require("./posts");
const { getGuestPostsCollection } = require("./guest-posts");
const { getRepostsCollection } = require("./reposts");
const { getVideosCollection } = require("./videos");

/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the "home" collection as a superset of other collections, based on
   * the sections displayed on the home page.
   *
   * These work from the top down on the page. Duplicates are removed, giving
   * priority to sections higher on the page. Videos are removed from some
   * sections where there shouldn't be mixed content types.
   */
  eleventyConfig.addCollection("home", (collectionApi) => {
    const posts = getPostsCollection(collectionApi);
    const videos = getVideosCollection(collectionApi);
    const guestPosts = getGuestPostsCollection(collectionApi);
    const reposts = getRepostsCollection(collectionApi);

    const postsWithTag = (tagName) => {
      return posts.filter((post) => post.data.tags.includes(tagName));
    };

    return {
      recent_posts: posts.slice(0, 4),
      javascript: postsWithTag("javascript").slice(0, 4),
      recent_videos: videos.slice(0, 4),
      guest_posts: guestPosts.slice(0, 4),
      jamstack: postsWithTag("jamstack").slice(0, 4),
      reposts: reposts.slice(0, 4),
    };
  });
};
