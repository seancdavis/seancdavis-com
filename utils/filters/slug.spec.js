const { slugifyInput } = require("./slug")

describe("slugifyInput()", () => {
  it("returns false when there is no input", () => {
    const result = slugifyInput()
    expect(result).toEqual(false)
  })
  it("converts the string to lower case", () => {
    const result = slugifyInput("Hello World")
    expect(result).toEqual("hello-world")
  })
  it("removes all unwanted characters", () => {
    const result = slugifyInput("Hello :!?'\"@#,:?.(){}[]*+~ World")
    expect(result).toEqual("hello-world")
  })
  it("replaces select characters with words", () => {
    const result = slugifyInput("Hello & % < > $ World")
    expect(result).toEqual("hello-and-percent-less-greater-dollar-world")
  })
  it("strips lingering spaces", () => {
    const result = slugifyInput("Hello  World ### ")
    expect(result).toEqual("hello-world")
  })
})
