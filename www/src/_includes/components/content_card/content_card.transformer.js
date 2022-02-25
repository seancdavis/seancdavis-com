const { Component } = require("../../../../utils/shortcodes/component");

const contentCardMap = {
  Event: { component: "event_card", prop: "event" },
  News: { component: "news_card", prop: "item" },
  Post: { component: "post_card", prop: "post" },
  Video: { component: "video_card", prop: "video" },
};

const contentTypes = Object.keys(contentCardMap);

const getContentType = (item) => {
  const tags = item?.data?.tags || [];
  return tags.find((tag) => contentTypes.includes(tag));
};

/**
 * The content card is responsible for determining the type of content and then
 * rendering the appropriate card component.
 */
module.exports = ({ item, ...props }) => {
  const contentType = getContentType(item);
  const contentCard = contentCardMap[contentType];

  if (!contentCard) {
    throw new Error(
      "[Content Card] Item not found. Make sure you are passing the content object to an `item` prop."
    );
  }

  const componentProps = { [contentCard.prop]: item, ...props };
  const component = new Component(contentCard.component, componentProps);
  const card = component.render();

  return { card };
};
