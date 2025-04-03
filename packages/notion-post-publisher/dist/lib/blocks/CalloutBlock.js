"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalloutBlock = exports.CalloutTypeMap = void 0;
const logger_utils_1 = require("../../utils/logger-utils");
const render_utils_1 = require("../../utils/render-utils");
const BulletedListItemBlock_1 = require("./BulletedListItemBlock");
const CodeBlock_1 = require("./CodeBlock");
const DividerBlock_1 = require("./DividerBlock");
const EmbedBlock_1 = require("./EmbedBlock");
const Heading1Block_1 = require("./Heading1Block");
const Heading2Block_1 = require("./Heading2Block");
const Heading3Block_1 = require("./Heading3Block");
const ImageBlock_1 = require("./ImageBlock");
const NumberedListItemBlock_1 = require("./NumberedListItemBlock");
const ParagraphBlock_1 = require("./ParagraphBlock");
const QuoteBlock_1 = require("./QuoteBlock");
const ToggleBlock_1 = require("./ToggleBlock");
const VideoBlock_1 = require("./VideoBlock");
const CalloutChildBlockMap = {
    bulleted_list_item: BulletedListItemBlock_1.BulletedListItemBlock,
    code: CodeBlock_1.CodeBlock,
    divider: DividerBlock_1.DividerBlock,
    embed: EmbedBlock_1.EmbedBlock,
    heading_1: Heading1Block_1.Heading1Block,
    heading_2: Heading2Block_1.Heading2Block,
    heading_3: Heading3Block_1.Heading3Block,
    image: ImageBlock_1.ImageBlock,
    numbered_list_item: NumberedListItemBlock_1.NumberedListItemBlock,
    paragraph: ParagraphBlock_1.ParagraphBlock,
    quote: QuoteBlock_1.QuoteBlock,
    toggle: ToggleBlock_1.ToggleBlock,
    video: VideoBlock_1.VideoBlock,
};
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
            const block = await this.createChildBlocks(child);
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
    async createChildBlocks(params) {
        logger_utils_1.logger.debug(`Creating child callout block: ${params.type}`);
        // If the block is not supported, throw an error.
        if (!Object.keys(CalloutChildBlockMap).includes(params.type)) {
            throw new Error(`Block not supported: ${params.type}`);
        }
        // Otherwise, pick a block from the allowed children and return a new
        // instance of it.
        const blockType = params.type;
        const block = new CalloutChildBlockMap[blockType](params);
        // If prerender() exists on the block instance, run it.
        if ("prerender" in block)
            await block.prerender();
        // Return the block instance.
        return block;
    }
}
exports.CalloutBlock = CalloutBlock;
