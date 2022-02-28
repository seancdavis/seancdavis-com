const { getNewsCollection } = require("./news");
const { getEventsCollection } = require("./events");

exports.getDateToCompare = function (obj) {
  if (!obj.data.start_date) return obj.date;
  return Date.parse(obj.data.start_date);
};

/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  /**
   * Creates the "news_events" collection as a combination of the news and event
   * collections.
   */
  eleventyConfig.addCollection("news_events", (collectionApi) => {
    let news = getNewsCollection(collectionApi);
    let events = getEventsCollection(collectionApi);

    // Concatenate all collections and sort in reverse chronological order.
    const news_events = [...news, ...events].sort((a, b) => {
      return this.getDateToCompare(b) - this.getDateToCompare(a);
    });

    return news_events;
  });
};
