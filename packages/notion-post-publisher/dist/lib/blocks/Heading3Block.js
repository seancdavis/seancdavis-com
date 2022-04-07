"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heading3Block = void 0;
const render_utils_1 = require("../../utils/render-utils");
class Heading3Block {
    constructor(params) {
        this.text = (0, render_utils_1.renderRichText)(params.heading_3.rich_text);
    }
    render() {
        return `### ${this.text}`;
    }
}
exports.Heading3Block = Heading3Block;
