module.exports = ({ tag, ...props }) => {
  let style = "";

  if (tag?.data?.bgColor) style += `background-color: ${tag.data.bgColor};`;
  if (tag?.data?.textColor) style += `color: ${tag.data.textColor};`;

  return {
    ...props,
    label: tag?.data?.title,
    url: tag.url,
    style,
  };
};
