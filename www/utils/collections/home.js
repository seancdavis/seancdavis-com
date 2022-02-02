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
    const allPosts = getPostsCollection(collectionApi);
    const allVideos = getVideosCollection(collectionApi);
    const allGuestPosts = getGuestPostsCollection(collectionApi);
    const allReposts = getRepostsCollection(collectionApi);
    const allContent = collectionApi.getAll();

    // Find the featured item first.
    const homePage = allContent.find((page) => {
      return page.filePathStem === "/pages/index";
    });
    // Currently only supporting posts. This way we can be more confident that
    // the topic and contributor references have been populated.
    const featured = allPosts.find((item) => {
      return item.filePathStem === homePage.data.sections.featured.item;
    });

    // Note that because this is using the posts collection itself (vs using
    // blog or the tag itself) that it is excluding videos (and any other
    // content types).
    const postsWithTag = (tagName) => {
      return allPosts.filter((post) => post.data.tags.includes(tagName));
    };

    let allContentItems = [featured];

    const getContentItems = (collection, limit = 4) => {
      const removeDuplicates = (item) => !allContentItems.includes(item);
      // Filter the collection to remove content used higher on the page, and
      // extract the proper number of items for the section.
      const newContentItems = collection
        .filter(removeDuplicates)
        .slice(0, limit);
      // Add new items to the cache and return the new items.
      allContentItems.push(...newContentItems);
      return newContentItems;
    };

    const recent = getContentItems(allPosts);
    const javascript = getContentItems(postsWithTag("javascript"));
    const videos = getContentItems(allVideos);
    const guest_posts = getContentItems(allGuestPosts);
    const jamstack = getContentItems(postsWithTag("jamstack"));
    const reposts = getContentItems(allReposts);

    return {
      featured,
      recent,
      javascript,
      videos,
      guest_posts,
      jamstack,
      reposts,
    };
  });
};
