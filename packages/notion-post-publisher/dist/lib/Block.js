"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const blocks_1 = require("./blocks");
const BlockMap = {
    bulleted_list_item: blocks_1.BulletedListItemBlock,
    code: blocks_1.CodeBlock,
    divider: blocks_1.DividerBlock,
    heading_1: blocks_1.Heading1Block,
    heading_2: blocks_1.Heading2Block,
    heading_3: blocks_1.Heading3Block,
    numbered_list_item: blocks_1.NumberedListItemBlock,
    paragraph: blocks_1.ParagraphBlock,
    video: blocks_1.VideoBlock,
};
class Block {
    constructor(type) {
        this.type = type;
    }
    render() {
        throw new Error(`Block not supported: ${this.type}`);
    }
    static create(params) {
        // If the block is not supported, return an instance of this class, a
        // generic block which throws an error on render.
        if (!Object.keys(BlockMap).includes(params.type)) {
            return new Block(params.type);
        }
        // Otherwise, pick a block from the map and return a new instance of it.
        const blockParams = params;
        return new BlockMap[blockParams.type](blockParams);
    }
}
exports.Block = Block;
