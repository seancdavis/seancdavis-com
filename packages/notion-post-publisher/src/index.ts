import { Post } from "./lib/Post";
import { getPendingPageIds } from "./utils/notion-utils";
import chalk from "chalk";

type InputConfig = {
  postsDir: string;
};

/**
 *
 */
export async function publishPosts(config: InputConfig) {
  try {
    const pageIds = await getPendingPageIds();

    for (const pageId of pageIds) {
      // const post = new Post(pageId);
      // console.log(post);
      const post = await Post.create(pageId);
      console.log(post);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`${chalk.red.bold("[error]")} ${err.message}`);
    }
    process.exit(1);
  }
}
