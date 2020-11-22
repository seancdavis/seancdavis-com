module.exports = ({ height = "500", ...props }) => {
  return {
    ...props,
    height
  }
}
