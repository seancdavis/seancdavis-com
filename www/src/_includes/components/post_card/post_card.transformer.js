const { Component } = require("../../../../utils/shortcodes/component");

module.exports = ({
  post,
  classes = "mb-6",
  maxWidth = "xl",
  flat = false,
  compact = false,
}) => {
  let topicData = post?.data?.topics ?? [];
  // Compact cards behave as if there are no topics, which prevents the
  // unnecessary topic_badge rendering below.
  if (compact) topicData = [];

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
  let contentClasses = "p-4";
  // No padding on the content for compact cards.
  if (compact) contentClasses = null;
  // Flat, expanded cards get vertical padding.
  if (flat && !compact) contentClasses = "py-4";

  return {
    ...post,
    classes,
    contentClasses,
    contributor,
    image,
    topics,
  };
};
