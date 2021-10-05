const fs = require("fs");
const path = require("path");

const { generateImage, getPosts, writePostToFile } = require("../utils");

const run = async () => {
  // Loop through the posts.
  for (let post of getPosts()) {
    // If the post already has an image reference, continue.
    if (post.image) continue;
    // Generate an image for the post.
    const imagePath = await generateImage(post);
    // Store a reference to the image.
    post = { ...post, image: path.basename(imagePath) };
    // Write the new post object back to file.
    await writePostToFile(post);
  }
};

run()
  .then(() => console.log("Done"))
  .catch((err) => {
    console.error("\n", err);
    process.exit(1);
  });
