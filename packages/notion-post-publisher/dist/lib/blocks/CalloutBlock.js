"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalloutBlock = void 0;
const render_utils_1 = require("../../utils/render-utils");
class CalloutBlock {
    constructor(params) {
        this.text = (0, render_utils_1.renderRichText)(params.callout.rich_text);
    }
    render() {
        return `{%  callout type="note" %}\n${this.text}\n{% endcallout %}\n`;
    }
}
exports.CalloutBlock = CalloutBlock;
