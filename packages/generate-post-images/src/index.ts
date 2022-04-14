import { Post } from "./lib/post";
import { getRandomBackground } from "./utils/config-utils";

type InputConfig = {
  postsDir: string;
};

/**
 * Looks for eligible posts that don't have an image and generates one for each.
 * It then generates a second image with the title to be used as the meta image.
 * After uploading both to S3, it adds the appropriate properties to the content
 * piece.
 */
export async function generateImages(config: InputConfig) {
  const postsWithoutImage = Post.findAllWithoutImage(config.postsDir);
  for (const post of postsWithoutImage) {
    // Get a random background config and set it on the post.
    post.imageConfig = getRandomBackground();
    // Generate and upload featured and meta images.
    await post.generateImages();
    // Store image reference on post and write back to file.
    await post.updateSrcFile();
    // Clean up.
    await post.rmTmpFiles();
  }
}
