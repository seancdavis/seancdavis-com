"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedBlock = void 0;
const prettier_1 = __importDefault(require("prettier"));
class EmbedBlock {
    constructor(params) {
        this.domain = new URL(params.embed.url).hostname;
        if (this.domain in embedBlockMap) {
            this.embedBlock = new embedBlockMap[this.domain](params);
        }
    }
    // async prerender() {
    //   if (this.embedBlock && "prerender" in this.embedBlock) {
    //     await this.embedBlock.prerender();
    //   }
    // }
    render() {
        if (!this.embedBlock) {
            throw new Error(`Embed block not supported: ${this.domain}`);
        }
        return this.embedBlock.render();
    }
}
exports.EmbedBlock = EmbedBlock;
/* ----- Twitter ----- */
class TwitterEmbedBlock {
    constructor(params) {
        var _a;
        this.url = params.embed.url;
        const matches = this.url.match(/\/status\/(?<id>\d+)/);
        const id = (_a = matches === null || matches === void 0 ? void 0 : matches.groups) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            throw new Error(`Could not identify tweet ID from URL: ${this.url}`);
        }
        this.id = id;
    }
    render() {
        const output = `
      <blockquote class="twitter-tweet">
        <a href="https://twitter.com/username/status/${this.id}"></a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    `;
        return prettier_1.default.format(output, { parser: "html" });
    }
}
/* ----- Stackblitz ----- */
class StackblitzEmbedBlock {
    constructor(params) {
        this.url = params.embed.url;
    }
    render() {
        return `{% code_playground url="${this.url}" %}`;
    }
}
/* ----- Mapper ----- */
const embedBlockMap = {
    "twitter.com": TwitterEmbedBlock,
    "stackblitz.com": StackblitzEmbedBlock,
};
