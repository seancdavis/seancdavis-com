const { Component } = require("../../../../utils/shortcodes/component");
const { readSvg } = require("../../../../utils/shortcodes/svg");

module.exports = ({ video, classes = "mb-6" }) => {
  const playIcon = readSvg("play");

  let image;
  if (video.data.image) {
    const component = new Component("image", {
      path: video.data.image,
      sm: "576px",
    });
    image = component.render();
  }

  return {
    ...video,
    classes,
    image,
    playIcon,
  };
};
