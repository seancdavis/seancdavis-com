"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteBlock = void 0;
const render_utils_1 = require("../../utils/render-utils");
class QuoteBlock {
    constructor(params) {
        this.color = params.quote.color;
        this.text = (0, render_utils_1.renderRichText)(params.quote.rich_text);
        // if (params.has_children && params.children && params.children.length > 0) {
        //   const childBlocks = (params.children ?? []).map((child) => {
        //     return Block.create(child);
        //   });
        //   const childText = childBlocks
        //     .map((block, idx) => {
        //       let text = `> ${block.render()}`;
        //       const newlines = trailingNewlines(childBlocks, idx);
        //       // Add the necessary syntax to double newlines.
        //       text += newlines === "\n\n" ? "\n>\n" : "\n";
        //       return text;
        //     })
        //     .join("");
        //   this.text += `\n>\n${childText}`;
        // }
    }
    render() {
        return `> ${this.text}`;
    }
}
exports.QuoteBlock = QuoteBlock;
