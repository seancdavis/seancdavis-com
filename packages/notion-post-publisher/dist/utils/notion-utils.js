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
exports.getPageProperties = exports.getAllPageBlocks = exports.getPendingPageIds = void 0;
const client_1 = require("@notionhq/client");
const notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
/* ----- Utils ----- */
/**
 * Retrieve a list of id values for all Notion pages with a status of "Draft:
 * Ready"
 *
 * @returns {Promise<string[]>}
 */
function getPendingPageIds() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.NOTION_DATABASE_ID) {
            throw new Error("NOTION_DATABASE_ID not set.");
        }
        const response = yield notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,
            filter: {
                property: "Status",
                select: {
                    equals: "Draft: Ready",
                },
            },
        });
        return (response.results || []).map((res) => res.id);
    });
}
exports.getPendingPageIds = getPendingPageIds;
/**
 * Resolve all blocks for a page, accounting for block children and pagination
 * only where necessary to serve basic post features.
 *
 * @param {string} pageId ID string from Notion representing the Notion page.
 * @returns {Promise<BlockObjectResponse[]>}
 */
function getAllPageBlocks(pageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield notion.blocks.children.list({
            block_id: pageId,
        });
        const blocks = response.results;
        return blocks;
    });
}
exports.getAllPageBlocks = getAllPageBlocks;
/**
 * Retrieve the page from Notion API and extract only the properties.
 *
 * @param {string} pageId ID string from Notion representing the Notion page.
 * @returns {Promise<PostProperties>}
 */
function getPageProperties(page_id) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function* () {
        const page = (yield notion.pages.retrieve({ page_id }));
        const properties = page === null || page === void 0 ? void 0 : page.properties;
        // Note that this is not strongly typed because of the way Notion defines
        // types. I've made all PageProperty properties optional, but there is
        // validation built into the Page object.
        //
        // Therefore, the goal in this method is to get out of here without an error
        // based on the SDK's data structure. If there is an error, we want it to come
        // from instantiating the Page and make it easier to debug here.
        return {
            title: (_b = (_a = properties["Name"].title) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.plain_text,
            description: (_d = (_c = properties["Description"].rich_text) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.plain_text,
            tags: (_e = properties["Tags"].multi_select) === null || _e === void 0 ? void 0 : _e.map((tag) => tag.name),
            tweet: (_h = (_g = (_f = properties["Tweet"]) === null || _f === void 0 ? void 0 : _f.rich_text) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.plain_text,
        };
    });
}
exports.getPageProperties = getPageProperties;
