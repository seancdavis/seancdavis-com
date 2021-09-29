const { createCanvas } = require("canvas");
const fs = require("fs");

const width = 1200;
const height = 627;

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

context.fillStyle = "#764abc";
context.fillRect(0, 0, width, height);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);
