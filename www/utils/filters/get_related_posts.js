const { shuffle } = require("../_helpers/shuffle");

exports.getRelatedPosts = (posts, relatedPosts, tags, currentSlug) => {
  if (relatedPosts === []) return [];
  posts = posts.filter((post) => post.fileSlug !== currentSlug);
  if (relatedPosts?.length > 0) {
    return exports.getPostsBySlugs(posts, relatedPosts);
  }
  return exports.getPostsByTags(posts, tags);
};

exports.getPostsBySlugs = (posts, slugs) => {
  const result = slugs.map((slug) =>
    posts.find((post) => post.fileSlug === slug)
  );
  return result;
};

exports.getPostsByTags = (posts, tags) => {
  const tagsToMatch = [...tags];
  tagsToMatch.splice(tagsToMatch.indexOf("Post"), 1);

  const postsWithMatchCount = posts.map((post) => {
    const matchingTags = post.data.tags.filter((t) => tagsToMatch.includes(t));
    return { post, matchCount: matchingTags.length };
  });

  const result = shuffle(postsWithMatchCount)
    .sort((a, b) => (b.matchCount > a.matchCount ? 1 : -1))
    .slice(0, 3)
    .map((obj) => obj.post);

  return result;
};

/**
 * Find the related items to a post. If related_posts are defined on the post,
 * then we retrieve those objects directly.
 *
 * Otherwise, we use tag intersection with a bit of fanciness to automatically
 * generate a series of three related posts.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addFilter(
    "get_related_posts",
    (posts, relatedPosts, tags, currentSlug) => {
      return exports.getRelatedPosts(posts, relatedPosts, tags, currentSlug);
    }
  );
};

/**
 * NOTES:
 *
 * I'm thinking all the logic for related posts goes in here.
 *
 * When resorting to tags:
 * 1. Duplicate tags array without Post.
 * 2. Filter posts for those that have at least one intersecting tag, and create
 *    a reference object that stores the number of intersecting tags.
 * 3. Shuffle the array.
 * 4. Sort by number of intersecting tags.
 *
 * Write tests for all this logic, as best as possible. I want to make sure it's
 * a) random, but b) respecting the intersecting rule.
 *
 * I'm thinking I don't do the internal file reading. That's unnecessarily
 * complicated. However, I can think about building reference objects in
 * frontmatter and then building out a rich experience for that. Maybe create a
 * new issue for this? Then there is less magic, but another point at which to
 * add visually appealing links to other posts.*
 *
 * Add specs for shuffle.
 *
 */
