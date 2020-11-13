const lodash = require("lodash")
const { Component } = require("../../../../utils/shortcodes/component")

module.exports = ({ post }) => {
  const tagData = lodash.get(post, "data.tags") || []

  const tags = tagData.map(tag => {
    const tagProps = {
      color: lodash.get(tag, "data.color") || "gray",
      textColor: lodash.get(tag, "data.textColor") || "gray-dark",
      label: lodash.get(tag, "data.title"),
      url: tag.url
    }
    const component = new Component("tag", tagProps)
    return component.render()
  })

  return {
    ...post,
    tags
  }
}
