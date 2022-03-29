import { postsWithoutImage, s3FilePath } from "./utils/post-utils";
import { getRandomBackground } from "./utils/background-utils";
import { uploadFile } from "./utils/s3-utils";

import { Generator } from "./lib/generator";
import { Post } from "./lib/post";

type InputConfig = {
  postsDir: string;
};

// TODO:
//
// - [x] Render title
// - [x] Add support for background colors
// - [x] Generate and store meta image
// - [x] Upload images
// - [ ] Store references back on the post
// - [ ] Write tests?

/**
 * Looks for eligible posts that don't have an image and generates one for each.
 * It then generates a second image with the title to be used as the meta image.
 * After uploading both to S3, it adds the appropriate properties to the content
 * piece.
 */
export async function generateImages(config: InputConfig) {
  const postsWithoutImage = Post.findAllWithoutImage(config.postsDir);
  console.log(postsWithoutImage);

  // for (const post of postsWithoutImage(config.postsDir)) {
  //   const generator = new Generator({ post, config: getRandomBackground() });
  //   const { featuredImagePath, metaImagePath } = await generator.run();
  //   await uploadImages({featuredImagePath, metaImagePath, post})
  //   await uploadFile(featuredImagePath, s3FilePath(featuredImagePath, post));
  //   await uploadFile(metaImagePath, s3FilePath(metaImagePath, post));
  //   post.data = {
  //     ...post.data,
  //     image:
  //   }
  // }
}
