module.exports = {
  permalink: "blog/{{ title | slug }}/index.html",
  layout: "post",
  model: "Post",
  eleventyComputed: {}
}
