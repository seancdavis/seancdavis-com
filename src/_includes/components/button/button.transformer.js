const defaults = {
  color: "blue"
}

module.exports = ({ color, ...props }) => {
  return {
    ...props,
    bgColor: color || defaults.color,
    textColor: "white"
  }
}
