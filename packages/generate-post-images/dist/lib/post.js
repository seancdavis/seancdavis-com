"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
class Post {
    constructor(filePath) {
        this.__metadata = this.loadMetadata(filePath);
        const post = this.loadPost(filePath);
        this.data = post.data;
        this.content = post.content;
    }
    /* ----- Init Utils ----- */
    /**
     * Use gray-matter to parse the post into a data object (frontmatter) and body
     * content.
     */
    loadPost(filePath) {
        const fileContent = fs_1.default.readFileSync(filePath).toString();
        const { data, content } = (0, gray_matter_1.default)(fileContent);
        return { data, content };
    }
    /**
     * Apply meta values to the object from the file path.
     */
    loadMetadata(filePath) {
        const filename = path_1.default.basename(filePath);
        const slug = filename
            .replace(/^\d{4}-\d{2}-\d{2}-/, "")
            .replace(/\.md$/, "");
        const dateStr = filename.match(/^\d{4}-\d{2}-\d{2}/)[0];
        return {
            slug,
            dateStr,
            filename,
            filePath,
        };
    }
    /* ----- Class Methods ----- */
    /**
     * Reads and parses frontmatter and body content for every post.
     */
    static findAll(postsDir) {
        return glob_1.default
            .sync(path_1.default.join(postsDir, "**/*.md"))
            .map((filePath) => new Post(filePath));
    }
    /**
     * Find all posts and return only those without an image.
     */
    static findAllWithoutImage(postsDir) {
        return Post.findAll(postsDir).filter((post) => !post.data.image);
    }
}
exports.Post = Post;
