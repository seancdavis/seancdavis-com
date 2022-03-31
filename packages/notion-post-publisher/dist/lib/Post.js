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
exports.Post = void 0;
const notion_utils_1 = require("../utils/notion-utils");
class Post {
    constructor({ id, blocks, properties }) {
        this.id = id;
        this.blocks = blocks;
        this.properties = properties;
        this.validate();
    }
    /* ----- Validations ----- */
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
            const blocks = yield (0, notion_utils_1.getAllPageBlocks)(notionPageId);
            const properties = yield (0, notion_utils_1.getPageProperties)(notionPageId);
            return new Post({ id: notionPageId, blocks, properties });
        });
    }
}
exports.Post = Post;
