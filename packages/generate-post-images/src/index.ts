import { postsWithoutImage } from "./utils/post-utils";
import { getRandomBackground } from "./utils/background-utils";
import { Generator } from "./generator";

type GeneratorConfig = {
  postsDir: string;
};

/**
 * Looks for eligible posts that don't have an image and generates one for each.
 * It then generates a second image with the title to be used as the meta image.
 * After uploading both to S3, it adds the appropriate properties to the content
 * piece.
 */
export async function generateImages(config: GeneratorConfig) {
  for (const post of postsWithoutImage(config.postsDir)) {
    const bgConfig = getRandomBackground();
    const generator = new Generator({ post, bgConfig });
    const { featuredImagePath } = await generator.run();
    console.log(featuredImagePath);
  }
}