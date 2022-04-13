import type { NotionImageBlock, NotionRichText } from "../../types/notion";
import path from "path";
import fs from "fs";
import { downloadFile, uploadFile } from "../../utils/s3-utils";
import { format } from "date-fns";

export class ImageBlock {
  alt: string;
  imageUrl: string;
  tmpFilePath: string;
  imageUploaded: boolean = false;
  s3FilePath: string;

  constructor(params: NotionImageBlock) {
    this.alt = params.image.caption
      .map((caption: NotionRichText) => caption.plain_text)
      .join("");
    this.imageUrl =
      params.image.type === "file"
        ? params.image.file.url
        : params.image.external.url;
    this.tmpFilePath = this.getTmpFilePath();
    this.s3FilePath = this.getS3FilePath();
  }

  /* ----- Attributes ----- */

  /**
   * Builds and returns a temporary file path to use when processing the image.
   */
  private getTmpFilePath(): string {
    const tmpDir = path.join(__dirname, "../../../tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    const filename = path.basename(this.imageUrl).split("?")[0];
    return path.join(tmpDir, filename);
  }

  /**
   * Determines the path (key) at which to store the image when uploaded to s3.
   */
  private getS3FilePath(): string {
    const date = format(new Date(), "yyMMdd");
    const filename = path.basename(this.tmpFilePath);
    return `uploads/${date}/${filename}`;
  }

  /* ----- Uploader ----- */

  /**
   * Uploads an image to s3 and stores the result as the `url` property. Deletes
   * the temp image after uploading.
   */
  private async processImage() {
    await downloadFile(this.imageUrl, this.tmpFilePath);
    await uploadFile(this.tmpFilePath, this.s3FilePath);
    this.imageUploaded = true;
    if (fs.existsSync(this.tmpFilePath)) fs.rmSync(this.tmpFilePath);
  }

  /* ----- Render ----- */

  async prerender() {
    await this.processImage();
  }

  render() {
    if (!this.imageUploaded) {
      throw new Error("Image not uploaded. Must call prerender() first.");
    }
    return `{% post_image alt="${this.alt}", src="/${this.s3FilePath}" %}`;
  }
}
