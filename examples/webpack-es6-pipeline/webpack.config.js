const path = require("path")

const env = process.env.WEBPACK_ENV || "development"

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/js"),
    libraryTarget: "var",
    library: "App"
  },
  mode: env,
  watch: env === "development"
}
