"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImages = void 0;
const post_1 = require("./lib/post");
const config_utils_1 = require("./utils/config-utils");
/**
 * Looks for eligible posts that don't have an image and generates one for each.
 * It then generates a second image with the title to be used as the meta image.
 * After uploading both to S3, it adds the appropriate properties to the content
 * piece.
 */
async function generateImages(config) {
    const postsWithoutImage = post_1.Post.findAllWithoutImage(config.postsDir);
    for (const post of postsWithoutImage) {
        // Get a random background config and set it on the post.
        post.imageConfig = (0, config_utils_1.getRandomBackground)();
        // Generate and upload featured and meta images.
        await post.generateImages();
        // Store image reference on post and write back to file.
        await post.updateSrcFile();
        // Clean up.
        await post.rmTmpFiles();
    }
}
exports.generateImages = generateImages;
