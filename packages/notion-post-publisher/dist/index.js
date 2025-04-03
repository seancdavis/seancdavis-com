"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishPosts = publishPosts;
const chalk_1 = __importDefault(require("chalk"));
const Post_1 = require("./lib/Post");
const logger_utils_1 = require("./utils/logger-utils");
const notion_utils_1 = require("./utils/notion-utils");
/* ----- Main Function ----- */
/**
 * Finds Notion pages in with the state "Draft: Ready", converts them to
 * markdown posts with frontmatter properties, and writes them to file in the
 * postsDir.
 *
 * @param config Configuration object
 * @param config.postsDir Absolute path to directory in which to write posts
 */
async function publishPosts(config) {
    const pageIds = await (0, notion_utils_1.getPendingPageIds)();
    logger_utils_1.logger.debug(`Processing ${pageIds.length} pages${pageIds.length > 0 ? ":\n  ⋅ " + pageIds.join("\n  ⋅ ") : "."}`);
    for (const pageId of pageIds) {
        try {
            const post = await Post_1.Post.create(pageId);
            await post.writeToFile(config.postsDir);
            logger_utils_1.logger.success(`Added post: ${post.filename}`);
            if (!process.env.SKIP_NOTION_UPDATE) {
                await (0, notion_utils_1.markPageAsPublished)(pageId, post.date, post.url);
                logger_utils_1.logger.success(`Set notion page as published: ${post.title}`);
            }
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(chalk_1.default.red.bold("[error]"), err.message);
                console.error(`Failed on Notion page: ${pageId}`);
            }
            process.exit(1);
        }
    }
}
