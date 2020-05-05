module.exports = function (eleventyConfig) {
  return {
    dir: {
      includes: "_includes",
      input: "src",
      layouts: "_layouts",
      output: "dist"
    }
  }
}
