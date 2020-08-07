const transform = require("./image.transformer")

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
  it("sources to the default max (x2 for retina) with default number of steps if no args passed", () => {
    const result = transform({ path: "/my-image.jpg" })
    expect(result.sources.length).toEqual(1)
    // Implies that we are skipping 0w srcset.
    expect(result.sources[0].srcset.split(",").length).toEqual(9)
    expect(result.sources[0].srcset).toContain(`${breakpoints.xl.max * 2}w`)
  })
  it("doesn't skip the first srcset when the lowest width is not zero", () => {
    const result = transform({ path: "/my-image.jpg", md: "100vw" })
    // Implies that the array of sources is reversed.
    expect(result.sources[0].srcset.split(",").length).toEqual(10)
  })
  // This also implies that the array of sources is reversed.
  it("sources to the next max value (x2 for retina)", () => {
    const result = transform({ path: "/my-image.jpg", md: "400px" })
    expect(result.sources.length).toEqual(2)
    // Still skipping 0w
    expect(result.sources[1].srcset.split(",").length).toEqual(9)
    expect(result.sources[1].srcset).toContain(`${breakpoints.md.min * 2}w`)
  })
  it("can adjust the number of steps", () => {
    const result = transform({ path: "/my-image.jpg", md: "100vw", steps: 5 })
    expect(result.sources[0].srcset.split(",").length).toEqual(5)
  })
  it("will adjust srcset based on vw widths", () => {
    const result = transform({ path: "/my-image.jpg", lg: "50vw" })
    expect(result.sources[0].srcset).toContain(breakpoints.xl.max)
  })
  it("will only build two srcset values for a size sent a px value", () => {
    const result = transform({ path: "/my-image.jpg", md: "200px" })
    expect(result.sources[0].srcset).toContain("200w")
    expect(result.sources[0].srcset).toContain("400w")
  })
  it("generates a default src value as the max by default", () => {
    const result = transform({ path: "/my-image.jpg" })
    expect(result.src).toContain("1400")
  })
  it("generates a default src value as the max", () => {
    const result = transform({ path: "/my-image.jpg", md: "1500px" })
    expect(result.src).toContain("1500")
  })
  it("adds height and fit params when specifying ratio", () => {
    const result = transform({ path: "/my-image.jpg", md: "200px", ratio: "2:1" })
    expect(result.sources[0].srcset).toContain("w=200&h=100&fit=crop")
  })
})
