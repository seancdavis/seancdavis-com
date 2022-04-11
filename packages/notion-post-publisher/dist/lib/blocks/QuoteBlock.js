"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteBlock = void 0;
const render_utils_1 = require("../../utils/render-utils");
const Block_1 = require("../Block");
class QuoteBlock {
    constructor(params) {
        var _a;
        this.color = params.quote.color;
        this.text = (0, render_utils_1.renderRichText)(params.quote.rich_text);
        if (params.has_children && params.children && params.children.length > 0) {
            const childBlocks = ((_a = params.children) !== null && _a !== void 0 ? _a : []).map((child) => {
                return Block_1.Block.create(child);
            });
            const childText = childBlocks
                .map((block, idx) => {
                let text = `> ${block.render()}`;
                const newlines = (0, render_utils_1.trailingNewlines)(childBlocks, idx);
                // Add the necessary syntax to double newlines.
                text += newlines === "\n\n" ? "\n>\n" : "\n";
                return text;
            })
                .join("");
            this.text += `\n>\n${childText}`;
        }
    }
    render() {
        return `> ${this.text}`;
    }
}
exports.QuoteBlock = QuoteBlock;
