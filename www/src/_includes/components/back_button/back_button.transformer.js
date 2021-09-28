const { readSvg } = require("../../../../utils/shortcodes/svg")

module.exports = props => {
  const svg = readSvg("arrow-left")

  return {
    ...props,
    svg
  }
}
