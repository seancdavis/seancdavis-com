const nunjucks = require("nunjucks")
const fs = require("fs")
const path = require("path")

const components = require("./src/_includes/components")

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css")
  eleventyConfig.addPassthroughCopy("./src/images")

  /**
   * Reads a file in the _includes directory and returns the result.
   */
  const readIncludeFile = (filePath) => {
    return fs.readFileSync(path.join(__dirname, `src/_includes/${filePath}`), "utf8")
  }

  /**
   * Renders component by passing in named arguments to the "component"
   * shortcode.
   */
  eleventyConfig.addNunjucksShortcode("component", (name, props) => {
    let component = components[name]
    if (!component) return console.error(`Component not properly configured: ${name}`)

    if (component.transformer) props = component.transformer(props)

    return nunjucks.renderString(readIncludeFile(component.template), { ...props })
  })

  /**
   * Reads an SVG from file and inserts its content directly on the page.
   */
  eleventyConfig.addNunjucksShortcode("svg", (name) => readIncludeFile(`svg/${name}.svg`))

  return {
    dir: {
      includes: "_includes",
      input: "src",
      layouts: "_layouts",
      output: "dist"
    },
    markdownTemplateEngine: "njk"
  }
}
