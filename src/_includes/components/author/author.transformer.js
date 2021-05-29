const { Component } = require("../../../../utils/shortcodes/component")

module.exports = ({ author, classes }) => {
  let image
  if (author.data.image) {
    const component = new Component("image", { path: author.data.image, sm: "576px" })
    image = component.render()
  }

  return {
    classes,
    image,
    name: author.data.title,
    url: author.url
  }
}
