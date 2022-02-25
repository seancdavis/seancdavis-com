/**
 * Creates the "events" collection from the "Event" tag, attaching "topics" as
 * the "Topic" collection intersection.
 */
exports.getEventsCollection = (collectionApi) => {
  // Get raw collection data.
  const topics = collectionApi
    .getFilteredByTag("Topic")
    .sort((a, b) => a.data.title - b.data.title);
  let events = collectionApi
    .getFilteredByTag("Event")
    .sort((a, b) => b.start_date - a.start_date);
  const findTagObj = (slug) => topics.find((topic) => topic.fileSlug === slug);
  events.map((event) => {
    // Add "topics" attribute with rich objects from tag strings (topic slugs).
    let eventTags = (event.data.tags || []).map((tag) => findTagObj(tag));
    event.data.topics = eventTags.filter((x) => !!x);
  });
  // Return the events collection.
  return events;
};

/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the "events" collection from the "Event" tag, attaching "topics" as
   * the "Topic" collection intersection.
   */
  eleventyConfig.addCollection("events", (collectionApi) =>
    this.getEventsCollection(collectionApi)
  );
};
