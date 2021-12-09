const { shuffle } = require("../_helpers/shuffle");

/**
 * The main controller for finding related posts. The logic works like this:
 *
 *    1. If related_posts (frontmatter) is an empty array, return the empty
 *       array.
 *    2. If related_posts was specified, find those posts objects from the
 *       collection and return.
 *    3. If no related_posts are specified, first look for other blog posts
 *       referenced in the content. Return up to three, shuffling the result.
 *    4. If related_posts returned less than three, add to them posts that share
 *       the tag. The more tags in common, the higher weighted. If the post has
 *       no tags, then every post is at play and could show up.
 *
 * @param {array} posts 11ty collection of posts (see
 * utils/collections/posts.js).
 * @param {array} relatedPosts Array of strings for explicitly specifying
 * related posts using the fileSlug property.
 * @param {array} tags Array of tag strings (not topics) coming from the current
 * post.
 * @param {string} currentSlug fileSlug of the current post.
 * @param {string} content HTML content of the current post.
 *
 * @returns array of post collection items
 */
exports.getRelatedPosts = (posts, relatedPosts, tags, currentSlug, content) => {
  // If related_posts in frontmatter is an empty array, return the empty array.
  if (Array.isArray(relatedPosts) && relatedPosts.length === 0) return [];
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

/**
 * Given the posts collection and an array of slugs, resolve the slugs by
 * extracting the appropriate post(s).
 *
 * @param {array} posts 11ty collection of posts
 * @param {array} slugs Array of slugs to resolve
 *
 * @returns array of post collection items
 */
exports.getPostsBySlugs = (posts, slugs) => {
  const result = slugs.map((slug) =>
    posts.find((post) => post.fileSlug === slug)
  );
  return result.filter((x) => x);
};

/**
 * Given the content of the current post, extract posts that are linked from
 * within the content.
 *
 * @param {array} posts 11ty collection of posts.
 * @param {string} content HTML content of the current post.
 *
 * @returns array of post collection items
 */
exports.getReferencedPosts = (posts, content) => {
  const linkPattern = /"\/blog\/([A-Za-z0-9\-\_]+)(\/?)(index.html)?"/g;
  const links = [...content.matchAll(linkPattern)];
  // link[0] would be the full matching URL, but we just want the basename
  // segment (slug).
  let slugs = [...new Set(links.map((link) => link[1]))];
  // Max out at three posts.
  if (slugs.length > 3) slugs = shuffle(slugs).slice(0, 3);
  return exports.getPostsBySlugs(posts, slugs);
};

/**
 * Given an array of tags, find the posts with the most tags in common. Shuffle
 * the resulting set so it is different every time (if possible).
 *
 * @param {array} posts 11ty collection of posts.
 * @param {array} tags Array of tags coming from the current post.
 * @param {number} limit Maximum number of posts to return (default: 3)
 *
 * @returns array of post collection items
 */
exports.getPostsByTags = (posts, tags, limit = 3) => {
  const tagsToMatch = [...tags];
  // Remove "Post" from the tags array, which is there by default for all posts.
  if (tagsToMatch.indexOf("Post") >= 0) {
    tagsToMatch.splice(tagsToMatch.indexOf("Post"), 1);
  }
  // Build an array of objects that reference the original post and a count for
  // how many tags it matched.
  const postsWithMatchCount = posts.map((post) => {
    const matchingTags = post.data.tags.filter((t) => tagsToMatch.includes(t));
    return { post, matchCount: matchingTags.length };
  });
  // Shuffle all the posts, and then sort the collection by the number of
  // matches. This prioritizes posts with more tags in common.
  return shuffle(postsWithMatchCount)
    .sort((a, b) => (b.matchCount > a.matchCount ? 1 : -1))
    .slice(0, limit)
    .map((obj) => obj.post);
};

/**
 * Find the related items to a post. This filter is passed on directly to
 * getRelatedPosts. See that doc for more information on how this works.
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
