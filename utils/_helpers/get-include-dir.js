const fs = require("fs")
const lodash = require("lodash")
const path = require("path")

const config = require("../../eleventy.config")

/**
 * Determines the proper includes directory.
 *
 * @param {object} cfg Configuration object used by Eleventy.
 */
exports.getIncludeDir = (cfg = config) => {
  // Get input directory or fall back to Eleventy's default.
  // (https://www.11ty.dev/docs/config/#input-directory)
  const inputDir = lodash.get(cfg, "dir.input") || "."
  // Get includes directory or fall back to Eleventy's default.
  // (https://www.11ty.dev/docs/config/#directory-for-includes)
  const includesDir = lodash.get(cfg, "dir.includes") || "_includes"
  // Return the combined path.
  return path.resolve(inputDir, includesDir)
}
