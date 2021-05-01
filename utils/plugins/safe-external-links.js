const safeExternalLinks = require("@hirusi/eleventy-plugin-safe-external-links")

/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = eleventyConfig => {
  /**
   * Loads the @hirusi/eleventy-plugin-safe-external-links plugin.
   */
  eleventyConfig.addPlugin(safeExternalLinks, {
    pattern: "https{0,1}://", // RegExp pattern for external links
    noopener: true, // Whether to include noopener
    noreferrer: false, // Whether to include noreferrer
    files: [
      // What output file extensions to work on
      ".html"
    ]
  })
}
