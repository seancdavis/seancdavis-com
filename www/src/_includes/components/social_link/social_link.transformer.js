const { readSvg } = require("../../../../utils/shortcodes/svg");

module.exports = ({ link, theme = "default", classes = "" }) => {
  const icon = readSvg(link.icon);
  classes += ` theme-${theme}`;

  return { url: link.url, icon, classes, name: link.icon };
};
