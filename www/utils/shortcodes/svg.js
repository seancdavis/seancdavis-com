const config = require("../../eleventy.config")

const { readIncludeFile } = require("../_helpers/read-include-file")

/**
 * Reads an SVG file in the svg directory within the includes directory.
 *
 * @param {string} name Name of the file (without extension) to read.
 */
exports.readSvg = (name, cfg = config) => readIncludeFile(`svg/${name}.svg`, cfg)

/**
 * Add shortcode for reading SVG files.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  eleventyConfig.addShortcode("svg", (name) => exports.readSvg(name))
}
