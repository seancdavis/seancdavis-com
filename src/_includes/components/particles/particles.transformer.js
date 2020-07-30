const defaults = {
  count: 10
}

module.exports = ({ count, ...props }) => {
  return {
    ...props,
    count: count || defaults.count
  }
}
