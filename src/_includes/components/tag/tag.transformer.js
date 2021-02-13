const lodash = require("lodash")

module.exports = ({ tag, ...props }) => {
  return {
    ...props,
    color: lodash.get(tag, "data.color") || "gray-200",
    textColor: lodash.get(tag, "data.textColor") || "gray-800",
    label: lodash.get(tag, "data.title"),
    url: tag.url
  }
}
