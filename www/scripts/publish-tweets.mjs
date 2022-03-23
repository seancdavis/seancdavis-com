import { TwitterApi } from "twitter-api-v2";
import glob from "glob";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

// --- Twitter Setup ---

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

let myTweets = [];

/**
 * Check whether a tweet has been published recently.
 *
 * @param {string} text Text to check.
 * @returns {boolean}
 */
async function alreadyTweeted(text) {
  // Get existing tweets, but fetch only once.
  if (myTweets.length === 0) {
    const myTimeline = await twitterClient.v2.userTimeline(
      process.env.TWITTER_USER_ID
    );
    myTweets = myTimeline.tweets;
  }
  return myTweets.filter((tweet) => tweet.text.startsWith(text)).length > 0;
}

// --- Content Files ---

const srcPath = path.join(process.cwd(), "src");
const contentFilesPattern = path.join(srcPath, "@(posts)", "**/*.md");
const contentFiles = glob.sync(contentFilesPattern);

/**
 * Given a path to a piece of content, build the appropriate URL to share.
 *
 * @param {string} filePath Full path the content file.
 * @returns {string} Full URL to share.
 */
function buildShareUrl(filePath) {
  const baseUrl = "https://seancdavis.com";
  const prefix = filePath.replace(srcPath, "").split("/")[1]; // get prefix (e.g. "news")
  const filename = path
    .basename(filePath, path.extname(filePath)) // get filename without extension
    .replace(/^\d{4}-\d{2}-\d{2}-/g, ""); // remove date
  return `${baseUrl}/${prefix}/${filename}/`;
}

// --- The Loop ---

let publishedTweets = false;

for (const file of contentFiles) {
  const rawContent = fs.readFileSync(file).toString();
  const { data } = matter(rawContent);
  // If there is nothing to tweet, go to the next file.
  if (!data.tweet) continue;
  // If the tweet has been sent recently, go to the next file.
  if (await alreadyTweeted(data.tweet)) {
    console.log("Duplicate tweet found. Skipping.");
    continue;
  }
  // Publish the tweet.
  const shareUrl = buildShareUrl(file);
  await twitterClient.v2.tweet(`${data.tweet}\n\n${shareUrl}`);
  // Remove the tweet from the frontmatter.
  const newContent = rawContent.replace(/\ntweet: (.*)\n/g, "\n");
  fs.writeFileSync(file, newContent);
  // Log the results.
  console.log(`Tweet sent: ${data.tweet}`);
  console.log(`Post updated: ${data.title}`);
  publishedTweets = true;
}

if (!publishedTweets) console.log("No pending tweets to publish.");
