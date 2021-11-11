const path = require("path");
const webpack = require("webpack");

const env = process.env.ELEVENTY_ENV || "production";

module.exports = {
  entry: "./src/_includes/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/js"),
    libraryTarget: "var",
    library: "App",
  },
  plugins: [
    new webpack.DefinePlugin({
      ALGOLIA_API_KEY: JSON.stringify(process.env.ALGOLIA_API_KEY),
      ALGOLIA_APP_ID: JSON.stringify(process.env.ALGOLIA_APP_ID),
      ALGOLIA_INDEX_NAME: JSON.stringify(process.env.ALGOLIA_INDEX_NAME),
      ENV: JSON.stringify(env),
    }),
  ],
  mode: env,
  watch: env === "development",
};
