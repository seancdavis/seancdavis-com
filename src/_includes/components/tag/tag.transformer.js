const lodash = require("lodash")

module.exports = ({ tag, ...props }) => {
  return {
    ...props,
    color: lodash.get(tag, "data.color") || "gray",
    textColor: lodash.get(tag, "data.textColor") || "gray-dark",
    label: lodash.get(tag, "data.title"),
    url: tag.url
  }
}
