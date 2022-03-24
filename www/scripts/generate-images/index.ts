import { postsWithoutImage } from "./post-utils";
import { getRandomBackground } from "./background-utils";
import { Generator } from "./generator";

/**
 * TODO:
 *
 * - [ ] Find a basic config that uses index.ts as the source and outputs to index.js.
 * - [ ] Use tsc rather than ts-node to run a dev server and compile on the fly.
 * - [ ] Add a README to this directory so I remember how to work with this code.
 *
 */

/**
 * Looks for eligible posts that don't have an image and generates one for each.
 * It then generates a second image with the title to be used as the meta image.
 * After uploading both to S3, it adds the appropriate properties to the content
 * piece.
 */

for (const post of postsWithoutImage()) {
  const bgConfig = getRandomBackground();
  const generator = new Generator({ post, bgConfig });
  await generator.renderBackgroundImage;
}
