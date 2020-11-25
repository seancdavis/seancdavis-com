const lodash = require("lodash")
const { Component } = require("../../../../utils/shortcodes/component")

module.exports = ({ post }) => {
  const tagData = lodash.get(post, "data.hashtags") || []

  const tags = tagData
    .map(tag => {
      const component = new Component("tag", { tag, classes: "mr-1" })
      return component.render()
    })
    .join("")

  let image
  if (post.data.image) {
    const component = new Component("image", { path: post.data.image, sm: "576px" })
    image = component.render()
  }

  return {
    ...post,
    image,
    tags
  }
}
