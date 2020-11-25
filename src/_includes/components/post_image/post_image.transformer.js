const htmlmin = require("html-minifier")

const { Component } = require("../../../../utils/shortcodes/component")
const { renderMarkdown } = require("../../../../utils/shortcodes/markdown")

module.exports = ({ caption, classes = "", src, ...props }) => {
  const component = new Component("image", {
    ...props,
    path: src,
    sm: "672px"
  })
  let image = htmlmin.minify(component.render())

  if (caption) {
    caption = renderMarkdown(caption)
  }

  return { image, caption, classes: classes || "mb-4 shadow-sm" }
}
