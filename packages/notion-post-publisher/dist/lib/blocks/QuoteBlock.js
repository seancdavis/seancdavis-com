"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteBlock = void 0;
const render_utils_1 = require("../../utils/render-utils");
const Block_1 = require("../Block");
class QuoteBlock {
    constructor(params) {
        this.processedChildren = false;
        this.color = params.quote.color;
        this.text = (0, render_utils_1.renderRichText)(params.quote.rich_text);
        this.children = params.children ?? [];
    }
    async prerender() {
        // Escape if there are no children.
        if (this.children.length === 0) {
            this.processedChildren = true;
            return;
        }
        // Create blocks from children data.
        let childBlocks = [];
        for (const child of this.children) {
            const block = await Block_1.Block.create(child);
            childBlocks.push(block);
            // Run prerender if necessary()
            if ("prerender" in block)
                await block.prerender();
        }
        // Add children rendered text to callout's text.
        const childText = (0, render_utils_1.renderBlocks)(childBlocks, "> ");
        this.text += `\n>\n${childText}`;
        // Children have been processed.
        this.processedChildren = true;
    }
    render() {
        if (!this.processedChildren) {
            const msg = "Children have not been processed. Call prerender() first.";
            throw new Error(msg);
        }
        return `> ${this.text}`;
    }
}
exports.QuoteBlock = QuoteBlock;
