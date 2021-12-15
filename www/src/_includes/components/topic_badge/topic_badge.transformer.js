module.exports = ({ topic, ...props }) => {
  let style = "";

  if (topic?.data?.bgColor) style += `background-color: ${topic.data.bgColor};`;
  if (topic?.data?.textColor) style += `color: ${topic.data.textColor};`;

  return {
    ...props,
    label: topic?.data?.title,
    url: topic.url,
    style,
  };
};
