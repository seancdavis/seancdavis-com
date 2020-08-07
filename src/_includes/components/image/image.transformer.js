const ImgixClient = require("imgix-core-js")
const lodash = require("lodash")

module.exports = ({
  xs = "100vw",
  sm,
  md,
  lg,
  xl,
  max = 1400,
  steps = 10,
  path,
  ratio,
  ...props
}) => {
  // There are sensible defaults in place for most of the items here, but the
  // path is required to be able to build an image.
  if (!path) {
    console.error("The path argument is required for transforming an image.")
    return props
  }

  // The Imgix client is how the URLs are built (and signed).
  const client = new ImgixClient({
    domain: process.env.IMGIX_DOMAIN,
    secureURLToken: process.env.IMGIX_TOKEN
  })

  // Reference to store the largest image, which is used as the fallback image
  // for older browsers.
  let largestSrc = 0

  // Generates a signed imgix URL. It's pretty locked down to params at this
  // time, just to keep it simple. If a ratio was specified, then also calculate
  // the height as well.
  const generateUrl = width => {
    let params = { auto: "format,compress", w: width }
    if (ratio) {
      const [widthRatio, heightRatio] = ratio.split(":")
      params["h"] = (width * heightRatio) / widthRatio
      params["fit"] = "crop"
    }
    return client.buildURL(path, params)
  }

  // Given an array of widths (as number of pixels), it will return a string
  // that can be used for the srcset attributes for those widths.
  const generateSrcsets = widths => {
    const output = widths.map(width => {
      width = parseInt(width)
      if (width === 0) return null
      if (width > largestSrc) largestSrc = width
      return `${generateUrl(width)} ${width}w`
    })
    return lodash.compact(output).join(",")
  }

  // Given a string value, determine if the units are pixels.
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

  // Given an object with min, max, and size key-value pairs, generate a source
  // object, which may contain size, media, and srcset key-value pairs. (Note:
  // The sizes array of objects above are the items passed in here.)
  const generateSource = (obj, idx) => {
    if (idx > 0 && !obj.size) return null

    let output = {
      sizes: obj.size
    }

    if (obj.min) {
      output.media = `(min-width: ${obj.min}px)`
    }

    // If the size was mentioned in pixels, only generate that size and the
    // retina version.
    if (isPx(obj.size)) {
      const sizeInt = parseInt(obj.size)
      output.srcset = generateSrcsets([sizeInt, sizeInt * 2])
    }
    // Otherwise, generate a series of images (the number is determined by the
    // steps arg).
    else {
      // We assume vw units if they weren't pixels.
      const pc = parseFloat(obj.size) / 100.0
      // Look for the next size that was specified. This will help determine the
      // maximum that the image will (or can) be displayed at this current size.
      const nextSetSize = sizes.slice(idx + 1).find(x => x.size)
      // If there is a size larger than this one that was specified, use the min
      // value for that size as the largest this image can be, taking into
      // account the vw measurement passed. Otherwise, use the overall max size.
      const actualMax = parseInt(nextSetSize ? nextSetSize.min : max) * pc * 2
      // The actual min is the min of the current size object, taking the vw
      // spec into account.
      const actualMin = parseInt(obj.min) * pc
      // The distance (in pixels) between each image that gets generated.
      const stepLength = (actualMax - actualMin) / (steps - 1)
      // An array of the steps. Each item in the array represents a width for
      // which an image will be generated.
      const widths = Array.from({ length: steps }, (_, idx) => idx * stepLength + actualMin)
      // Set the srcset property.
      output.srcset = generateSrcsets(widths)
    }

    // Return the computed object.
    return output
  }

  // Process the sizes arry to generate the sources array.
  let sources = lodash.compact([...sizes].map(generateSource))

  return {
    ...props,
    sources: lodash.reverse(sources),
    src: generateUrl(largestSrc / 2)
  }
}
