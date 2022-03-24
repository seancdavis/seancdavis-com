import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import path from "path";
// import type {GrayMatterFile} from 'gray-matter'

const srcDir = path.join(process.cwd(), "src");
const postsDir = path.join(srcDir, "posts");

// Note: There are many other possible properties, but this is all we're working
// with in this script.
type PostFrontmatter = {
  title: string;
  image: string;
  seo: {
    image: string;
  };
  [key: string]: any;
};

export type Post = {
  data: PostFrontmatter;
  content: string;
  filePath: string;
};

/**
 * Returns an array of file paths representing every post.
 *
 * @returns {array} Absolute file paths to all posts.
 */
function allPostFilePaths(): string[] {
  return glob.sync(path.join(postsDir, "**/*.md"));
}

/**
 * Reads and parses frontmatter and body content for every post.
 *
 * @returns {array} Post objects parsed by gray-matter,
 * as: { data, content, filePath }
 */
function allPosts(): Post[] {
  return allPostFilePaths().map((filePath) => {
    const fileContent = fs.readFileSync(filePath).toString();
    const { data, content }: { data: any; content: string } =
      matter(fileContent);
    return { data, content, filePath } as Post;
  });
}

/**
 * Finds all posts without an image.
 *
 * @returns {array} Post objects without an `image` key in frontmatter
 */
export function postsWithoutImage(): Post[] {
  return allPosts().filter((post) => !post.data.image);
}
