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
exports.markPageAsPublished = exports.createNewTags = exports.getPageProperties = exports.getAllPageBlocks = exports.getPendingPageIds = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prettier_1 = __importDefault(require("prettier"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const client_1 = require("@notionhq/client");
const string_utils_1 = require("./string-utils");
const notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
/* ----- Controls ----- */
const statusPropertyName = "Status";
const publishedDatePropertyName = "Publish Date";
const postLinkPropertyName = "Link";
const pendingStatus = "Draft: Ready";
const publishedStatus = "Published";
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
                property: statusPropertyName,
                select: {
                    equals: pendingStatus,
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
 * @returns {Promise<NotionBlock[]>}
 */
function getAllPageBlocks(pageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield notion.blocks.children.list({
            block_id: pageId,
        });
        const blocks = response.results;
        // Add child blocks if necessary.
        const blockPromises = blocks.map((block) => __awaiter(this, void 0, void 0, function* () {
            if (!block.has_children)
                return block;
            block.children = yield getAllPageBlocks(block.id);
        }));
        // This is the magic that allows for using async with map.
        yield Promise.all(blockPromises);
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
/**
 *
 * @param tags
 * @returns
 */
function createNewTags(tags) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tags || tags.length === 0)
            return [];
        const tagsDir = path_1.default.join(__dirname, "../../../..", "www/src/topics");
        const allTagSlugs = fast_glob_1.default
            .sync(path_1.default.join(tagsDir, "*.md"))
            .map((filePath) => path_1.default.basename(filePath, path_1.default.extname(filePath)));
        const newTags = tags.filter((tag) => !allTagSlugs.includes(tag));
        newTags.map((slug) => {
            const title = (0, string_utils_1.toTitleCase)(slug.replace(/-/g, " "));
            const tag = { title, pagination: { data: `collections.${slug}` } };
            const content = `---\n${js_yaml_1.default.dump(tag)}\n---`;
            fs_1.default.writeFileSync(path_1.default.join(tagsDir, `${slug}.md`), prettier_1.default.format(content, { parser: "markdown" }));
            console.log(`Created new topic: ${slug}`);
        });
        return newTags;
    });
}
exports.createNewTags = createNewTags;
/**
 * Marks a notion page as published by setting its status, publish date, and
 * link properties.
 *
 * @param page_id ID of the Notion page.
 * @param date Date (string) that the post was published.
 * @param link Link to the published post.
 */
function markPageAsPublished(page_id, date, link) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield notion.pages.update({
            page_id,
            properties: {
                [statusPropertyName]: {
                    select: {
                        name: publishedStatus,
                    },
                },
                [publishedDatePropertyName]: {
                    date: {
                        start: date,
                    },
                },
                [postLinkPropertyName]: {
                    url: link,
                },
            },
        });
        return page;
    });
}
exports.markPageAsPublished = markPageAsPublished;
