"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sync_1 = __importDefault(require("@prettier/sync"));
const date_fns_1 = require("date-fns");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const slugify_1 = __importDefault(require("slugify"));
const notion_utils_1 = require("../utils/notion-utils");
const render_utils_1 = require("../utils/render-utils");
const www_utils_1 = require("../utils/www-utils");
const Block_1 = require("./Block");
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
    async writeToFile(postsDir) {
        const filePath = path_1.default.join(postsDir, this.filename);
        fs_1.default.writeFileSync(filePath, this.content);
        return this.filename;
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
        const body = (0, render_utils_1.renderBlocks)(blocks);
        const postContent = `---\n${frontmatter}---\n\n${body}`;
        return sync_1.default.format(postContent, { parser: "markdown" });
    }
    /* ----- Validations ----- */
    /**
     * Validates this classes attributes, throwing errors when the conditions are
     * not enough to be able to properly publish a post.
     *
     * @param params Input params from constructor.
     */
    validate(params) {
        if (!params.properties.title) {
            throw new Error(`Notion Page ${params.id} is missing a title.`);
        }
        if (!params.properties.description) {
            throw new Error(`${params.properties.title} is missing a description.`);
        }
        if ((params.blocks ?? []).length === 0) {
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
    static async create(notionPageId) {
        const notionBlocks = await (0, notion_utils_1.getAllPageBlocks)(notionPageId);
        let blocks = [];
        for (const params of notionBlocks) {
            const block = await Block_1.Block.create(params);
            blocks.push(block);
        }
        const properties = await (0, notion_utils_1.getPageProperties)(notionPageId);
        await (0, www_utils_1.createNewTags)(properties.tags);
        return new Post({ id: notionPageId, blocks, properties });
    }
}
exports.Post = Post;
