import { Post } from "./lib/Post";
import { getPendingPageIds } from "./utils/notion-utils";
import chalk from "chalk";

type InputConfig = {
  postsDir: string;
};

/**
 * Finds Notion pages in with the state "Draft: Ready", converts them to
 * markdown posts with frontmatter properties, and writes them to file in the
 * postsDir.
 *
 * @param config Configuration object
 * @param config.postsDir Absolute path to directory in which to write posts
 */
export async function publishPosts(config: InputConfig) {
  const pageIds = await getPendingPageIds();

  for (const pageId of pageIds) {
    try {
      const post = await Post.create(pageId);
      const filename = await post.writeToFile(config.postsDir);
      console.log(chalk.green.bold("[success]"), `Added post: ${filename}`);
    } catch (err) {
      if (err instanceof Error) {
        console.error(chalk.red.bold("[error]"), err.message);
        console.error(`Failed on Notion page: ${pageId}`);
      }
      process.exit(1);
    }
  }
}
