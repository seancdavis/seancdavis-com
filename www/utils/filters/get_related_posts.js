const { shuffle } = require("../_helpers/shuffle");

// TODO: Add comments and specs.

exports.getRelatedPosts = (posts, relatedPosts, tags, currentSlug, content) => {
  // If related_posts in frontmatter is an empty array, return the empty array.
  if (relatedPosts === []) return [];
  // If related_posts is an array, retrieve the posts from the collection and
  // return.
  if (relatedPosts?.length > 0) {
    return exports.getPostsBySlugs(posts, relatedPosts);
  }
  // Otherwise, use some logic. Begin by removing the current post from the
  // posts collection.
  posts = posts.filter((post) => post.fileSlug !== currentSlug);
  // Then, find any referenced posts.
  let result = exports.getReferencedPosts(posts, content);
  // If there were at least three referenced posts, return them.
  if (result.length >= 3) return result;
  // If we don't have three yet, first remove the ones we have from the
  // collection, so we don't end up with duplicates.
  const resultSlugs = result.map((post) => post.fileSlug);
  posts = posts.filter((post) => !resultSlugs.includes(post.fileSlug));
  // Then use tag intersection to add more related posts, up to a total of
  // three.
  const postsByTag = exports.getPostsByTags(posts, tags, 3 - result.length);
  result = result.concat(postsByTag);
  // Return the result, which should be a collection of three posts.
  return result;
};

exports.getPostsBySlugs = (posts, slugs) => {
  const result = slugs.map((slug) =>
    posts.find((post) => post.fileSlug === slug)
  );
  return result;
};

exports.getReferencedPosts = (posts, content) => {
  const linkPattern = /"\/blog\/([A-Za-z0-9\-\_]+)(\/?)(index.html)?"/g;
  const links = [...content.matchAll(linkPattern)];
  let slugs = links.map((link) => link[1]);
  if (slugs.length > 3) slugs = shuffle(slugs).slice(0, 3);
  return exports.getPostsBySlugs(posts, slugs);
};

exports.getPostsByTags = (posts, tags, limit = 3) => {
  const tagsToMatch = [...tags];

  if (tagsToMatch.indexOf("Post") >= 0) {
    tagsToMatch.splice(tagsToMatch.indexOf("Post"), 1);
  }

  const postsWithMatchCount = posts.map((post) => {
    const matchingTags = post.data.tags.filter((t) => tagsToMatch.includes(t));
    return { post, matchCount: matchingTags.length };
  });

  const result = shuffle(postsWithMatchCount)
    .sort((a, b) => (b.matchCount > a.matchCount ? 1 : -1))
    .slice(0, limit)
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
    (posts, relatedPosts, tags, currentSlug, content) => {
      return exports.getRelatedPosts(
        posts,
        relatedPosts,
        tags,
        currentSlug,
        content
      );
    }
  );
};
