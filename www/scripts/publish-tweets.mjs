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

// Get existing tweets.
const myTimeline = await twitterClient.v2.userTimeline(
  process.env.TWITTER_USER_ID
);
const myTweets = myTimeline.tweets;

/**
 * Check whether a tweet has been published recently.
 *
 * @param {string} text Text to check.
 * @returns {boolean}
 */
function alreadyTweeted(text) {
  return myTweets.filter((tweet) => tweet.text === text).length > 0;
}

// --- Content Files ---

const srcPath = path.join(process.cwd(), "src");
const contentFilesPattern = path.join(srcPath, "@(news|events)", "**/*.md");
const contentFiles = glob.sync(contentFilesPattern);

// --- The Loop ---

for (const file of contentFiles) {
  const rawContent = fs.readFileSync(file).toString();
  const { data } = matter(rawContent);
  // If there is nothing to tweet, go to the next file.
  if (!data.tweet) continue;
  // If the tweet has been sent recently, go to the next file.
  if (alreadyTweeted(data.tweet)) {
    console.log("Duplicate tweet found. Skipping.");
    continue;
  }
  // Publish the tweet.
  await twitterClient.v2.tweet(data.tweet);
  // Remove the tweet from the frontmatter.
  const newContent = rawContent.replace(/\ntweet: (.*)\n/g, "\n");
  fs.writeFileSync(file, newContent);
}
