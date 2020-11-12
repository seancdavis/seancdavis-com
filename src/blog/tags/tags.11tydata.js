module.exports = {
  permalink: "blog/tag/{{ title | slug }}/index.html",
  layout: "tag",
  model: "Tag",
  eleventyComputed: {}
}
