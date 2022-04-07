"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heading1Block = void 0;
const render_utils_1 = require("../../utils/render-utils");
class Heading1Block {
    constructor(params) {
        this.text = (0, render_utils_1.renderRichText)(params.heading_1.rich_text);
    }
    render() {
        return `# ${this.text}`;
    }
}
exports.Heading1Block = Heading1Block;
