const { Component } = require("../../../../utils/shortcodes/component");
const { readSvg } = require("../../../../utils/shortcodes/svg");

module.exports = ({ video, layout = "expanded" }) => {
  let topicData = video?.data?.topics || [];
  // Compact cards behave as if there are no topics, which prevents the
  // unnecessary topic_badge rendering below.
  if (layout === "compact") topicData = [];

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

  let wrapperClasses,
    contentClasses = "";

  if (["expanded", "horizontal"].includes(layout)) {
    wrapperClasses = "bg-white shadow-sm";
    contentClasses = "p-4";
  }
  // Flat cards get vertical padding in the content area.
  if (layout === "flat") contentClasses = "py-4";

  return {
    ...video,
    wrapperClasses,
    contentClasses,
    image,
    playIcon,
    topics,
    layout,
  };
};
