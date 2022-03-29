"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3FilePath = exports.postsWithoutImage = void 0;
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const path_1 = __importDefault(require("path"));
const date_fns_1 = require("date-fns");
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
        return { __metadata, data, content };
    });
}
/**
 * Build metadata object for post.
 *
 */
function postMetadata(filePath) {
    const filename = path_1.default.basename(filePath);
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
    const dateStr = filename.match(/^\d{4}-\d{2}-\d{2}/)[0];
    return {
        slug,
        dateStr,
        filename,
        filePath,
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
/**
 * Given a post object and a local file path to a tmp file, return the path to
 * be used as the key when uploading to s3.
 *
 */
function s3FilePath(tmpFilePath, post) {
    const date = new Date(post.__metadata.dateStr.replace(/\-/g, "/"));
    const dateStr = (0, date_fns_1.format)(date, "yyMMdd");
    return `posts/${dateStr}/${path_1.default.basename(tmpFilePath)}`;
}
exports.s3FilePath = s3FilePath;
// export function updatePost(post: Post) {
//   const frontmatter = yaml.dump(post.data);
//   const fileContent = `---\n${frontmatter}\n---\n\n${post.content}`;
//   console.log(fileContent);
// }
