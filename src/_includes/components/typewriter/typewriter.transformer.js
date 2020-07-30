const defaults = {
  blankDuration: 250,
  characterDuration: 75,
  highlightDuration: 250,
  texts: [],
  viewDuration: 2000
}

module.exports = ({
  blankDuration,
  characterDuration,
  highlightDuration,
  texts,
  viewDuration,
  ...props
}) => {
  return {
    ...props,
    blankDuration: blankDuration || defaults.blankDuration,
    characterDuration: characterDuration || defaults.characterDuration,
    highlightDuration: highlightDuration || defaults.highlightDuration,
    texts: texts || defaults.texts,
    viewDuration: viewDuration || defaults.viewDuration
  }
}
