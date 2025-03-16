"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalloutBlock = exports.CalloutTypeMap = void 0;
const render_utils_1 = require("../../utils/render-utils");
const Block_1 = require("../Block");
exports.CalloutTypeMap = {
    "⚠️": "warning",
    "⚡": "tip",
    "📋": "tl;dr",
    "💡": "idea",
};
class CalloutBlock {
    constructor(params) {
        this.processedChildren = false;
        this.type = this.getType(params.callout.icon);
        this.text = (0, render_utils_1.renderRichText)(params.callout.rich_text) + "\n";
        this.children = params.children ?? [];
    }
    /**
     * Determines the type for the callout, following the emoji map at the top of
     * this file. Default is `note`.
     *
     * @param icon Icon object from Notion response
     * @returns String to use as the callout type
     */
    getType(icon) {
        if (icon &&
            icon.type === "emoji" &&
            Object.keys(exports.CalloutTypeMap).includes(icon.emoji)) {
            return exports.CalloutTypeMap[icon.emoji];
        }
        return "note";
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
        const childText = (0, render_utils_1.renderBlocks)(childBlocks);
        this.text += `\n${childText}`;
        // Children have been processed.
        this.processedChildren = true;
    }
    render() {
        if (!this.processedChildren) {
            const msg = "Children have not been processed. Call prerender() first.";
            throw new Error(msg);
        }
        return `{% callout type="${this.type}" %}\n${this.text}{% endcallout %}`;
    }
}
exports.CalloutBlock = CalloutBlock;
