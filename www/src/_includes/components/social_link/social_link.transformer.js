const { readSvg } = require("../../../../utils/shortcodes/svg");

module.exports = ({ link, classes = "" }) => {
  const icon = readSvg(link.icon);

  return { url: link.url, icon, classes, name: link.icon };
};
