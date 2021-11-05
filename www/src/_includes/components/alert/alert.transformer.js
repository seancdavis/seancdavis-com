const { readSvg } = require("../../../../utils/shortcodes/svg");

module.exports = ({ text }) => {
  const closeIcon = readSvg("cancel");
  return { text, closeIcon };
};
