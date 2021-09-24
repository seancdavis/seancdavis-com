const slugify = require("slugify")

/**
 * Converts a string to a lowercase, URL-friendly slug.
 *
 * @param {string} input The string to convert to a slug.
 */
exports.slugifyInput = input => {
  if (!input) {
    return false
  }
  return slugify(input.toString(), { lower: true, strict: true })
}

/**
 * Add a prettier "slugify" filter. The "slug" filter does not remove colons,
 * commas, apostrophes, etc. This does.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = eleventyConfig => {
  eleventyConfig.addFilter("slug", input => this.slugifyInput(input))
}
