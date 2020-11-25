const { readSvg } = require("./svg")

const config = {
  dir: {
    input: "utils",
    includes: "shortcodes/__fixtures__"
  }
}

describe("readSvg()", () => {
  it("Reads the contents of the SVG from within an svg directory", () => {
    expect(readSvg("test", config)).toEqual("Hello World\n")
  })
})
