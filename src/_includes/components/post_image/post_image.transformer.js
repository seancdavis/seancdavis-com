const htmlmin = require("html-minifier")

const { Component } = require("../../../../utils/shortcodes/component")

module.exports = ({ classes = "", src, ...props }) => {
  const component = new Component("image", {
    ...props,
    path: src,
    classes: classes || "mb-4 shadow-sm",
    sm: "672px"
  })
  let image = htmlmin.minify(component.render())

  return { image }
}
