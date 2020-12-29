const fs = require("fs")
const path = require("path")
const nunjucks = require("nunjucks")

module.exports = function (eleventyConfig) {
  // Add "button" shortcode.
  eleventyConfig.addNunjucksShortcode("button", props => {
    const filePath = path.join(__dirname, "_includes/button.njk")
    if (!fs.existsSync) {
      return ""
    }
    const content = fs.readFileSync(filePath).toString()
    return nunjucks.renderString(content, { button: props })
  })
}
