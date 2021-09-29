const slugify = require("slugify");

exports.generateImageFilename = (post) => {
  const slugifyOptions = { strict: true, lower: true };
  const basename = slugify(`${post.date}-${post.title}`, slugifyOptions);
  return `${basename}.png`;
};
