const fs = require("fs")
const htmlmin = require("html-minifier")
const MarkdownIt = require("markdown-it")
const nunjucks = require("nunjucks")
const path = require("path")

const components = require("./src/_includes/components/components.config")

const isProduction = process.env.ELEVENTY_ENV === "production"

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css")
  eleventyConfig.addPassthroughCopy("./src/images")

  /**
   * Reads a file in the _includes directory and returns the result.
   */
  const readIncludeFile = filePath => {
    return fs.readFileSync(path.join(__dirname, `src/_includes/${filePath}`), "utf8")
  }

  /**
   * Renders component by passing in named arguments to the "component"
   * shortcode.
   */
  eleventyConfig.addNunjucksShortcode("component", (name, props) => {
    let component = components[name]
    if (!component) return console.error(`Component not properly configured: ${name}`)

    if (component.transformer) props = component.transformer(props || {})

    return nunjucks.renderString(readIncludeFile(component.template), { ...props })
  })

  /**
   * Captures an input string and converts markdown to HTML
   */
  eleventyConfig.addPairedNunjucksShortcode("markdown", input => {
    const md = new MarkdownIt()
    return md.render(input)
  })

  /**
   * Reads an SVG from file and inserts its content directly on the page.
   */
  eleventyConfig.addNunjucksShortcode("svg", name => readIncludeFile(`svg/${name}.svg`))

  /**
   * Minify files in production.
   */
  eleventyConfig.addTransform("compress-html", (content, outputPath) => {
    if (!outputPath.endsWith(".html") || !isProduction) return content
    const minOpts = {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }
    return htmlmin.minify(content, minOpts)
  })

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
