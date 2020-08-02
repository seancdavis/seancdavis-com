const ImgixClient = require("imgix-core-js")
const lodash = require("lodash")

/**
 * This is a WIP. I would like to:
 *
 * - Get it rendering on the front-end
 * - Figure out a default src
 * - Use the <picture> object
 * - Intrinsic sizing built from a ratio?
 * - Use a data-attribute for src on page load and then using srcset (and an
 *   accompanying js component)
 * - Or ... maybe use lazy loading (imgix.js has a recommendation on which one
 *   to use)
 * - Clean up the code.
 * - Wrap it up in a plugin?
 * - Write a blog post (specific to imgix)
 *
 */

module.exports = ({
  xs = "100vw",
  sm = "100vw",
  md = "100vw",
  lg = "100vw",
  xl = "100vw",
  max = 1400,
  steps = 10,
  path,
  ...props
}) => {
  if (!path) {
    console.error("The path argument is required for transforming an image.")
    return props
  }

  var client = new ImgixClient({
    domain: process.env.IMGIX_DOMAIN,
    secureURLToken: process.env.IMGIX_TOKEN
  })

  const generateUrl = params => client.buildURL(path, { auto: "format,compress", ...params })

  const generateSrcsets = widths => {
    return widths.map(width => `${generateUrl({ w: width })} ${width}w`).join(",")
  }

  const isPx = val => lodash.endsWith(val, "px")

  // These match Tailwind's breakpoints, with a passed-in max.
  let sizes = [
    {
      min: 0,
      max: 640,
      size: xs
    },
    {
      min: 640,
      max: 768,
      size: sm
    },
    {
      min: 768,
      max: 1024,
      size: md
    },
    {
      min: 1024,
      max: 1280,
      size: lg
    },
    {
      min: 1280,
      max: parseInt(max),
      size: xl
    }
  ]

  let sources = [...sizes].map(({ min, max, size }) => {
    let output = {
      sizes: size
    }

    if (min) {
      output.media = `(min-width: ${min}px)`
    }

    if (isPx(size)) {
      const sizeInt = parseInt(size)
      output.srcset = generateSrcsets([sizeInt, sizeInt * 2])
    } else {
      const pc = parseFloat(size) / 100.0
      const actualMax = parseInt(max) * pc * 2
      const actualMin = parseInt(min) * pc
      const stepLength = (actualMax - actualMin) / (steps - 1)
      const widths = Array.from({ length: steps }, (_, idx) => idx * stepLength + actualMin)
      output.srcset = generateSrcsets(widths)
    }

    return output
  })

  return {
    ...props,
    sources: sources
  }
}
