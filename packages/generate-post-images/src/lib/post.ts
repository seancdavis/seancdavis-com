import fs from "fs";
import glob from "glob";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
import yaml from "js-yaml";

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

  /* ----- File Utils ----- */

  /**
   * Set the image references on the object and write them back to file. Does
   * not run if SKIP_UPDATE has been set.
   */
  async updateSrcFile() {
    // Don't run if we want to skip the update process.
    if (process.env.SKIP_UPDATE) return;
    // Can't run if we haven't generated the images yet.
    if (!this.imageRefs) {
      throw new Error("imageRefs not set. Must run `generateImages` first.");
    }
    // Set image attributes on the object.
    this.data.image = `/${this.imageRefs.featured.s3FilePath}`;
    this.data.seo = {
      ...this.data.seo,
      image: `/${this.imageRefs.meta.s3FilePath}`,
    };
    // Convert data to yaml and build a string to write back to the file.
    const fileContent = `---\n${yaml.dump(this.data)}---\n${this.content}`;
    fs.writeFileSync(this.__metadata.filePath, fileContent);
  }

  /**
   * Removes the local generated images unless SKIP_CLEANUP has been set.
   */
  async rmTmpFiles() {
    // If SKIP_CLEANUP is set, don't do the cleanup.
    if (process.env.SKIP_CLEANUP) return;
    // We can't remove anything if we don't know what to remove.
    if (!this.imageRefs) {
      throw new Error("imageRefs not set. Don't know what to remove.");
    }
    // Remove the temp files.
    fs.unlinkSync(this.imageRefs.featured.tmpFilePath);
    fs.unlinkSync(this.imageRefs.meta.tmpFilePath);
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
