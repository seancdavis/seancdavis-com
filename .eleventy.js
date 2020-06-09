const nunjucks = require("nunjucks")
const fs = require("fs")
const path = require("path")

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css")
  eleventyConfig.addPassthroughCopy("./src/images")

  /**
   * Renders component by passing in named arguments to the "component"
   * shortcode.
   */
  eleventyConfig.addNunjucksShortcode("component", function (name, props) {
    // Path to the component file.
    const compFilePath = path.join(__dirname, `src/_components/${name}.njk`)
    // Template content.
    const rawComp = fs.readFileSync(compFilePath, "utf8")
    // Pass the props to the component and render.
    return nunjucks.renderString(rawComp, { ...props })
  })

  return {
    dir: {
      includes: "_includes",
      input: "src",
      layouts: "_layouts",
      output: "dist"
    }
  }
}
