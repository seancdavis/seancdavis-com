module.exports = {
  layout: "tag",
  tags: ["Tag"],
  pagination: {
    size: 10,
    alias: "posts",
    before: data => {
      return data.sort((a, b) => b.date - a.date)
    }
  },
  eleventyComputed: {}
}
