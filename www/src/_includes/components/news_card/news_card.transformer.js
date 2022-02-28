const { Component } = require("../../../../utils/shortcodes/component");
const { readSvg } = require("../../../../utils/shortcodes/svg");

module.exports = ({ item, layout = "expanded" }) => {
  let topicData = item?.data?.topics || [];
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

  // let image;
  // if (item.data.image) {
  //   const component = new Component("image", {
  //     path: item.data.image,
  //     sm: "576px",
  //   });
  //   image = component.render();
  // }

  const icons = {
    title: readSvg("megaphone"),
    link: readSvg("external-link"),
  };

  let wrapperClasses,
    contentClasses = "";

  if (["expanded", "horizontal"].includes(layout)) {
    wrapperClasses = "bg-white shadow-sm";
    contentClasses = "p-4";
  }
  // Flat cards get vertical padding in the content area.
  if (layout === "flat") contentClasses = "py-4";

  return {
    ...item,
    wrapperClasses,
    contentClasses,
    // image,
    icons,
    topics,
    layout,
  };
};
