"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulletedListItemBlock = void 0;
const render_utils_1 = require("../../utils/render-utils");
class BulletedListItemBlock {
    constructor(params) {
        this.text = (0, render_utils_1.renderRichText)(params.bulleted_list_item.rich_text);
    }
    render() {
        return `- ${this.text}\n`;
    }
}
exports.BulletedListItemBlock = BulletedListItemBlock;
