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
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const date_fns_1 = require("date-fns");
const s3_utils_1 = require("../utils/s3-utils");
const generator_1 = require("./generator");
class Post {
    constructor(filePath) {
        this.__metadata = this.loadMetadata(filePath);
        const post = this.loadPost(filePath);
        this.data = post.data;
        this.content = post.content;
    }
    /* ----- Image Utils ----- */
    /**
     * Generates images for featured and meta use, and uploads the resulting tmp
     * files.
     */
    generateImages() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.imageConfig)
                throw new Error("imageConfig not set on post.");
            const generator = new generator_1.Generator({ post: this, config: this.imageConfig });
            // Set image references.
            this.imageRefs = this.getImageRefs();
            // Generate featured image.
            yield generator.renderBackground();
            yield generator.saveAsImage(this.imageRefs.featured.tmpFilePath);
            // Generate meta image.
            yield generator.renderTitle();
            yield generator.saveAsImage(this.imageRefs.meta.tmpFilePath);
            // Upload files
            yield (0, s3_utils_1.uploadFile)(this.imageRefs.featured.tmpFilePath, this.imageRefs.featured.s3FilePath);
            yield (0, s3_utils_1.uploadFile)(this.imageRefs.meta.tmpFilePath, this.imageRefs.meta.s3FilePath);
        });
    }
    /**
     * Resolves local and s3 image paths for featured and meta images.
     *
     * @returns Featured and meta GeneratedImageRefs
     */
    getImageRefs() {
        const featuredImagePath = this.getTmpImagePath({ meta: false });
        const metaImagePath = this.getTmpImagePath({ meta: true });
        return {
            featured: {
                tmpFilePath: featuredImagePath,
                s3FilePath: this.getS3ImagePath(featuredImagePath),
            },
            meta: {
                tmpFilePath: metaImagePath,
                s3FilePath: this.getS3ImagePath(metaImagePath),
            },
        };
    }
    /**
     * Returns an absolute URL to a temporary path at which to store the generated
     * image. Assumes PNG image.
     *
     * If meta option is true, "--meta" is appended to the filename.
     *
     * @returns {string} Temp image path.
     */
    getTmpImagePath({ meta = false }) {
        const tmpDir = path_1.default.join(__dirname, "../../tmp");
        if (!fs_1.default.existsSync(tmpDir))
            fs_1.default.mkdirSync(tmpDir);
        const filename = `${this.__metadata.slug}${meta ? "--meta" : ""}.png`;
        return path_1.default.join(tmpDir, filename);
    }
    /**
     * Given a local file, build the s3 equivalent path to be used as the key
     * during upload.
     *
     * @param tmpImagePath Path to the local tmp file.
     * @returns s3 path without a leading slash
     */
    getS3ImagePath(tmpImagePath) {
        const date = new Date(this.__metadata.dateStr.replace(/\-/g, "/"));
        const dateStr = (0, date_fns_1.format)(date, "yyMMdd");
        return `posts/${dateStr}/${path_1.default.basename(tmpImagePath)}`;
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
