"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberedListItemBlock = void 0;
const render_utils_1 = require("../../utils/render-utils");
class NumberedListItemBlock {
    constructor(params) {
        this.text = (0, render_utils_1.renderRichText)(params.numbered_list_item.rich_text);
    }
    render() {
        return `1. ${this.text}`;
    }
}
exports.NumberedListItemBlock = NumberedListItemBlock;
