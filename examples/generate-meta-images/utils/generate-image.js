const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

const formatTitle = require("./format-title");
const getImageFilename = require("./get-image-filename");

const config = require("../config");

/**
 * Given a post with a title and an author, generate an image and save it to
 * file, returning the absolute path to the file.
 *
 * @param {object} post Post object containing a title and author
 * @returns string
 */
module.exports = async (post) => {
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
  if (titleText[1])
    context.fillText(titleText[1], 600, titleY + titleLineHeight);

  context.font = "40pt 'PT Sans'";
  context.fillText(`by ${post.author}`, 600, authorY);

  const image = await loadImage("./assets/logo.png");
  const { w, h, x, y } = imagePosition;
  context.drawImage(image, x, y, w, h);

  const imageFilename = getImageFilename(post);
  const imagePath = path.join(config.imagesDir, imageFilename);

  const buffer = canvas.toBuffer("image/png");

  fs.writeFileSync(imagePath, buffer);
  return imagePath;
};
