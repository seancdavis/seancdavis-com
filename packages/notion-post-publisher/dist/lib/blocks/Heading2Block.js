"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heading2Block = void 0;
const render_utils_1 = require("../../utils/render-utils");
class Heading2Block {
    constructor(params) {
        this.text = (0, render_utils_1.renderRichText)(params.heading_2.rich_text);
    }
    render() {
        return `## ${this.text}\n`;
    }
}
exports.Heading2Block = Heading2Block;
