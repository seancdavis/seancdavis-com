/**
 * Creates the "videos" collection from the "Video" tag, attaching "topics" as
 * the "Topic" collection intersection.
 */
exports.getVideosCollection = (collectionApi) => {
  // Get raw collection data.
  const topics = collectionApi
    .getFilteredByTag("Topic")
    .sort((a, b) => a.data.title - b.data.title);
  let videos = collectionApi
    .getFilteredByTag("Video")
    .sort((a, b) => b.date - a.date);
  const findTagObj = (slug) => topics.find((topic) => topic.fileSlug === slug);
  videos.map((video) => {
    // Add "topics" attribute with rich objects from tag strings (topic slugs).
    let videoTags = (video.data.tags || []).map((tag) => findTagObj(tag));
    video.data.topics = videoTags.filter((x) => !!x);
  });
  // Return the videos collection.
  return videos;
};

/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the "videos" collection from the "Video" tag, attaching "topics" as
   * the "Topic" collection intersection.
   */
  eleventyConfig.addCollection("videos", (collectionApi) =>
    this.getVideosCollection(collectionApi)
  );
};
