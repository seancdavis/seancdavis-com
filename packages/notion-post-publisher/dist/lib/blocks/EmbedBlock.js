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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedBlock = void 0;
const twitter_api_sdk_1 = require("twitter-api-sdk");
const date_fns_1 = require("date-fns");
const prettier_1 = __importDefault(require("prettier"));
class EmbedBlock {
    constructor(params) {
        this.domain = new URL(params.embed.url).hostname;
        if (this.domain in embedBlockMap) {
            this.embedBlock = new embedBlockMap[this.domain](params);
        }
    }
    prerender() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.embedBlock && "prerender" in this.embedBlock) {
                yield this.embedBlock.prerender();
            }
        });
    }
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
    prerender() {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const client = new twitter_api_sdk_1.Client(process.env.TWITTER_BEARER_TOKEN);
            const tweet = yield client.tweets.findTweetById(this.id, {
                "tweet.fields": ["created_at", "text", "author_id"],
            });
            if (!((_a = tweet.data) === null || _a === void 0 ? void 0 : _a.author_id) ||
                !((_b = tweet.data) === null || _b === void 0 ? void 0 : _b.created_at) ||
                !((_c = tweet.data) === null || _c === void 0 ? void 0 : _c.text)) {
                throw new Error(`Could not find appropriate attributes for tweet: ${this.id}`);
            }
            const author = yield client.users.findUserById(tweet.data.author_id, {
                "user.fields": ["name", "username"],
            });
            if (!((_d = author.data) === null || _d === void 0 ? void 0 : _d.name) || !((_e = author.data) === null || _e === void 0 ? void 0 : _e.username)) {
                throw new Error(`Could not find appropriate attributes for author: ${tweet.data.author_id}`);
            }
            this.tweet = {
                created_at: new Date(tweet.data.created_at),
                text: tweet.data.text,
                author: {
                    name: author.data.name,
                    username: author.data.username,
                },
            };
        });
    }
    render() {
        if (!this.tweet) {
            throw new Error(`Tweet not properly prerendered: ${this.id}`);
        }
        const output = `
      <blockquote class="twitter-tweet">
        <p lang="en" dir="ltr">
          ${this.tweet.text}
        </p>
        &mdash; ${this.tweet.author.name} (@${this.tweet.author.username}) <a href="${this.url}">${(0, date_fns_1.format)(this.tweet.created_at, "MMMM d, yyyy")}</a>
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
