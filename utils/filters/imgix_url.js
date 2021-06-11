const ImgixClient = require("@imgix/js-core")

/**
 * Converts a path to an image in S3 to a full (signed) Imgix URL.
 *
 * @param {string} input Path to the image in S3.
 * @param {object} params Imgix parameters used to manipulate the image.
 *
 * @returns Full Imgix URL with signed token
 */
exports.imgixUrl = (input, params = {}) => {
  if (!input) return null

  const client = new ImgixClient({
    domain: process.env.IMGIX_DOMAIN,
    secureURLToken: process.env.IMGIX_TOKEN
  })

  return client.buildURL(input, params)
}

/**
 * Given a path, it loads the a full Imgix URL.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = eleventyConfig => {
  eleventyConfig.addFilter("imgix_url", (input, params) => this.imgixUrl(input, params))
}
