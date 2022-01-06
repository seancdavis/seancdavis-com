const { Component } = require("../../../../utils/shortcodes/component");
const { readSvg } = require("../../../../utils/shortcodes/svg");

module.exports = ({ video, classes = "mb-6" }) => {
  const topicData = video?.data?.topics || [];

  const topics = topicData
    .map((topic) => {
      const component = new Component("topic_badge", {
        topic,
        classes: "mr-1",
      });
      return component.render();
    })
    .join("");

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
    topics,
  };
};
