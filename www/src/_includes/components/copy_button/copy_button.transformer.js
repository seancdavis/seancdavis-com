const { readSvg } = require("../../../../utils/shortcodes/svg");

module.exports = ({ icon, text, classes = "" }) => {
  return { text, icon: readSvg(icon), classes };
};
