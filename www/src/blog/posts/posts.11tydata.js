module.exports = {
  permalink: "blog/{{ page.fileSlug }}/index.html",
  layout: "post",
  tags: ["Post"],
  eleventyComputed: {
    related_posts: data => {
      if (data.related_posts) return data.related_posts
      return []
    }
  }
}
