const { Component } = require("../../../../utils/shortcodes/component");

module.exports = ({ post, classes = "mb-6" }) => {
  const tagData = post?.data?.hashtags || [];

  const tags = tagData
    .map((tag) => {
      const component = new Component("tag", { tag, classes: "mr-1" });
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
    tags,
  };
};
