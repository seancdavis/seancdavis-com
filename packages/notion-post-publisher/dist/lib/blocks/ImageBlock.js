"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageBlock = void 0;
class ImageBlock {
    constructor(params) {
        this.alt = params.image.caption
            .map((caption) => caption)
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
exports.ImageBlock = ImageBlock;
