module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css")
  eleventyConfig.addPassthroughCopy("./src/images")

  eleventyConfig.addNunjucksShortcode("button", function (button) {
    return `
      <a href="${button.url}" class="bg-green hover:bg-green-dark text-white font-sans py-3 px-8 uppercase inline-block">
        ${button.label}
      </a>
    `
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
