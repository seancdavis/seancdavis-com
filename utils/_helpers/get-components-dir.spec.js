const path = require("path")

const { getComponentsDir } = require("./get-components-dir")

describe("getComponentsDir()", () => {
  it("returns the project's object when not specified", () => {
    expect(getComponentsDir()).toEqual(path.resolve("src/_components"))
  })
  it("falls back to a sensible default", () => {
    expect(getComponentsDir({})).toEqual(path.resolve("_components"))
  })
  it("allows overrides", () => {
    const config = {
      dir: {
        input: "utils",
        components: "_helpers/__fixtures__"
      }
    }
    expect(getComponentsDir(config)).toEqual(path.resolve("utils/_helpers/__fixtures__"))
  })
})
