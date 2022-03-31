"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const blocks_1 = require("./blocks");
const BlockMap = {
    divider: blocks_1.DividerBlock,
    paragraph: blocks_1.ParagraphBlock,
};
function mapBlock(type, params) {
    return new BlockMap[type](params);
}
class Block {
    constructor(params) {
        this.type = params.type;
        if (Object.keys(BlockMap).includes(params.type)) {
            const type = params.type;
            return mapBlock(type, params);
        }
    }
    render() {
        throw new Error(`Block not supported: ${this.type}`);
    }
}
exports.Block = Block;
