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
class Post {
    constructor(params) {
        this.id = params.id;
        this.blocks = params.blocks;
        this.properties = params.properties;
        this.validate();
    }
    /* ----- Writing to File ----- */
    writeToFile(postsDir) {
        return __awaiter(this, void 0, void 0, function* () {
            // const
            // console.log(postsDir);
            // const filename = getFilename(this.properties.title)
            // const frontmatter = get
            // const body
            // const content = `---\n${frontmatter}\n---\n${body}`
            // await writePostToFile(filename, content)
            // Get File path
            const dateStr = (0, date_fns_1.format)(new Date(), "yyyy-MM-dd");
            const slug = (0, slugify_1.default)(this.properties.title, { lower: true, strict: true });
            const filename = `${dateStr}-${slug}.md`;
            const filePath = path_1.default.join(postsDir, filename);
            const frontmatter = js_yaml_1.default.dump(this.properties);
            const body = this.blocks.map((block) => block.render()).join("\n");
            const postContent = `---\n${frontmatter}---\n\n${body}`;
            const formattedPostContent = prettier_1.default.format(postContent, {
                parser: "markdown",
            });
            fs_1.default.writeFileSync(filePath, formattedPostContent);
            return filename;
        });
    }
    /* ----- Validations ----- */
    /**
     * Validates this classes attributes, throwing errors when the conditions are
     * not enough to be able to properly publish a post.
     */
    validate() {
        var _a;
        if (!this.properties.title) {
            throw new Error(`Notion Page ${this.id} is missing a title.`);
        }
        if (!this.properties.description) {
            throw new Error(`${this.properties.title} is missing a description.`);
        }
        if (((_a = this.blocks) !== null && _a !== void 0 ? _a : []).length === 0) {
            throw new Error(`${this.properties.title} is missing content.`);
        }
    }
    /* ----- Class Methods ----- */
    /**
     * Takes in a Notion page ID value, from which it retrieves and resolves
     * blocks and properties.
     *
     * @param {string} notionPageId Page ID of pending post retrieved from Notion
     * database
     * @returns {Promise<Post}
     */
    static create(notionPageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notionBlocks = yield (0, notion_utils_1.getAllPageBlocks)(notionPageId);
            const blocks = notionBlocks.map((block) => new Block_1.Block(block));
            const properties = yield (0, notion_utils_1.getPageProperties)(notionPageId);
            return new Post({ id: notionPageId, blocks, properties });
        });
    }
}
exports.Post = Post;
