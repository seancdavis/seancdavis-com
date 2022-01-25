module.exports = {
  permalink:
    process.env.ELEVENTY_ENV === "production"
      ? false
      : "__dev/{{ page.fileSlug }}/index.html",
  layout: "blank",
  eleventyComputed: {},
};
