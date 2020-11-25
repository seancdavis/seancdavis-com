const fs = require("fs")
const path = require("path")

const config = require("../../eleventy.config")

const { getIncludeDir } = require("./get-include-dir")

/**
 * Given a relative path to the file from the source of the includes directory,
 * read the file.
 *
 * @param {string} filePath Path inside include directory to file
 * @param {object} cfg Configuration object used by Eleventy (defaults to
 * imported object)
 */
exports.readIncludeFile = (filePath, cfg = config) => {
  return fs.readFileSync(path.join(getIncludeDir(cfg), filePath), "utf8")
}
