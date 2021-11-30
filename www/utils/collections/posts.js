/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the "posts" collection from the "Post" tag, attaching "hashtags" as
   * the "Tag" collection intersection.
   */
  eleventyConfig.addCollection("posts", (collectionApi) => {
    // Get raw collection data.
    const authors = collectionApi
      .getFilteredByTag("Author")
      .sort((a, b) => a.data.title - b.data.title);
    const tags = collectionApi
      .getFilteredByTag("Tag")
      .sort((a, b) => a.data.title - b.data.title);
    let posts = collectionApi
      .getFilteredByTag("Post")
      .sort((a, b) => b.date - a.date);
    const findTagObj = (slug) => tags.find((tag) => tag.fileSlug === slug);
    posts.map((post) => {
      // Add "hashtags" attribute with rich tag objects.
      let postTags = (post.data.tags || []).map((tagName) =>
        findTagObj(tagName)
      );
      post.data.hashtags = postTags.filter((x) => !!x);
      // Add "rich_author" attribute with rich author object.
      if (post.data.author) {
        let postAuthor = authors.find(
          (author) => author.fileSlug === post.data.author
        );
        post.data.rich_author = postAuthor;
      }
    });
    // Return the tags collection.
    return posts;
  });
};
