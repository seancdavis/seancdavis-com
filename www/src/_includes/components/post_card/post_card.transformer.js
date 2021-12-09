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

  let author;
  if (post.data.rich_author) {
    const component = new Component("author", {
      author: post.data.rich_author,
      classes: "mb-2",
    });
    author = component.render();
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
    author,
    image,
    topics,
  };
};
