const path = require("path")

const { Component } = require("./component")

const mockConfig = {
  dir: {
    input: "utils",
    components: "shortcodes/__fixtures__/components"
  }
}

describe("new Component()", () => {
  it("loads all relevant files", () => {
    const component = new Component("transformer-test", {}, mockConfig)
    expect(typeof component.transformer).toEqual("function")
    expect(component.template).toEqual("<p>{{ title }}</p>\n")
  })
  it("leaves transformer undefined when it doesn't exist", () => {
    const component = new Component("no-transformer-test", {}, mockConfig)
    expect(component.transformer).toBeUndefined()
    expect(component.template).toEqual("<p>{{ title }}</p>\n")
  })
  it("throws an error when the template doesn't exist", () => {
    expect(() => {
      new Component("no-template-test", {}, mockConfig)
    }).toThrow()
  })
})

describe("transform()", () => {
  it("transforms props", () => {
    const component = new Component("transformer-test", { label: "test" }, mockConfig)
    expect(component.props.title).toEqual(undefined)
    component.transform()
    expect(component.props.title).toEqual("test")
  })
  it("returns the props as they were if no transformer", () => {
    const component = new Component("no-transformer-test", { label: "test" }, mockConfig)
    expect(component.props.label).toEqual("test")
    component.transform()
    expect(component.props.label).toEqual("test")
  })
})

describe("render()", () => {
  it("renders and transforms props", () => {
    const component = new Component("transformer-test", { label: "test" }, mockConfig)
    expect(component.render()).toEqual("<p>test</p>\n")
  })
  it("renders directly when no props", () => {
    const component = new Component("no-transformer-test", { title: "test" }, mockConfig)
    expect(component.render()).toEqual("<p>test</p>\n")
  })
})
