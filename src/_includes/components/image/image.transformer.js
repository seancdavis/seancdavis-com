const ImgixClient = require("imgix-core-js")
const lodash = require("lodash")

/**
 * This is a WIP. I would like to:
 *
 * - Make sure tests are running as part of the build. Consider using a build
 *   plugin to achieve that.
 * - Intrinsic sizing built from a ratio?
 * - Use a data-attribute for src on page load and then using srcset (and an
 *   accompanying js component) ???
 * - Or ... maybe use lazy loading (imgix.js has a recommendation on which one
 *   to use)
 * - Write a blog post (specific to imgix)
 * - Clean up the code. Wrap it up in a plugin? Or maybe a shared library. I
 *   feel like this could be a utility that is imported and then made into a
 *   component. That could be a better fit for a blog post, too, because it
 *   could lead to a series of them.
 *
 */

module.exports = ({ xs = "100vw", sm, md, lg, xl, max = 1400, steps = 10, path, ...props }) => {
  if (!path) {
    console.error("The path argument is required for transforming an image.")
    return props
  }

  const client = new ImgixClient({
    domain: process.env.IMGIX_DOMAIN,
    secureURLToken: process.env.IMGIX_TOKEN
  })

  let largestSrc = 0

  const generateUrl = params => client.buildURL(path, { auto: "format,compress", ...params })

  const generateSrcsets = widths => {
    return widths
      .map(width => {
        width = parseInt(width)
        if (width > largestSrc) largestSrc = width
        return `${generateUrl({ w: width })} ${width}w`
      })
      .join(",")
  }

  const isPx = val => lodash.endsWith(val, "px")

  const sizeArgs = [xs, sm, md, lg, xl]

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

  const generateSources = (obj, idx) => {
    if (idx > 0 && !obj.size) return null

    let output = {
      sizes: obj.size
    }

    if (obj.min) {
      output.media = `(min-width: ${obj.min}px)`
    }

    if (isPx(obj.size)) {
      const sizeInt = parseInt(obj.size)
      output.srcset = generateSrcsets([sizeInt, sizeInt * 2])
    } else {
      const pc = parseFloat(obj.size) / 100.0

      const nextSetSize = sizes.slice(idx + 1).find(x => x.size)

      const actualMax = parseInt(nextSetSize ? nextSetSize.min : max) * pc * 2
      const actualMin = parseInt(obj.min) * pc
      const stepLength = (actualMax - actualMin) / (steps - 1)
      const widths = Array.from({ length: steps }, (_, idx) => idx * stepLength + actualMin)
      output.srcset = generateSrcsets(widths)
    }

    return output
  }

  let sources = lodash.compact([...sizes].map(generateSources))

  return {
    ...props,
    sources: lodash.reverse(sources),
    src: generateUrl({ w: largestSrc / 2 })
  }
}
