"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const blocks_1 = require("./blocks");
const BlockMap = {
    divider: blocks_1.DividerBlock,
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
