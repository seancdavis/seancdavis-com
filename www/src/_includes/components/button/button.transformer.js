const defaults = {
  theme: "blue"
}

module.exports = ({ theme, ...props }) => {
  return {
    ...props,
    theme: theme || defaults.theme
  }
}
