module.exports = {
  button: {
    transformer: require("./button/button.transformer"),
    template: "components/button/button.template.njk"
  },
  particles: {
    transformer: require("./particles/particles.transformer"),
    template: "components/particles/particles.template.njk"
  },
  typewriter: {
    transformer: require("./typewriter/typewriter.transformer"),
    template: "components/typewriter/typewriter.template.njk"
  }
}
