const { Component } = require("../../../../utils/shortcodes/component");

module.exports = ({ post, classes = "mb-6" }) => {
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
  if (post.data.image) {
    const component = new Component("image", {
      path: post.data.image,
      sm: "576px",
    });
    image = component.render();
  }

  return {
    ...post,
    classes,
    contributor,
    image,
    topics,
  };
};
