const ImgixClient = require("@imgix/js-core");

const client = new ImgixClient({
  domain: process.env.IMGIX_DOMAIN,
  secureURLToken: process.env.IMGIX_TOKEN,
});

module.exports = ({ id, image, ...props }) => {
  let imageUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  if (image) {
    let params = { auto: "format,compress", w: 1600, h: 900, fit: "crop" };
    imageUrl = client.buildURL(image, params);
  }

  return {
    ...props,
    id,
    imageUrl,
  };
};
