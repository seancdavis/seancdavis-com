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
const date_fns_1 = require("date-fns");
const js_yaml_1 = __importDefault(require("js-yaml"));
const nanoid_1 = require("nanoid");
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
    async generateImages() {
        if (!this.imageConfig)
            throw new Error("imageConfig not set on post.");
        const generator = new generator_1.Generator({ post: this, config: this.imageConfig });
        // Set image references.
        this.imageRefs = this.getImageRefs();
        // Generate featured image.
        await generator.renderBackground();
        await generator.saveAsImage(this.imageRefs.featured.tmpFilePath);
        // Generate meta image.
        await generator.renderTitle();
        await generator.saveAsImage(this.imageRefs.meta.tmpFilePath);
        // Upload files
        await (0, s3_utils_1.uploadFile)(this.imageRefs.featured.tmpFilePath, this.imageRefs.featured.s3FilePath);
        await (0, s3_utils_1.uploadFile)(this.imageRefs.meta.tmpFilePath, this.imageRefs.meta.s3FilePath);
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
     * image. The filename follows this format:
     *
     *    [slug]-[uid][--appendix].png
     *
     * If meta option is true, "meta" is the appendix. Otherwise, it is omitted.
     *
     * @returns {string} Temp image path.
     */
    getTmpImagePath({ meta = false }) {
        const tmpDir = path_1.default.join(__dirname, "../../tmp");
        if (!fs_1.default.existsSync(tmpDir))
            fs_1.default.mkdirSync(tmpDir);
        const slug = this.__metadata.slug;
        const appendix = meta ? "--meta" : "";
        const uid = `-${(0, nanoid_1.nanoid)(8)}`;
        const ext = ".png";
        const filename = `${slug}${uid}${appendix}${ext}`;
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
    /* ----- File Utils ----- */
    /**
     * Set the image references on the object and write them back to file. Does
     * not run if SKIP_UPDATE has been set.
     */
    async updateSrcFile() {
        // Don't run if we want to skip the update process.
        if (process.env.SKIP_UPDATE)
            return;
        // Can't run if we haven't generated the images yet.
        if (!this.imageRefs) {
            throw new Error("imageRefs not set. Must run `generateImages` first.");
        }
        // Set image attributes on the object.
        this.data.image = `/${this.imageRefs.featured.s3FilePath}`;
        this.data.seo = {
            ...this.data.seo,
            image: `/${this.imageRefs.meta.s3FilePath}`,
        };
        // Convert data to yaml and build a string to write back to the file.
        const fileContent = `---\n${js_yaml_1.default.dump(this.data)}---\n${this.content}`;
        fs_1.default.writeFileSync(this.__metadata.filePath, fileContent);
    }
    /**
     * Removes the local generated images unless SKIP_CLEANUP has been set.
     */
    async rmTmpFiles() {
        // If SKIP_CLEANUP is set, don't do the cleanup.
        if (process.env.SKIP_CLEANUP)
            return;
        // We can't remove anything if we don't know what to remove.
        if (!this.imageRefs) {
            throw new Error("imageRefs not set. Don't know what to remove.");
        }
        // Remove the temp files.
        fs_1.default.unlinkSync(this.imageRefs.featured.tmpFilePath);
        fs_1.default.unlinkSync(this.imageRefs.meta.tmpFilePath);
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
