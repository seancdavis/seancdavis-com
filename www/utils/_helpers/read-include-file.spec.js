const { readIncludeFile } = require("./read-include-file")

describe("readIncludeFile()", () => {
  it("reads a file and return the contents", () => {
    const config = {
      dir: {
        input: "utils",
        includes: "_helpers/__fixtures__"
      }
    }
    const result = readIncludeFile("hello-world.txt", config)
    expect(result).toEqual("Hello World\n")
  })
})
