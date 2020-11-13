const glob = require("glob")
const lodash = require("lodash")
const path = require("path")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

const config = require("./eleventy.config")

/**
 * Require all necessary files
 */
const getUtilFiles = () => {
  // Utils directory.
  const dir = path.join(__dirname, `./utils`)
  // Pattern of files to require from the directory.
  const globFilesPattern = path.join(dir, "**/*.js")
  // Pattern of files to ignore from the directory.
  const ignoreFiles = ["**/*.spec.js", "_**/*.js", "**/_*/**/*.js", "**/_*.js"]
  const ignoreFilesPattern = ignoreFiles.map(pattern => path.join(dir, pattern))
  // Find all relevant files.
  let files = glob.sync(globFilesPattern, { ignore: ignoreFilesPattern })
  // Ensure that they are configured correctly. Remove and log a message for
  // those that are not configured properly.
  files = files.map(file => {
    // Import the file.
    const module = require(file)
    // If everything looks good, return the module.
    if (typeof lodash.get(module, "default") === "function") return module
    // Otherwise, we have a problem. Gather the appropriate message.
    const error = module.default
      ? `Export "default" must be a function.`
      : `Missing "default" named export.`
    // Log the message.
    console.error(`Could not load ${path.basename(file)}. ${error}`)
    // And return null.
    return null
  })
  // Return all valid imports.
  return files.filter(util => util)
}

/**
 * Eleventy configuration. More info here: https://www.11ty.dev/docs/config/
 *
 * @param {object} eleventyConfig Config object coming from Eleventy
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addPassthroughCopy("./src/css")
  eleventyConfig.addPassthroughCopy("./src/images")
  eleventyConfig.addPassthroughCopy("./src/fonts")
  eleventyConfig.addPassthroughCopy({ static: "/" })

  // --- Utils --- //
  //
  getUtilFiles().map(util => util.default(eleventyConfig))

  /**
   * Extract a collection from Eleventy's collectionApi using a "model"
   * frontmatter key.
   *
   * @param {object} api collectionApi object from Eleventy
   * @param {string} model Name of the model to extract (looks for "model"
   * frontmatter)
   */
  const extractCollection = (api, model) => {
    return api.getAll().filter(({ data }) => data.model === model)
  }

  /**
   * Builds a collection of tags. This is abstracted because it is used for
   * multiple collections.
   *
   * @param {object} api The collectionApi object from Eleventy.
   */
  const buildTagsCollection = api => {
    // Get raw tags and posts collection data.
    let tags = extractCollection(api, "Tag")
    const posts = extractCollection(api, "Post").sort((a, b) => b.date - a.date)
    // Apply posts relationship using the tag "title" as they key.
    const postIncludesTag = (post, tag) => (post.data.tagnames || []).includes(tag.data.title)
    tags.map(tag => (tag.data.posts = posts.filter(post => postIncludesTag(post, tag))))
    // Return the tags collection.
    return tags
  }

  /**
   * Creates the "tags" collection using the "model" frontmatter value, and
   * makes an association to the tag's posts.
   */
  eleventyConfig.addCollection("tags", collectionApi => {
    return buildTagsCollection(collectionApi)
  })

  /**
   * Creates the "posts" collection using the "model" frontmatter value.
   */
  eleventyConfig.addCollection("posts", collectionApi => {
    // Get raw tags and posts collection data.
    let posts = extractCollection(collectionApi, "Post").sort((a, b) => b.date - a.date)
    const tags = extractCollection(collectionApi, "Tag").sort((a, b) => a.data.title - b.data.title)
    // Replace tags with a tag object.
    const findTagObj = title => lodash.find(tags, tag => tag.data.title === title)
    posts.map(post => {
      let postTags = (post.data.tagnames || []).map(tagName => findTagObj(tagName))
      post.data.tags = lodash.compact(postTags)
    })
    // Return the tags collection.
    return posts
  })

  //
  // --- Return --- //
  //
  // Return the config object. (This is what actually sets the config for
  // Eleventy. It was written above for reference within utils.)
  return config
}
