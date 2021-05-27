module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nested"),
    require("postcss-cssnext"),
    ...(process.env.NODE_ENV === "production" ? [require("cssnano")] : [])
  ]
}
