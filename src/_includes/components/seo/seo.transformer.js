const lodash = require("lodash")

module.exports = ({ defaults, path, title, image, description, overrides }) => {
  const title_template = overrides.title_template || defaults.title_template

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

  return {
    description: overrides.description || description || defaults.description,
    image: overrides.image || image || defaults.image,
    og: {
      description: ogProp("description"),
      image: ogProp("image"),
      title: ogProp("title"),
      type: lodash.get(overrides, "og.type") || lodash.get(defaults, "og.type")
    },
    title: title_template.replace("%s", overrides.title || title),
    twitter: {
      description: twitterProp("description"),
      image: twitterProp("image"),
      title: twitterProp("title"),
      card: lodash.get(overrides, "twitter.card") || lodash.get(defaults, "twitter.card")
    },
    url: `${defaults.base_url}${path}`
  }
}
