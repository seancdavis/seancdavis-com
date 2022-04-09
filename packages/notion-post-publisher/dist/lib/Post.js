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
exports.Post = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const slugify_1 = __importDefault(require("slugify"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const date_fns_1 = require("date-fns");
const prettier_1 = __importDefault(require("prettier"));
const Block_1 = require("./Block");
const notion_utils_1 = require("../utils/notion-utils");
const render_utils_1 = require("../utils/render-utils");
class Post {
    constructor(params) {
        this.validate(params);
        this.title = params.properties.title;
        this.date = (0, date_fns_1.format)(new Date(), "yyyy-MM-dd");
        this.slug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
        this.filename = `${this.date}-${this.slug}.md`;
        this.url = `https://www.seancdavis.com/posts/${this.slug}`;
        this.content = this.getContent(params.blocks, params.properties);
    }
    /* ----- Writing to File ----- */
    writeToFile(postsDir) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.join(postsDir, this.filename);
            fs_1.default.writeFileSync(filePath, this.content);
            return this.filename;
        });
    }
    /* ----- Attributes ----- */
    /**
     * Builds a prettierized string of markdown content with properties converted
     * to YAML frontmatter.
     *
     * @param blocks Input array of block content
     * @param properties Input properties object
     * @returns Formatted markdown post content.
     */
    getContent(blocks, properties) {
        const frontmatter = js_yaml_1.default.dump(properties);
        const body = blocks
            .map((block, idx) => block.render() + (0, render_utils_1.trailingNewlines)(blocks, idx))
            .join("");
        const postContent = `---\n${frontmatter}---\n\n${body}`;
        return prettier_1.default.format(postContent, { parser: "markdown" });
    }
    /* ----- Validations ----- */
    /**
     * Validates this classes attributes, throwing errors when the conditions are
     * not enough to be able to properly publish a post.
     *
     * @param params Input params from constructor.
     */
    validate(params) {
        var _a;
        if (!params.properties.title) {
            throw new Error(`Notion Page ${params.id} is missing a title.`);
        }
        if (!params.properties.description) {
            throw new Error(`${params.properties.title} is missing a description.`);
        }
        if (((_a = params.blocks) !== null && _a !== void 0 ? _a : []).length === 0) {
            throw new Error(`${params.properties.title} is missing content.`);
        }
    }
    /* ----- Class Methods ----- */
    /**
     * Takes in a Notion page ID value, from which it retrieves and resolves
     * blocks and properties.
     *
     * @param {string} notionPageId Page ID of pending post retrieved from Notion
     * database
     * @returns {Promise<Post>}
     */
    static create(notionPageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notionBlocks = yield (0, notion_utils_1.getAllPageBlocks)(notionPageId);
            const blocks = notionBlocks.map((block) => Block_1.Block.create(block));
            const properties = yield (0, notion_utils_1.getPageProperties)(notionPageId);
            return new Post({ id: notionPageId, blocks, properties });
        });
    }
}
exports.Post = Post;
