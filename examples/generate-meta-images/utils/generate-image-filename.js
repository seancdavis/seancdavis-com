const slugify = require("slugify");

exports.generateImageFilename = (post) => {
  const slugifyOptions = { strict: true, lower: true };
  const formattedDate = new Date(post.date).toISOString().split("T")[0];
  const basename = slugify(`${formattedDate}-${post.title}`, slugifyOptions);
  return `${basename}.png`;
};
