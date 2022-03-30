import { Post } from "./lib/Post";
import { getPendingPageIds } from "./utils/notion-utils";

type InputConfig = {
  postsDir: string;
};

// TODO:
//
// - [x] Retrieve post and first level of blocks from database
// - [x] Resolve post properties
// - [ ] Add property validations in Post constructor.
// - [ ] Create new post file
// - [ ] Write frontmatter to file
// - [ ] Build block mapper
// - [ ] Update status, publish date, and link for the Notion page
// - [ ] Account for children in blocks only where necessary (lists?)
// - [ ] Account for pagination in blocks
// - [ ] Account for duplicate posts (or just override?)
// - [ ] Support guest author?
//      - If doing this, should probably also support adding an image. Not sure
//        this is the right more right now.

/**
 *
 */
export async function publishPosts(config: InputConfig) {
  const pageIds = await getPendingPageIds();

  for (const pageId of pageIds) {
    // const post = new Post(pageId);
    // console.log(post);
    const post = await Post.create(pageId);
  }
}
