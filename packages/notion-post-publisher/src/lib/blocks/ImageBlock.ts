import type { NotionImageBlock, NotionRichText } from "../../types/notion";

export class ImageBlock {
  alt: string;
  href: string;

  constructor(params: NotionImageBlock) {
    this.alt = params.image.caption
      .map((caption: NotionRichText) => caption.plain_text)
      .join("");
    this.href =
      params.image.type === "file"
        ? params.image.file.url
        : params.image.external.url;
  }

  render() {
    return `{% post_image alt="${this.alt}", src="${this.href}" %}\n`;
  }
}
