const { Component } = require("../../../../utils/shortcodes/component");
const { readSvg } = require("../../../../utils/shortcodes/svg");

const renderContentCard = (item, layout) => {
  const component = new Component("content_card", { item, layout });
  return component.render();
};

module.exports = ({ heading, subheading, link, collection }) => {
  // Get featured content card markup (left side).
  const featuredItem = renderContentCard(collection[0], "flat");
  // Get compact items markup (right side). Note that this array is expected to
  // already have been sliced by the home collection.
  const compactItems = collection
    .slice(1)
    .map((item) => renderContentCard(item, "compact"))
    .join("");
  // Add arrow to link object, if it exists.
  if (link) link.icon = readSvg("arrow-right");

  return { heading, subheading, link, featuredItem, compactItems };
};
