const { Component } = require("../../../../utils/shortcodes/component");

module.exports = ({ contributor, classes }) => {
  let image;
  if (contributor.data.image) {
    const component = new Component("image", {
      path: contributor.data.image,
      sm: "576px",
    });
    image = component.render();
  }

  return {
    classes,
    image,
    name: contributor.data.title,
    url: contributor.url,
  };
};
