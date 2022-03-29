import fs from "fs";
import glob from "glob";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";

import { ResolvedBackgroundConfig } from "../utils/config-utils";
import { uploadFile } from "../utils/s3-utils";
import { Generator } from "./generator";

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

type GeneratedImageRefs = {
  tmpFilePath: string;
  s3FilePath: string;
};

export class Post {
  __metadata: PostMetadata;
  data: PostFrontmatter;
  content: string;
  imageConfig?: ResolvedBackgroundConfig;
  imageRefs?: {
    featured: GeneratedImageRefs;
    meta: GeneratedImageRefs;
  };

  constructor(filePath: string) {
    this.__metadata = this.loadMetadata(filePath);
    const post = this.loadPost(filePath);
    this.data = post.data;
    this.content = post.content;
  }

  /* ----- Image Utils ----- */

  /**
   * Generates images for featured and meta use, and uploads the resulting tmp
   * files.
   */
  async generateImages() {
    if (!this.imageConfig) throw new Error("imageConfig not set on post.");
    const generator = new Generator({ post: this, config: this.imageConfig! });
    // Set image references.
    this.imageRefs = this.getImageRefs();
    // Generate featured image.
    await generator.renderBackground();
    await generator.saveAsImage(this.imageRefs.featured.tmpFilePath);
    // Generate meta image.
    await generator.renderTitle();
    await generator.saveAsImage(this.imageRefs.meta.tmpFilePath);
    // Upload files
    await uploadFile(
      this.imageRefs.featured.tmpFilePath,
      this.imageRefs.featured.s3FilePath
    );
    await uploadFile(
      this.imageRefs.meta.tmpFilePath,
      this.imageRefs.meta.s3FilePath
    );
  }

  /**
   * Resolves local and s3 image paths for featured and meta images.
   *
   * @returns Featured and meta GeneratedImageRefs
   */
  private getImageRefs() {
    const featuredImagePath = this.getTmpImagePath({ meta: false });
    const metaImagePath = this.getTmpImagePath({ meta: true });

    return {
      featured: {
        tmpFilePath: featuredImagePath,
        s3FilePath: this.getS3ImagePath(featuredImagePath),
      },
      meta: {
        tmpFilePath: metaImagePath,
        s3FilePath: this.getS3ImagePath(metaImagePath),
      },
    };
  }

  /**
   * Returns an absolute URL to a temporary path at which to store the generated
   * image. Assumes PNG image.
   *
   * If meta option is true, "--meta" is appended to the filename.
   *
   * @returns {string} Temp image path.
   */
  private getTmpImagePath({ meta = false }: { meta: boolean }): string {
    const tmpDir = path.join(__dirname, "../../tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
    const filename = `${this.__metadata.slug}${meta ? "--meta" : ""}.png`;
    return path.join(tmpDir, filename);
  }

  /**
   * Given a local file, build the s3 equivalent path to be used as the key
   * during upload.
   *
   * @param tmpImagePath Path to the local tmp file.
   * @returns s3 path without a leading slash
   */
  private getS3ImagePath(tmpImagePath: string): string {
    const date = new Date(this.__metadata.dateStr.replace(/\-/g, "/"));
    const dateStr = format(date, "yyMMdd");
    return `posts/${dateStr}/${path.basename(tmpImagePath)}`;
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
