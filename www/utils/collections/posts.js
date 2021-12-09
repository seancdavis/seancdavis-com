/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the "posts" collection from the "Post" tag, attaching "topics" as
   * the "Topic" collection intersection.
   */
  eleventyConfig.addCollection("posts", (collectionApi) => {
    // Get raw collection data.
    const authors = collectionApi
      .getFilteredByTag("Author")
      .sort((a, b) => a.data.title - b.data.title);
    const topics = collectionApi
      .getFilteredByTag("Topic")
      .sort((a, b) => a.data.title - b.data.title);
    let posts = collectionApi
      .getFilteredByTag("Post")
      .sort((a, b) => b.date - a.date);
    const findTagObj = (slug) =>
      topics.find((topic) => topic.fileSlug === slug);
    posts.map((post) => {
      // Add "topics" attribute with rich objects from tag strings (topic
      // slugs).
      let postTags = (post.data.tags || []).map((tag) => findTagObj(tag));
      post.data.topics = postTags.filter((x) => !!x);
      // Add "rich_author" attribute with rich author object.
      if (post.data.author) {
        let postAuthor = authors.find(
          (author) => author.fileSlug === post.data.author
        );
        post.data.rich_author = postAuthor;
      }
    });
    // Return the posts collection.
    return posts;
  });
};
