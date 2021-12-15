module.exports = {
  layout: "topic",
  tags: ["Topic"],
  pagination: {
    size: 10,
    alias: "posts",
    before: (data) => {
      return data.sort((a, b) => b.date - a.date);
    },
  },
  eleventyComputed: {
    title: (data) => {
      if ((data?.pagination?.pageNumber || 0) === 0) return data.title;
      return `${data.title} (Page ${data.pagination.pageNumber + 1})`;
    },
  },
};
