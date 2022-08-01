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
exports.QuoteBlock = void 0;
const render_utils_1 = require("../../utils/render-utils");
const Block_1 = require("../Block");
class QuoteBlock {
    constructor(params) {
        var _a;
        this.processedChildren = false;
        this.color = params.quote.color;
        this.text = (0, render_utils_1.renderRichText)(params.quote.rich_text);
        this.children = (_a = params.children) !== null && _a !== void 0 ? _a : [];
    }
    prerender() {
        return __awaiter(this, void 0, void 0, function* () {
            // Escape if there are no children.
            if (this.children.length === 0) {
                this.processedChildren = true;
                return;
            }
            // Create blocks from children data.
            let childBlocks = [];
            for (const child of this.children) {
                const block = yield Block_1.Block.create(child);
                childBlocks.push(block);
                // Run prerender if necessary()
                if ("prerender" in block)
                    yield block.prerender();
            }
            // Add children rendered text to callout's text.
            const childText = (0, render_utils_1.renderBlocks)(childBlocks, "> ");
            this.text += `\n>\n${childText}`;
            // Children have been processed.
            this.processedChildren = true;
        });
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
