module.exports = {
  plugins: [
    require("postcss-cssnext"),
    require("postcss-import"),
    require("postcss-nested"),
    ...(process.env.NODE_ENV === "production" ? [require("cssnano")] : [])
  ]
}
