"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsWithoutImage = void 0;
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const path_1 = __importDefault(require("path"));
/**
 * Reads and parses frontmatter and body content for every post.
 *
 * @returns {array} Post objects parsed by gray-matter,
 * as: { data, content, filePath }
 */
function allPosts(postsDir) {
    const allPostFilePaths = glob_1.default.sync(path_1.default.join(postsDir, "**/*.md"));
    return allPostFilePaths.map((filePath) => {
        const fileContent = fs_1.default.readFileSync(filePath).toString();
        const { data, content } = (0, gray_matter_1.default)(fileContent);
        const __metadata = postMetadata(filePath);
        return { __metadata, data, content, filePath };
    });
}
/**
 * Build metadata object for post.
 *
 */
function postMetadata(filePath) {
    return {
        slug: path_1.default
            .basename(filePath, path_1.default.extname(filePath))
            .replace(/^\d{4}-\d{2}-\d{2}-/, ""),
    };
}
/**
 * Finds all posts without an image.
 *
 * @returns {array} Post objects without an `image` key in frontmatter
 */
function postsWithoutImage(postsDir) {
    return allPosts(postsDir).filter((post) => !post.data.image);
}
exports.postsWithoutImage = postsWithoutImage;
