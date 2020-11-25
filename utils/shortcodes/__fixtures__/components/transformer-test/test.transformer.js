module.exports = ({ label, ...props }) => {
  return {
    ...props,
    title: label
  }
}
