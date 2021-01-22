const glob = require("glob")
const lodash = require("lodash")
const MarkdownIt = require("markdown-it")
const MarkdownItAttrs = require("markdown-it-attrs")
const path = require("path")

const pluginRss = require("@11ty/eleventy-plugin-rss")
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

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
  eleventyConfig.addPlugin(pluginSyntaxHighlight)
  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addPassthroughCopy("./src/css")
  eleventyConfig.addPassthroughCopy("./src/images")
  eleventyConfig.addPassthroughCopy("./src/fonts")
  eleventyConfig.addPassthroughCopy({ static: "/" })

  // Markdown parser
  const MarkdownLib = MarkdownIt({ html: true }).use(MarkdownItAttrs)
  eleventyConfig.setLibrary("md", MarkdownLib)

  // Merge the cascade of properties rather than overwriting. This is how we're
  // able to set tags for an entire directory, while then adding to those tags
  // for the individual items in the directory.
  eleventyConfig.setDataDeepMerge(true)

  // Import utilities from src/utils. See getUtilFiles() above.
  getUtilFiles().map(util => util.default(eleventyConfig))

  // Return the config object. (This is what actually sets the config for
  // Eleventy. It was written above for reference within utils.)
  return config
}
