const fs = require("fs")
const glob = require("glob")
const nunjucks = require("nunjucks")
const path = require("path")

const { getComponentsDir } = require("../_helpers/get-components-dir")
const config = require("../../eleventy.config")

exports.Component = class Component {
  /**
   * Initialize a new component.
   *
   * @param {string} name Name of the component as the directory in which the
   * component lives.
   * @param {object} props Properties to render.
   * @param {object} cfg Eleventy config object. (defaults to the project
   * config)
   */
  constructor(name, props = {}, cfg = config) {
    this.load(name, cfg)
    if (!this.template) throw `Template file does not exist: ${name}`
    this.props = props
  }

  /**
   * Load the appropriate component files.
   *
   * @param {string} name Name of the component as the directory in which the
   * component lives.
   * @param {object} config Eleventy config object.
   */
  load(name, config) {
    const dir = getComponentsDir(config)
    // Load transformer as the default export.
    const transformer = glob.sync(path.join(dir, name, "*.transformer.js"))[0]
    if (transformer) {
      const module = require(transformer)
      if (typeof module === "function") this.transformer = module
    }
    // Load the template content.
    const template = glob.sync(path.join(dir, name, "*.template.njk"))[0]
    if (template) this.template = fs.readFileSync(template).toString()
  }

  /**
   * If the component has a transformer, transform the props. (NOTE: This should
   * only be called from the render() function.)
   */
  transform() {
    if (!this.transformer) return this.props
    this.props = this.transformer(this.props)
  }

  /**
   * Render the component, returning the HTML string.
   */
  render() {
    this.transform()
    return nunjucks.renderString(this.template, this.props)
  }

  /**
   * Whether or not the component should have paired tags or a single tag.
   */
  isPaired() {
    return this.template.includes("{{ children")
  }
}

/**
 * Sets the props for a component and then renders the component.
 *
 * @param {object} component A component object (from class above).
 * @param {object} props The properties to set on the component.
 */
const renderComponent = (component, props) => {
  try {
    component.props = props
    return component.render()
  } catch (error) {
    throw console.error(`ERROR: `, error)
  }
}

/**
 * Provides a method for adding NJK components.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  // Grab all the directories in the components dir. Note that this only grabs
  // top-level comps at this time.
  let components = glob.sync(path.join(getComponentsDir(config), "*"))
  // Loop through each ...
  components = components.map((compDir) => {
    // Extract the name of the directory, which is expected to match the name of
    // the component and its interior files.
    const name = path.basename(compDir)
    // Instantiate the component object.
    const component = new this.Component(name, {})
    // Swap hyphens for underscores in shortcode name.
    const shortcodeName = name.replace(/\-/gi, "_")
    // If the component is paired ...
    if (component.isPaired()) {
      // ... Render the component, setting the children prop appropriately.
      eleventyConfig.addPairedNunjucksShortcode(shortcodeName, (children, props) => {
        return renderComponent(component, { ...props, children: children })
      })
    } else {
      // Otherwise, render an unpaired component and pass the props directly.
      eleventyConfig.addNunjucksShortcode(shortcodeName, (props) => {
        return renderComponent(component, props)
      })
    }
  })
}
