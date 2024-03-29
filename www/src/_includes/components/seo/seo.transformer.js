const ImgixClient = require("@imgix/js-core");

module.exports = ({
  defaults,
  path,
  title,
  image,
  description,
  overrides = {},
}) => {
  const title_template = overrides.title_template || defaults.title_template;

  const getTitle = (str) => safeString(title_template.replace("%s", str));

  const buildUrl = (path) => `${defaults.base_url}${path}`;

  // Removes double quotes from strings. This is because the content is rendered
  // directly to the page. This protects against invalid HTML.
  const safeString = (str) => str.replace(/\"/g, "");

  const pageProps = {
    description: description,
    image: image,
    title: title,
  };

  const ogProp = (key) =>
    overrides?.og?.[key] ||
    overrides[key] ||
    pageProps[key] ||
    defaults?.og?.[key] ||
    defaults[key];

  const twitterProp = (key) =>
    overrides?.twitter?.[key] ||
    overrides?.og?.[key] ||
    overrides[key] ||
    pageProps[key] ||
    defaults?.twitter?.[key] ||
    defaults?.og?.[key] ||
    defaults[key];

  // ---------------------------------------- | Imgix

  // The Imgix client is how the URLs are built (and signed).
  const client = new ImgixClient({
    domain: process.env.IMGIX_DOMAIN,
    secureURLToken: process.env.IMGIX_TOKEN,
  });

  const buildImageUrl = (imgPath) => {
    let params = { auto: "format,compress", w: 1200, h: 630, fit: "crop" };
    const imgixPath = imgPath.startsWith("/") ? imgPath : `/${imgPath}`;
    return safeString(client.buildURL(imgixPath, params));
  };

  // ---------------------------------------- | Response Object

  return {
    description: safeString(
      overrides.description || description || defaults.description
    ),
    image: buildImageUrl(overrides.image || image || defaults.image),
    og: {
      description: safeString(ogProp("description")),
      image: buildImageUrl(ogProp("image")),
      title: getTitle(ogProp("title")),
      type: overrides?.og?.type || defaults?.og?.type,
    },
    title: getTitle(overrides.title || title),
    twitter: {
      description: safeString(twitterProp("description")),
      image: buildImageUrl(twitterProp("image")),
      title: getTitle(twitterProp("title")),
      card: overrides?.twitter?.card || defaults?.twitter?.card,
    },
    url: buildUrl(path),
  };
};
