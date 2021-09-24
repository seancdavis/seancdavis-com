const lodash = require("lodash")

module.exports = ({ tag, ...props }) => {
  return {
    ...props,
    label: lodash.get(tag, "data.title"),
    url: tag.url
  }
}
