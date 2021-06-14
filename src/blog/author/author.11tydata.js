module.exports = {
  layout: "author",
  tags: ["Author"],
  pagination: {
    size: 10,
    alias: "posts",
    before: data => {
      return data.sort((a, b) => b.date - a.date)
    }
  },
  eleventyComputed: {}
}
