import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import path from "path";

const srcDir = path.join(process.cwd(), "src");
const postsDir = path.join(srcDir, "posts");

/**
 * Returns an array of file paths representing every post.
 *
 * @returns {array} Absolute file paths to all posts.
 */
function allPostFilePaths() {
  return glob.sync(path.join(postsDir, "**/*.md"));
}

/**
 * Reads and parses frontmatter and body content for every post.
 *
 * @returns {array} Post objects parsed by gray-matter, as: { data, content }
 */
function allPosts() {
  return allPostFilePaths().map((filePath) => {
    const fileContent = fs.readFileSync(filePath).toString();
    const { data, content } = matter(fileContent);
    return { data, content };
  });
}

/**
 * Finds all posts without an image.
 *
 * @returns {array} Post objects without an `image` key in frontmatter
 */
export function postsWithoutImage() {
  return allPosts().filter((post) => !post.data.image);
}
