const { Component } = require("../../../../utils/shortcodes/component");
const { readSvg } = require("../../../../utils/shortcodes/svg");

const renderPostCard = (post, layout) => {
  const component = new Component("post_card", { post, layout });
  return component.render();
};

module.exports = ({ heading, subheading, link, collection }) => {
  // Get featured post card markup (left side).
  const featuredItem = renderPostCard(collection[0], "flat");
  // Get compact items markup (right side). Note that this array is expected to
  // already have been sliced by the home collection.
  const compactItems = collection
    .slice(1)
    .map((item) => renderPostCard(item, "compact"))
    .join("");
  // Add arrow to link object, if it exists.
  if (link) link.icon = readSvg("arrow-right");

  return { heading, subheading, link, featuredItem, compactItems };
};
