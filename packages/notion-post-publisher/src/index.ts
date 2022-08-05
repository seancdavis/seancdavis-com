import { Post } from "./lib/Post";
import { getPendingPageIds, markPageAsPublished } from "./utils/notion-utils";
import chalk from "chalk";
import { Logger } from "./lib/Logger";

/* ----- Types ----- */

type InputConfig = {
  postsDir: string;
};

/* ----- Main Function ----- */

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
  const logger = new Logger();

  for (const pageId of pageIds) {
    try {
      const post = await Post.create(pageId);
      await post.writeToFile(config.postsDir);
      logger.success(`Added post: ${post.filename}`);
      if (!process.env.SKIP_NOTION_UPDATE) {
        await markPageAsPublished(pageId, post.date, post.url);
        logger.success(`Set notion page as published: ${post.title}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(chalk.red.bold("[error]"), err.message);
        console.error(`Failed on Notion page: ${pageId}`);
      }
      process.exit(1);
    }
  }
}
