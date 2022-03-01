/**
 * Creates the "news" collection from the "News" tag, attaching "topics" as
 * the "Topic" collection intersection.
 */
exports.getNewsCollection = (collectionApi) => {
  // Get raw collection data.
  const topics = collectionApi
    .getFilteredByTag("Topic")
    .sort((a, b) => a.data.title - b.data.title);
  let news = collectionApi
    .getFilteredByTag("News")
    .sort((a, b) => b.date - a.date);
  const findTagObj = (slug) => topics.find((topic) => topic.fileSlug === slug);
  news.map((item) => {
    // Add "topics" attribute with rich objects from tag strings (topic slugs).
    let itemTags = (item.data.tags || []).map((tag) => findTagObj(tag));
    item.data.topics = itemTags.filter((x) => !!x);
  });
  // Return the news collection.
  return news;
};

/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the "news" collection from the "News" tag, attaching "topics" as
   * the "Topic" collection intersection.
   */
  eleventyConfig.addCollection("news", (collectionApi) =>
    this.getNewsCollection(collectionApi)
  );
};
