"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const blocks_1 = require("./blocks");
const BlockMap = {
    bulleted_list_item: blocks_1.BulletedListItemBlock,
    callout: blocks_1.CalloutBlock,
    code: blocks_1.CodeBlock,
    divider: blocks_1.DividerBlock,
    heading_1: blocks_1.Heading1Block,
    heading_2: blocks_1.Heading2Block,
    heading_3: blocks_1.Heading3Block,
    image: blocks_1.ImageBlock,
    numbered_list_item: blocks_1.NumberedListItemBlock,
    paragraph: blocks_1.ParagraphBlock,
    quote: blocks_1.QuoteBlock,
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
        return __awaiter(this, void 0, void 0, function* () {
            // If the block is not supported, return an instance of this class, a
            // generic block which throws an error on render.
            if (!Object.keys(BlockMap).includes(params.type)) {
                return new Block(params.type);
            }
            // Otherwise, pick a block from the map and return a new instance of it.
            const blockParams = params;
            const block = new BlockMap[blockParams.type](blockParams);
            // If prerender() exists on the block instance, run it.
            if ("prerender" in block)
                yield block.prerender();
            // Return the block instance.
            return block;
        });
    }
}
exports.Block = Block;
