const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

const { formatTitle } = require("../utils/format-title");
const { generateImageFilename } = require("../utils/generate-image-filename");

const imagesDir = path.join(__dirname, "../images");
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

const post = {
  title: "Draw and save images with Canvas and Node",
  date: "2021-09-29",
  author: "Sean C Davis",
};
const titleText = formatTitle(post.title);

const width = 1200;
const height = 627;
const imagePosition = {
  w: 400,
  h: 88,
  x: 400,
  y: titleText.length === 2 ? 75 : 100,
};
const titleY = titleText.length === 2 ? 300 : 350;
const titleLineHeight = 100;
const authorY = titleText.length === 2 ? 525 : 500;

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

context.fillStyle = "#764abc";
context.fillRect(0, 0, width, height);

context.font = "bold 70pt 'PT Sans'";
context.textAlign = "center";
context.fillStyle = "#fff";

context.fillText(titleText[0], 600, titleY);
if (titleText[1]) context.fillText(titleText[1], 600, titleY + titleLineHeight);

context.font = "40pt 'PT Sans'";
context.fillText(`by ${post.author}`, 600, authorY);

loadImage("./assets/logo.png").then((image) => {
  const { w, h, x, y } = imagePosition;
  context.drawImage(image, x, y, w, h);

  const imageFilename = generateImageFilename(post);
  const imagePath = path.join(imagesDir, imageFilename);

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(imagePath, buffer);
});
