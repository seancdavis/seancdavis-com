const slugify = require("slugify");

/**
 * Given a post object, combines the date and title to form an image filename
 * with a .png extension.
 *
 * @param {object} post Post object with title and date
 * @returns string
 */
module.exports = (post) => {
  const slugifyOptions = { strict: true, lower: true };
  const formattedDate = new Date(post.date).toISOString().split("T")[0];
  const basename = slugify(`${formattedDate}-${post.title}`, slugifyOptions);
  return `${basename}.png`;
};
