import { TwitterApi } from "twitter-api-v2";
import axios from "axios";
import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import path from "path";
import prettier from "prettier";
import yaml from "js-yaml";

// --- Twitter Setup ---

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

let myTweets = [];

// --- Mastodon Setup ---

const MASTODON_API_HEADERS = {
  Authorization: `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
};

let myMstStatuses = [];

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
  // Return whether the timeline has this tweet
  return myTweets.filter((tweet) => tweet.text.startsWith(text)).length > 0;
}

// --- Mastodon Helpers ---

/**
 * Check whether a status has been published to Mastodon recently.
 *
 * @param {string} text Text to check.
 * @returns {boolean}
 */
async function alreadyPublishedToMastodon(text) {
  // Get existing statuses, but fetch only once.
  if (myMstStatuses.length === 0) {
    const url =
      process.env.MASTODON_BASE_URL +
      `/api/v1/accounts/${process.env.MASTODON_USER_ID}/statuses`;
    const response = await axios.get(url, { limit: 40 });
    myMstStatuses = response.data;
  }
  // Return whether the timeline has this status. We're only checking the first
  // line of text here because a Mastodon status is written in markdown. This is
  // still risky because what was meant to be plain text for Twitter could be
  // rendered as markdown with Mastodon. But this is an edge case we're not
  // accounting for right now.
  const isDuplicate = (str) => str.includes(text.split("\n")[0]);
  return myMstStatuses.map((s) => s.content).filter(isDuplicate).length > 0;
}

/**
 * Publishes the given text to Mastodon immediately.
 *
 * @param {string} body Text to publish to Mastodon
 * @returns Axios response
 */
async function publishToMastodon(body) {
  return await axios.post(
    process.env.MASTODON_BASE_URL + "/api/v1/statuses",
    { status: body },
    { headers: MASTODON_API_HEADERS }
  );
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

function contentWithoutTweet(data, content) {
  // Clone the data object so we can remove the tweet, but still let it be used
  // in the main loop below.
  const frontmatter = { ...data };
  // Delete the tweet property.
  delete frontmatter.tweet;
  // Build the post object.
  const postContent = `---\n${yaml.dump(frontmatter)}---\n\n${content}`;
  // Format it using Prettier and return.
  return prettier.format(postContent, { parser: "markdown" });
}

// --- The Loop ---

let tweetsProcessed = false;

for (const file of contentFiles) {
  const rawContent = fs.readFileSync(file).toString();
  const { data, content } = matter(rawContent);
  // If there is nothing to tweet, go to the next file.
  if (!data.tweet) continue;
  // Store reference to whether we can remove the tweet from frontmatter.
  let removeTweet = true;
  // Build post content.
  const shareUrl = buildShareUrl(file);
  const postBody = `${data.tweet}\n\n${shareUrl}`;
  console.log("⏳", "Processing post:\n");
  postBody.split("\n").map((line) => console.log(`  ${line}`));
  console.log("");
  // Check for duplicate tweet or publish to Twitter
  const foundDuplicateTweet = await alreadyTweeted(data.tweet);
  if (foundDuplicateTweet) {
    console.log("➡️", " Duplicate tweet found. Skipping.");
  } else {
    await twitterClient.v2.tweet(postBody);
    console.log("🐦", "Tweet published.");
  }

  try {
    const foundDuplicateMstStatus = await alreadyPublishedToMastodon(
      data.tweet
    );
    if (foundDuplicateMstStatus) {
      console.log("➡️", " Duplicate Mastodon status found. Skipping.");
    } else {
      await publishToMastodon(postBody);
      console.log("🐘", "Mastodon status published.");
    }
  } catch {
    // There is a weird bug with Mastodon where the API seems to fail for a few
    // minutes after the statuses are updated.
    //
    // In this case, we consider this the equivalent of a duplicate. The tweet
    // will remain pending, but will skip Twitter the next time and hopefully be
    // able to publish here.
    removeTweet = false;
  }

  // Remove the tweet from the frontmatter if both were successful.
  if (removeTweet) {
    const newContent = contentWithoutTweet(data, content);
    fs.writeFileSync(file, newContent);
    console.log("✏️", " Post updated:", data.title);
  } else {
    console.log("⚠️", " Not removing tweet in frontmatter due to issue.");
  }
  // Note that we published a tweet for the summary.
  tweetsProcessed = true;
}

if (!tweetsProcessed) console.log("✅", "No pending social posts to publish.");
