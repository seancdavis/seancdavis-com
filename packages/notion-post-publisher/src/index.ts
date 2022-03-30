import { Post } from "./lib/Post";
import { getPendingPageIds } from "./utils/notion-utils";

type InputConfig = {
  postsDir: string;
};

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
