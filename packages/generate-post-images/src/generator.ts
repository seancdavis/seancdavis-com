import fs from "fs";
import path from "path";
import { createCanvas, registerFont, loadImage, Canvas } from "canvas";

import type { Post } from "./utils/post-utils";
import type { ResolvedBackgroundConfig } from "./utils/background-utils";

export class Generator {
  config: {
    w: number;
    h: number;
  };
  post: Post;
  background: ResolvedBackgroundConfig;
  canvas: Canvas;
  context: ReturnType<Canvas["getContext"]>;
  tmpFilePaths: {
    featured: string;
    meta: string;
  };

  constructor({
    post,
    bgConfig,
  }: {
    post: Post;
    bgConfig: ResolvedBackgroundConfig;
  }) {
    this.config = { w: 2400, h: 1260 };
    this.post = post;
    this.background = bgConfig;
    this.loadFont("DMSerifDisplay-Regular.ttf", "DM Serif Display");
    this.loadFont("DMSerifDisplay-Italic.ttf", "DM Serif Display Italic");
    this.canvas = createCanvas(this.config.w, this.config.h);
    this.context = this.canvas.getContext("2d");
    this.tmpFilePaths = this.setTmpFilePaths();
  }

  async run() {
    const featuredImagePath = await this.generateFeaturedImage();
    return { featuredImagePath };
  }

  /* ---------- Private Methods ---------- */

  /**
   * Render the background image and store current state as a temp file.
   */
  private async generateFeaturedImage() {
    const { w, h } = this.config;
    const image = await loadImage(this.background.filePath);
    this.context.drawImage(image, 0, 0, w, h);
    this.saveAsImage(this.tmpFilePaths.featured);
    return this.tmpFilePaths.featured;
  }

  /**
   * Load a font for canvas to use. This must be done before the canvas is
   * initialized.
   */
  private loadFont(filename: string, family: string) {
    const fontPath = path.join(__dirname, "../src/assets/fonts", filename);
    registerFont(fontPath, { family });
  }

  /**
   * Builds a ref object for the two images to generate. Puts these in a `tmp`
   * directory where the command is run.
   */
  private setTmpFilePaths(): { featured: string; meta: string } {
    const tmpDir = path.join(__dirname, "../tmp");
    const tmpBasename = path
      .basename(this.post.filePath, path.extname(this.post.filePath))
      .replace(/^\d{4}-\d{2}-\d{2}-/, "");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
    return {
      featured: path.join(tmpDir, `${tmpBasename}.png`),
      meta: path.join(tmpDir, `${tmpBasename}--meta.png`),
    };
  }

  /**
   * Store the current canvas as a file at the given file path.
   */
  private saveAsImage(filePath: string) {
    const buffer = this.canvas.toBuffer("image/png");
    return fs.writeFileSync(filePath, buffer);
  }
}
