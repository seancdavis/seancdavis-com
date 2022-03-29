import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import path from "path";
import { format } from "date-fns";
import yaml from "js-yaml";

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
  dateStr: string;
  filename: string;
  filePath: string;
};

export type Post = {
  __metadata: PostMetadata;
  data: PostFrontmatter;
  content: string;
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
    return { __metadata, data, content } as Post;
  });
}

/**
 * Build metadata object for post.
 *
 */
function postMetadata(filePath: string): PostMetadata {
  const filename = path.basename(filePath);
  const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
  const dateStr = filename.match(/^\d{4}-\d{2}-\d{2}/)![0];

  return {
    slug,
    dateStr,
    filename,
    filePath,
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

/**
 * Given a post object and a local file path to a tmp file, return the path to
 * be used as the key when uploading to s3.
 *
 */
export function s3FilePath(tmpFilePath: string, post: Post): string {
  const date = new Date(post.__metadata.dateStr.replace(/\-/g, "/"));
  const dateStr = format(date, "yyMMdd");
  return `posts/${dateStr}/${path.basename(tmpFilePath)}`;
}

// export function updatePost(post: Post) {
//   const frontmatter = yaml.dump(post.data);
//   const fileContent = `---\n${frontmatter}\n---\n\n${post.content}`;

//   console.log(fileContent);
// }
