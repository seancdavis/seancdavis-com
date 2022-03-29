import fs from "fs";
import glob from "glob";
import path from "path";
import matter from "gray-matter";

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

export class Post {
  __metadata: PostMetadata;
  data: PostFrontmatter;
  content: string;

  constructor(filePath: string) {
    this.__metadata = this.loadMetadata(filePath);
    const post = this.loadPost(filePath);
    this.data = post.data;
    this.content = post.content;
  }

  /* ----- Init Utils ----- */

  /**
   * Use gray-matter to parse the post into a data object (frontmatter) and body
   * content.
   */
  private loadPost(filePath: string): {
    data: PostFrontmatter;
    content: string;
  } {
    const fileContent = fs.readFileSync(filePath).toString();
    const { data, content }: { data: any; content: string } =
      matter(fileContent);
    return { data, content };
  }

  /**
   * Apply meta values to the object from the file path.
   */
  private loadMetadata(filePath: string): PostMetadata {
    const filename = path.basename(filePath);
    const slug = filename
      .replace(/^\d{4}-\d{2}-\d{2}-/, "")
      .replace(/\.md$/, "");
    const dateStr = filename.match(/^\d{4}-\d{2}-\d{2}/)![0];

    return {
      slug,
      dateStr,
      filename,
      filePath,
    };
  }

  /* ----- Class Methods ----- */

  /**
   * Reads and parses frontmatter and body content for every post.
   */
  static findAll(postsDir: string): Post[] {
    return glob
      .sync(path.join(postsDir, "**/*.md"))
      .map((filePath) => new Post(filePath));
  }

  /**
   * Find all posts and return only those without an image.
   */
  static findAllWithoutImage(postsDir: string): Post[] {
    return Post.findAll(postsDir).filter((post) => !post.data.image);
  }
}
