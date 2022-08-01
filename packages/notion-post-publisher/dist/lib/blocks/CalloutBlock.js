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
        var _a;
        this.processedChildren = false;
        this.type = this.getType(params.callout.icon);
        this.text = (0, render_utils_1.renderRichText)(params.callout.rich_text) + "\n";
        this.children = (_a = params.children) !== null && _a !== void 0 ? _a : [];
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
            const childText = (0, render_utils_1.renderBlocks)(childBlocks);
            this.text += `\n${childText}`;
            // Children have been processed.
            this.processedChildren = true;
        });
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
