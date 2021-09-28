const path = require("path")

const { getIncludeDir } = require("./get-include-dir")

describe("getIncludeDir()", () => {
  it("returns the project's object when not specified", () => {
    expect(getIncludeDir()).toEqual(path.resolve("src/_includes"))
  })
  it("falls back to eleventy defaults", () => {
    expect(getIncludeDir({})).toEqual(path.resolve("_includes"))
  })
  it("allows overrides", () => {
    const config = {
      dir: {
        input: "utils",
        includes: "_helpers/__fixtures__"
      }
    }
    expect(getIncludeDir(config)).toEqual(path.resolve("utils/_helpers/__fixtures__"))
  })
})
