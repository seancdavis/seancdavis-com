"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewTags = void 0;
const sync_1 = __importDefault(require("@prettier/sync"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
const string_utils_1 = require("./string-utils");
/**
 * Create topic files with basic content for missing tags. This makes an
 * assumption that all topic filenames are exclusively lower case and can be
 * programmatically capitalized (to be overridden manually as needed).
 *
 * @param tags A list of tags for a given page
 * @returns A list of tag slugs created
 */
async function createNewTags(tags) {
    if (!tags || tags.length === 0)
        return [];
    const allTagSlugs = fast_glob_1.default
        .sync(path_1.default.join(constants_1.TOPICS_DIR, "*.md"))
        .map((filePath) => path_1.default.basename(filePath, path_1.default.extname(filePath)));
    const newTags = tags
        .map((tag) => tag.toLowerCase())
        .filter((tag) => !allTagSlugs.includes(tag));
    newTags.map((slug) => {
        const title = (0, string_utils_1.toTitleCase)(slug.replace(/-/g, " "));
        const tag = { title, pagination: { data: `collections.${slug}` } };
        const content = `---\n${js_yaml_1.default.dump(tag)}\n---`;
        fs_1.default.writeFileSync(path_1.default.join(constants_1.TOPICS_DIR, `${slug}.md`), sync_1.default.format(content, { parser: "markdown" }));
        console.log(`Created new topic: ${slug}`);
    });
    return newTags;
}
exports.createNewTags = createNewTags;
