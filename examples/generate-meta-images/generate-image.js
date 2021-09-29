const { createCanvas } = require("canvas");
const fs = require("fs");

const { formatTitle } = require("./utils/format-title");

const post = {
  title: "Draw and save images",
};

const width = 1200;
const height = 627;
const titleY = 170;
const lineHeight = 100;

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

context.fillStyle = "#764abc";
context.fillRect(0, 0, width, height);

context.font = "bold 70pt 'PT Sans'";
context.textAlign = "center";
context.fillStyle = "#fff";

const text = formatTitle(post.title);
context.fillText(text[0], 600, titleY);
if (text[1]) context.fillText(text[1], 600, titleY + lineHeight);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);
