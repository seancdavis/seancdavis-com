"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteBlock = void 0;
const render_utils_1 = require("../../utils/render-utils");
class QuoteBlock {
    constructor(params) {
        this.text = (0, render_utils_1.renderRichText)(params.quote.rich_text);
        this.color = params.quote.color;
    }
    render() {
        return `> ${this.text}\n`;
    }
}
exports.QuoteBlock = QuoteBlock;
