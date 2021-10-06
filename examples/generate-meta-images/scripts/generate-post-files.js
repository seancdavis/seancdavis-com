const { generateRandomPost, writePostToFile } = require("../utils");
const config = require("../config");

Array(config.randomPostCount)
  .fill()
  .map(() => {
    const post = generateRandomPost();
    writePostToFile(post);
  });
