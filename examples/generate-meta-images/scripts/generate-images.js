const fs = require("fs");
const path = require("path");
const glob = require("glob");
const matter = require("gray-matter");

const { generateImageFilename } = require("../utils/generate-image-filename");
const { generateImage } = require("../utils/generate-image");

const imagesDir = path.join(__dirname, "../images");

// Create the directory for images if it doesn't exist.
const initDir = () => {
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);
};

// Retrieve list of post files
const getPostFiles = () => {
  const postsPattern = path.join(__dirname, "../content", "*.md");
  return glob.sync(postsPattern);
};

const run = async () => {
  initDir();

  const postFiles = getPostFiles();

  for (let file of postFiles) {
    const fileContent = fs.readFileSync(file);
    const post = matter(fileContent).data;

    const imageFilename = generateImageFilename(post);
    const imagePath = path.join(imagesDir, imageFilename);
    const image = await generateImage(post);

    fs.writeFileSync(imagePath, image);
  }
};

run()
  .then(() => console.log("Done"))
  .catch((err) => {
    console.error("\n", err);
    process.exit(1);
  });
