import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import path from "path";

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

type PostMetadata = {
  slug: string;
};

export type Post = {
  __metadata: PostMetadata;
  data: PostFrontmatter;
  content: string;
  filePath: string;
};

/**
 * Reads and parses frontmatter and body content for every post.
 *
 * @returns {array} Post objects parsed by gray-matter,
 * as: { data, content, filePath }
 */
function allPosts(postsDir: string): Post[] {
  const allPostFilePaths = glob.sync(path.join(postsDir, "**/*.md"));
  return allPostFilePaths.map((filePath) => {
    const fileContent = fs.readFileSync(filePath).toString();
    const { data, content }: { data: any; content: string } =
      matter(fileContent);
    const __metadata = postMetadata(filePath);
    return { __metadata, data, content, filePath } as Post;
  });
}

/**
 * Build metadata object for post.
 *
 */
function postMetadata(filePath: string): PostMetadata {
  return {
    slug: path
      .basename(filePath, path.extname(filePath))
      .replace(/^\d{4}-\d{2}-\d{2}-/, ""),
  };
}

/**
 * Finds all posts without an image.
 *
 * @returns {array} Post objects without an `image` key in frontmatter
 */
export function postsWithoutImage(postsDir: string): Post[] {
  return allPosts(postsDir).filter((post) => !post.data.image);
}
