const lodash = require("lodash")

/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = eleventyConfig => {
  /**
   * Creates the "posts" collection from the "Post" tag, attaching "hashtags" as
   * the "Tag" collection intersection.
   */
  eleventyConfig.addCollection("posts", collectionApi => {
    // Get raw tags and posts collection data.
    const tags = collectionApi.getFilteredByTag("Tag").sort((a, b) => a.data.title - b.data.title)
    let posts = collectionApi.getFilteredByTag("Post").sort((a, b) => b.date - a.date)
    // Replace tags with a tag object.
    const findTagObj = slug => lodash.find(tags, tag => tag.fileSlug === slug)
    posts.map(post => {
      let postTags = (post.data.tags || []).map(tagName => findTagObj(tagName))
      post.data.hashtags = lodash.compact(postTags)
    })
    // Return the tags collection.
    return posts
  })
}
