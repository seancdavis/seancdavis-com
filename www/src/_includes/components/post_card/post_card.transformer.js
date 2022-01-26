const { Component } = require("../../../../utils/shortcodes/component");

module.exports = ({ post, layout = "expanded", wrapperClasses = "" }) => {
  let topicData = post?.data?.topics ?? [];
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

  let contributor;
  if (post.data.contributor) {
    const component = new Component("contributor", {
      contributor: post.data.contributor,
    });
    contributor = component.render();
  }

  let image;
  if (post.data.image && layout !== "compact") {
    const component = new Component("image", {
      path: post.data.image,
      sm: "576px",
    });
    image = component.render();
  }

  let contentClasses = "";

  if (["expanded", "horizontal"].includes(layout)) {
    // If wrapper classes were set, don't mess with them.
    if (!wrapperClasses) wrapperClasses = "bg-white shadow-sm";
    contentClasses = "p-4";
  }
  // Flat cards get vertical padding in the content area.
  if (layout === "flat") contentClasses = "py-4";

  return {
    ...post,
    wrapperClasses,
    contentClasses,
    contributor,
    image,
    topics,
    layout,
  };
};
