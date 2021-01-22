const { renderMarkdown } = require("./markdown")

describe("renderMarkdown()", () => {
  it("Converts a markdown string to HTML", () => {
    const input = `
# Heading 1

Hello world.
    `
    expect(renderMarkdown(input)).toEqual("<h1>Heading 1</h1>\n<p>Hello world.</p>\n")
  })
})
