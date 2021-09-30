const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const yaml = require("yaml");

const config = require("../config");

/**
 * Given a post object, format the markdown, resolve the file path, and write
 * the contents to file.
 *
 * @param {object} post Post object
 * @returns object
 */
module.exports = (post) => {
  // Format the markdown by extracting the `body` key and treating the rest of
  // the object as frontmatter.
  const { body } = post;
  delete post.body;
  const content = `---\n${yaml.stringify(post)}---\n\n${body}\n`;
  // Resolve the path to the post file, using the value set in config.js in the
  // project root.
  const basename = slugify(post.title, { strict: true, lower: true });
  const filename = `${basename}.md`;
  const filePath = path.join(config.postsDir, filename);
  // Write the markdown string to file.
  fs.writeFileSync(filePath, content);
  return post;
};
