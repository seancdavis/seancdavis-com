const transform = require("./image.transformer")
const lodash = require("lodash")

const breakpoints = {
  xs: {
    min: 0,
    max: 640
  },
  sm: {
    min: 640,
    max: 768
  },
  md: {
    min: 768,
    max: 1024
  },
  lg: {
    min: 1024,
    max: 1280
  },
  xl: {
    min: 1280,
    max: 1400
  }
}

describe("Image Transformer", () => {
  it("passes non-transformed values through", () => {
    const result = transform({ class: "my-image", path: "/my-image.jpg" })
    expect(result.class).toEqual("my-image")
  })
  it("builds out sources with sensible defaults", () => {
    const result = transform({ path: "/my-image.jpg" })
    expect(result.sources[0].srcset).toContain(`${breakpoints.xs.max * 2}w`)
    expect(result.sources[1].srcset).toContain(`${breakpoints.sm.max * 2}w`)
    expect(result.sources[2].srcset).toContain(`${breakpoints.md.max * 2}w`)
    expect(result.sources[3].srcset).toContain(`${breakpoints.lg.max * 2}w`)
    expect(result.sources[4].srcset).toContain(`${breakpoints.xl.max * 2}w`)
  })
  it("generates 10 steps for each srcset", () => {
    const result = transform({ path: "/my-image.jpg" })
    expect(result.sources[0].srcset.split(",").length).toEqual(10)
    expect(result.sources[1].srcset.split(",").length).toEqual(10)
    expect(result.sources[2].srcset.split(",").length).toEqual(10)
    expect(result.sources[3].srcset.split(",").length).toEqual(10)
    expect(result.sources[4].srcset.split(",").length).toEqual(10)
  })
  it("can adjust the number of steps", () => {
    const result = transform({ path: "/my-image.jpg", steps: 5 })
    expect(result.sources[0].srcset.split(",").length).toEqual(5)
    expect(result.sources[1].srcset.split(",").length).toEqual(5)
    expect(result.sources[2].srcset.split(",").length).toEqual(5)
    expect(result.sources[3].srcset.split(",").length).toEqual(5)
    expect(result.sources[4].srcset.split(",").length).toEqual(5)
  })
  it("will adjust srcset based on vw widths", () => {
    const result = transform({ path: "/my-image.jpg", lg: "50vw" })
    expect(lodash.get(result, "sources[3].srcset")).toContain(breakpoints.lg.max)
  })
  it("creates an array of media queries representing the sources", () => {
    const result = transform({ path: "/my-image.jpg" })
    // Except not for the smallest sizes.
    expect(result.sources[0].media).toEqual(undefined)
    expect(result.sources[1].media).toEqual(`(min-width: ${breakpoints.sm.min}px)`)
    expect(result.sources[2].media).toEqual(`(min-width: ${breakpoints.md.min}px)`)
    expect(result.sources[3].media).toEqual(`(min-width: ${breakpoints.lg.min}px)`)
    expect(result.sources[4].media).toEqual(`(min-width: ${breakpoints.xl.min}px)`)
  })
  it("creates an array of sizes representing the sources", () => {
    const result = transform({ path: "/my-image.jpg", lg: "50vw" })
    expect(result.sources[0].sizes).toEqual("100vw")
    expect(result.sources[1].sizes).toEqual("100vw")
    expect(result.sources[2].sizes).toEqual("100vw")
    expect(result.sources[3].sizes).toEqual("50vw")
    expect(result.sources[4].sizes).toEqual("100vw")
  })
  it("will only build two srcset values for a size sent a px value", () => {
    const result = transform({ path: "/my-image.jpg", md: "200px" })
    expect(result.sources[2].srcset).toContain("200w")
    expect(result.sources[2].srcset).toContain("400w")
  })
})
