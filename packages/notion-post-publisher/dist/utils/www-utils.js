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
exports.createNewTags = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prettier_1 = __importDefault(require("prettier"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const string_utils_1 = require("./string-utils");
const constants_1 = require("../constants");
/**
 * Create topic files with basic content for missing tags. This makes an
 * assumption that all topic filenames are exclusively lower case and can be
 * programmatically capitalized (to be overridden manually as needed).
 *
 * @param tags A list of tags for a given page
 * @returns A list of tag slugs created
 */
function createNewTags(tags) {
    return __awaiter(this, void 0, void 0, function* () {
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
            fs_1.default.writeFileSync(path_1.default.join(constants_1.TOPICS_DIR, `${slug}.md`), prettier_1.default.format(content, { parser: "markdown" }));
            console.log(`Created new topic: ${slug}`);
        });
        return newTags;
    });
}
exports.createNewTags = createNewTags;
