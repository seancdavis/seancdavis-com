// const hljs = require("highlight.js")
const MarkdownIt = require("markdown-it")

/**
 * Convert a markdown string to HTML
 *
 * @param {string} input Markdown string to be converted to HTML
 */
exports.renderMarkdown = input => {
  const md = new MarkdownIt()

  // const temp = md.renderer.rules.fence.bind(md.renderer.rules)

  //   md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
  //     const token = tokens[idx]
  //     const code = token.content.trim()
  //     if (token.info.length > 0) {
  //       return `<pre><code class="hljs">${hljs.highlightAuto(code, [token.info]).value}</code></pre>`
  //     }
  //     return temp(tokens, idx, options, env, slf)
  //   }

  return md.render(input)
}

/**
 * Captures an input string and converts markdown to HTML
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = eleventyConfig => {
  eleventyConfig.addPairedShortcode("markdown", input => exports.renderMarkdown(input))
}
