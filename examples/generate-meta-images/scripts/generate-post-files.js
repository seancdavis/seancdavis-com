const { generateRandomPost, writePostToFile } = require("../utils");
const config = require("../config");

[...Array(config.randomPostCount)].map((_) => {
  const post = generateRandomPost();
  writePostToFile(post);
});
