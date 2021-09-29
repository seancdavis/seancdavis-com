const { createCanvas } = require("canvas");
const fs = require("fs");

const width = 1200;
const height = 627;
const post = {
  title: "Draw and save images with Canvas and Node",
};

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

context.fillStyle = "#764abc";
context.fillRect(0, 0, width, height);

context.font = "bold 70pt 'PT Sans'";
context.textAlign = "center";
context.fillStyle = "#fff";
context.fillText(post.title, 600, 170);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);
