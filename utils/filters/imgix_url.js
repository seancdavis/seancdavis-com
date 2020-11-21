const ImgixClient = require("imgix-core-js")

/**
 * Given a path, it loads the a full Imgix URL.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = eleventyConfig => {
  eleventyConfig.addFilter("imgix_url", (input, params = {}) => {
    const client = new ImgixClient({
      domain: process.env.IMGIX_DOMAIN,
      secureURLToken: process.env.IMGIX_TOKEN
    })

    return client.buildURL(input, params)
  })
}
