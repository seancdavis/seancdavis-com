"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteBlock = void 0;
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
const ToggleBlock_1 = require("./ToggleBlock");
const VideoBlock_1 = require("./VideoBlock");
const QuoteChildBlockMap = {
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
    toggle: ToggleBlock_1.ToggleBlock,
    video: VideoBlock_1.VideoBlock,
};
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
            const block = await this.createChildBlocks(child);
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
    async createChildBlocks(params) {
        logger_utils_1.logger.debug(`Creating child quote block: ${params.type}`);
        // If the block is not supported, throw an error.
        if (!Object.keys(QuoteChildBlockMap).includes(params.type)) {
            throw new Error(`Block not supported: ${params.type}`);
        }
        // Otherwise, pick a block from the allowed children and return a new
        // instance of it.
        const blockType = params.type;
        const block = new QuoteChildBlockMap[blockType](params);
        // If prerender() exists on the block instance, run it.
        if ("prerender" in block)
            await block.prerender();
        // Return the block instance.
        return block;
    }
}
exports.QuoteBlock = QuoteBlock;
