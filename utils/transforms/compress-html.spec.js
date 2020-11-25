const { compressHtml } = require("./compress-html")

const mockInput = `
<span>Hello</span>
<p>World</p>
`

describe("compressHtml()", () => {
  it("sends back the text, uncompressed, if not an HTML file", () => {
    const result = compressHtml(mockInput, "test.css")
    expect(result).toEqual(mockInput)
  })
  it("doesn't compress if not in production", () => {
    const result = compressHtml(mockInput, "test.html")
    expect(result).toEqual(mockInput)
  })
  it("compresses if in production and file is HTML", () => {
    process.env.ELEVENTY_ENV = "production"
    const result = compressHtml(mockInput, "test.html")
    expect(result).toEqual("<span>Hello</span><p>World</p>")
    process.env.ELEVENTY_ENV = "test"
  })
})
