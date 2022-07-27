"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedBlock = void 0;
const embedRenderers = {
    "twitter.com": (url) => {
        var _a;
        const matches = url.match(/\/status\/(?<id>\d+)/);
        const id = (_a = matches === null || matches === void 0 ? void 0 : matches.groups) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            throw new Error(`Could not identify tweet ID from URL: ${url}`);
        return `{% twitter_embed id="${id}" %}`;
    },
};
class EmbedBlock {
    constructor(params) {
        this.domain = new URL(params.embed.url).hostname;
        this.url = params.embed.url;
    }
    render() {
        if (!(this.domain in embedRenderers)) {
            throw new Error(`Embed block domain ${this.domain} not supported.`);
        }
        return embedRenderers[this.domain](this.url);
    }
}
exports.EmbedBlock = EmbedBlock;
