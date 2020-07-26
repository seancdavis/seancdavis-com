const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/js"),
    libraryTarget: "var",
    library: "App"
  },
  mode: "production",
  watch: true
}
