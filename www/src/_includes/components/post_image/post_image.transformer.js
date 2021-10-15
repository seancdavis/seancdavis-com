const htmlmin = require("html-minifier");

const { Component } = require("../../../../utils/shortcodes/component");
const { renderMarkdown } = require("../../../../utils/shortcodes/markdown");

module.exports = ({
  caption,
  classes = "",
  imgClasses = "",
  maxWidth,
  flatten,
  src,
  ...props
}) => {
  const component = new Component("image", {
    ...props,
    path: src,
    sm: "672px",
  });
  let image = htmlmin.minify(component.render());

  if (caption) {
    caption = renderMarkdown(caption);
  }

  // classes is used to override positioning and anything else not directly
  // specified as a prop.
  if (!classes) classes = "my-6";
  // If maxWidth is specified, center and constrain the image.
  if (maxWidth) classes += ` max-w-${maxWidth} mx-auto`;
  // Unless told to ignore it, at a subtle shadow the image. This wraps the
  // image, avoiding the caption.
  if (!flatten) imgClasses += " shadow-sm";

  return { image, caption, classes, imgClasses };
};
