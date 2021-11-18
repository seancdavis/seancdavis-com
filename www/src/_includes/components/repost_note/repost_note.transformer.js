module.exports = ({ url }) => {
  const { host } = new URL(url);

  return { host, url };
};
