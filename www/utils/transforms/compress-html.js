const htmlmin = require("html-minifier")

/**
 * Compresses HTML during production builds.
 *
 * @param {string} content HTML content
 * @param {string} outputPath Path to which the file will be written
 */
exports.compressHtml = (content, outputPath) => {
  // If not an HTML file or not a production build, return the content as it
  // was.
  if (!outputPath.endsWith(".html") || process.env.ELEVENTY_ENV !== "production") return content
  // Options for the minifying process.
  const minOpts = {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true
  }
  // Return compressed HTML.
  return htmlmin.minify(content, minOpts)
}

/**
 * Add the transform, written above.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  return eleventyConfig.addTransform("compress-html", exports.compressHtml)
}
