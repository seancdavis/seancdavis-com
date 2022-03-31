"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParagraphBlock = void 0;
const render_utils_1 = require("../../utils/render-utils");
class ParagraphBlock {
    constructor(params) {
        this.type = "paragraph";
        this.rich_text = params.paragraph.rich_text;
        this.color = params.paragraph.color;
        // console.log(this.rich_text);
        // console.log(params);
    }
    render() {
        const text = this.rich_text.map((text) => (0, render_utils_1.renderRichText)(text)).join("");
        return `${text}\n`;
    }
}
exports.ParagraphBlock = ParagraphBlock;
