const path = require("path");
const {
  publishPosts,
} = require("../../packages/notion-post-publisher/dist/index");

publishPosts({ postsDir: path.join(__dirname, "../src/posts") }).then(() => {
  console.log("Done.");
});
