/**
 * Given an array of posts items and slugs, extract the items that have a
 * matching fileSlug property.
 *
 * @param {array} posts Array of items of the posts collection
 * @param {array} slugs Array of strings to match
 */
exports.getPostsBySlug = (posts, slugs) => {
  return slugs.map((slug) => posts.find((post) => post.fileSlug === slug));
};

/**
 * Given an array of slugs, find the items
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addFilter("get_posts_by_slug", (posts, slugs) => {
    return exports.getPostsBySlug(posts, slugs);
  });
};
