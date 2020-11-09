const ImgixClient = require("imgix-core-js")
const lodash = require("lodash")

module.exports = ({ defaults, path, title, image, description, overrides }) => {
  const title_template = overrides.title_template || defaults.title_template

  const getTitle = str => title_template.replace("%s", str)

  const buildUrl = path => `${defaults.base_url}${path}`

  const pageProps = {
    description: description,
    image: image,
    title: title
  }

  const ogProp = key =>
    lodash.get(overrides, `og.${key}`) ||
    overrides[key] ||
    pageProps[key] ||
    lodash.get(defaults, `og.${key}`) ||
    defaults[key]

  const twitterProp = key =>
    lodash.get(overrides, `twitter.${key}`) ||
    lodash.get(overrides, `og.${key}`) ||
    overrides[key] ||
    pageProps[key] ||
    lodash.get(defaults, `twitter.${key}`) ||
    lodash.get(defaults, `og.${key}`) ||
    defaults[key]

  // ---------------------------------------- | Imgix

  // The Imgix client is how the URLs are built (and signed).
  const client = new ImgixClient({
    domain: process.env.IMGIX_DOMAIN,
    secureURLToken: process.env.IMGIX_TOKEN
  })

  const buildImageUrl = path => {
    let params = { auto: "format,compress", w: 1200, h: 630, fit: "crop" }
    const imgixPath = `/meta/${path}`.replace(/\/\/+/gi, "/")
    return client.buildURL(imgixPath, params)
  }

  // ---------------------------------------- | Response Object

  return {
    description: overrides.description || description || defaults.description,
    image: buildImageUrl(overrides.image || image || defaults.image),
    og: {
      description: ogProp("description"),
      image: buildImageUrl(ogProp("image")),
      title: getTitle(ogProp("title")),
      type: lodash.get(overrides, "og.type") || lodash.get(defaults, "og.type")
    },
    title: getTitle(overrides.title || title),
    twitter: {
      description: twitterProp("description"),
      image: buildImageUrl(twitterProp("image")),
      title: getTitle(twitterProp("title")),
      card: lodash.get(overrides, "twitter.card") || lodash.get(defaults, "twitter.card")
    },
    url: buildUrl(path)
  }
}
