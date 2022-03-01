const { readSvg } = require("../../../../utils/shortcodes/svg");

const defaults = {
  theme: "blue",
  size: "md",
};

module.exports = ({ theme, icon, size, ...props }) => {
  if (icon) {
    icon.html = readSvg(icon.name);
    icon.position = icon.position ?? "left";
  }

  return {
    ...props,
    icon,
    size: size || defaults.size,
    theme: theme || defaults.theme,
  };
};
