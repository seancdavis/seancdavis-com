/**
 * This script was used on a single occasion to apply a random image from a
 * series of 18 default images to all posts without an image.
 *
 * It requires installing yaml, which was removed since it's not used otherwise
 * in this project (at the time of writing the script).
 *
 * See #277 and #278 for more information.
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("fast-glob");
const yaml = require("yaml");

const postsDir = path.join(__dirname, "../src/blog/posts");
const postFiles = glob.sync(path.join(postsDir, "**/*.md"));

const defaultImages = [
  "/blog/default/default-blue-01.png",
  "/blog/default/default-blue-02.png",
  "/blog/default/default-blue-03.png",
  "/blog/default/default-green-01.png",
  "/blog/default/default-green-02.png",
  "/blog/default/default-green-03.png",
  "/blog/default/default-lime-01.png",
  "/blog/default/default-lime-02.png",
  "/blog/default/default-lime-03.png",
  "/blog/default/default-orange-01.png",
  "/blog/default/default-orange-02.png",
  "/blog/default/default-orange-03.png",
  "/blog/default/default-pink-01.png",
  "/blog/default/default-pink-02.png",
  "/blog/default/default-pink-03.png",
  "/blog/default/default-yellow-01.png",
  "/blog/default/default-yellow-02.png",
  "/blog/default/default-yellow-03.png",
];

const getRandomImage = () => {
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
};

postFiles.map((file) => {
  const fileContent = fs.readFileSync(file);
  const { data, content } = matter(fileContent);

  if (!data.image) {
    data.image = getRandomImage();

    const newFileContent = `---\n${yaml.stringify(data)}---\n${content}`;
    fs.writeFileSync(file, newFileContent);
  }
});
