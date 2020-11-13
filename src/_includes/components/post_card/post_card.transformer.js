const lodash = require("lodash")
const { Component } = require("../../../../utils/shortcodes/component")

module.exports = ({ post }) => {
  const tagData = lodash.get(post, "data.tags") || []

  const tags = tagData.map(tag => {
    const component = new Component("tag", { tag })
    return component.render()
  })

  return {
    ...post,
    tags
  }
}
