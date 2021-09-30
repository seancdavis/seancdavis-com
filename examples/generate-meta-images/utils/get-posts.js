const fs = require("fs");
const glob = require("glob");
const matter = require("gray-matter");
const path = require("path");

const config = require("../config");

/**
 * Read and parse all .md files in the posts directory in post objects, and
 * return the array of objects.
 *
 * @returns array
 */
module.exports = () => {
  // Get post file paths.
  const postsPattern = path.join(config.postsDir, "*.md");
  const postFiles = glob.sync(postsPattern);
  // Loop through the paths to parse the posts.
  const posts = postFiles.map((file) => {
    const fileContent = fs.readFileSync(file);
    const { data, content } = matter(fileContent);
    // `body` is set to the content of the post, while the frontmatter object is
    // sent directly.
    return { ...data, body: content };
  });
  // Return the array of objects.
  return posts;
};
