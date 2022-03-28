import { postsWithoutImage } from "./utils/post-utils";
import { getRandomBackground } from "./utils/background-utils";
import { Generator } from "./generator";

type GeneratorConfig = {
  postsDir: string;
};

// TODO:
//
// - [x] Render title
// - [x] Add support for background colors
// - [x] Generate and store meta image
// - [ ] Upload images
// - [ ] Store references back on the post
// - [ ] Write tests?

/**
 * Looks for eligible posts that don't have an image and generates one for each.
 * It then generates a second image with the title to be used as the meta image.
 * After uploading both to S3, it adds the appropriate properties to the content
 * piece.
 */
export async function generateImages(config: GeneratorConfig) {
  for (const post of postsWithoutImage(config.postsDir)) {
    const generator = new Generator({ post, config: getRandomBackground() });
    const { featuredImagePath, metaImagePath } = await generator.run();
    console.log(featuredImagePath);
  }
}
