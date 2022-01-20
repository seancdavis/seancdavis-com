const { Component } = require("../../../../utils/shortcodes/component");

module.exports = ({
  post,
  classes = "mb-6",
  maxWidth = "xl",
  flat = false,
  compact = false,
}) => {
  const topicData = post?.data?.topics || [];

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
      classes: "mb-2",
    });
    contributor = component.render();
  }

  let image;
  if (post.data.image && !compact) {
    const component = new Component("image", {
      path: post.data.image,
      sm: "576px",
    });
    image = component.render();
  }

  // Add classes to apply to wrapping element.
  classes += " component--post-card bg-white";
  if (!flat) classes += " shadow-sm";
  if (maxWidth) classes += ` max-w-${maxWidth}`;

  // Add classes to the content (not image) wrapper.
  let contentClasses = flat ? "py-4" : "p-4";

  return {
    ...post,
    classes,
    contentClasses,
    contributor,
    image,
    topics,
  };
};
