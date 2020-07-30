const path = require("path")

const env = process.env.ELEVENTY_ENV || "production"

module.exports = {
  entry: "./src/_includes/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/js"),
    libraryTarget: "var",
    library: "App"
  },
  mode: env,
  watch: env === "development"
}
