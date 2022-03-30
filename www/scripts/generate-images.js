const path = require("path");

const {
  generateImages,
} = require("../../packages/generate-post-images/dist/index.js");

generateImages({ postsDir: path.join(__dirname, "../src/posts") }).then(() => {
  console.log("Done.");
});
