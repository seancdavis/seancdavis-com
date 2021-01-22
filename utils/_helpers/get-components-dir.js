const lodash = require("lodash")
const path = require("path")

const config = require("../../eleventy.config")

/**
 * Determines the proper components directory.
 *
 * @param {object} cfg Configuration object used by Eleventy.
 */
exports.getComponentsDir = (cfg = config) => {
  // Get input directory or fall back to Eleventy's default.
  // (https://www.11ty.dev/docs/config/#input-directory)
  const inputDir = lodash.get(cfg, "dir.input") || "."
  // Get components directory or falls back to the default (_components).
  const componentsDir = lodash.get(cfg, "dir.components") || "_components"
  // Return the combined path.
  return path.resolve(inputDir, componentsDir)
}
