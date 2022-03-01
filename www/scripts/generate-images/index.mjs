/**
 * Looks for eligible items that don't have an image and generates one for each.
 * It uploads the image to S3, and then adds the property to the content piece.
 */
import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import nunjucks from "nunjucks";
import path from "path";
import canvas from "canvas";

import { formatTitle } from "./format-title.mjs";

// console.log(canvas);
// import sharp from "sharp";
// import convert from "convert-svg-to-png";
// import { convert } from "convert-svg-to-png";

// TODO: Add comments and refactor

const srcDir = path.join(process.cwd(), "src");
const templatesDir = path.join(
  process.cwd(),
  "scripts/generate-images/templates"
);

const tmpDir = path.join(process.cwd(), "tmp");
if (fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

const config = {
  news: {
    filePattern: "news/*.md",
    template: "news-template.njk",
  },
};

for (const contentType of Object.keys(config)) {
  const cfg = config[contentType];
  const allFilePaths = glob.sync(path.join(srcDir, cfg.filePattern));
  const template = fs
    .readFileSync(path.join(templatesDir, cfg.template))
    .toString();

  for (const file of allFilePaths) {
    const rawContent = fs.readFileSync(file).toString();
    const { data, content } = matter(rawContent);

    // Skip objects that already have an image.
    if (data.image) continue;

    const svgCode = nunjucks.renderString(template, { title: data.title });
    const tmpBasename = path.basename(file, path.extname(file));
    const tmpSvgFilePath = path.join(tmpDir, `${tmpBasename}.svg`);
    fs.writeFileSync(tmpSvgFilePath, svgCode);

    // TODO: Use sharp to convert image to PNG
    // https://coderrocketfuel.com/article/convert-svg-to-png-using-node-js-and-sharp
    const tmpPngFilePath = path.join(tmpDir, `${tmpBasename}.png`);
    // console.log(convert);
    // await sharp(tmpSvgFilePath).png().toFile(tmpPngFilePath);

    // Trying with canvas instead ...
    // UPDATE: This didn't work like I expected. Trying something else.

    // Register font. This will help when running as a GitHub Action.
    const fontPath = path.join(
      process.cwd(),
      "src/assets/fonts/DMSerifDisplay-Regular.ttf"
    );
    canvas.registerFont(fontPath, { family: "DM Serif Display" });

    const imgCanvas = canvas.createCanvas(2400, 1260);
    const context = imgCanvas.getContext("2d");

    // bg image
    const bgImage = await canvas.loadImage(tmpSvgFilePath);
    context.drawImage(bgImage, 0, 0, 2400, 1260);

    // Site badge ->
    const badgeX = 1200;
    const badgeY = 630;
    const badgePaddingX = 84;
    const badgePaddingY = 36;
    const badgeFontSize = 72;
    const badgeText = "seancdavis.com";
    context.font = `bold ${badgeFontSize}pt 'DM Serif Display'`;
    context.textAlign = "center";
    const badgeWidth = context.measureText(badgeText).width;
    context.fillStyle = "#2260bf";
    const badgePosition = {
      x: badgeX - badgeWidth / 2 - badgePaddingX,
      y: badgeY - badgeFontSize - badgePaddingY + 2, // plus two is just an aesthetic adjustment based on current values
      w: badgeWidth + badgePaddingX * 2,
      h: badgeFontSize + badgePaddingY * 2,
    };
    context.fillRect(
      badgePosition.x,
      badgePosition.y,
      badgePosition.w,
      badgePosition.h
    );
    context.fillStyle = "#ffffff";
    context.fillText(badgeText, badgeX, badgeY);

    // UPDATE: This comes out a little grainy -> may still be the better option
    // const siteBadgeImagePath = path.join(templatesDir, "site-badge.svg");
    // const siteBadgeImage = await canvas.loadImage(siteBadgeImagePath);
    // context.drawImage(siteBadgeImage, 0, 0, 696, 147);

    // TITLE
    // const titleText = formatTitle(data.title);
    const titleText = formatTitle(
      "Occaecat id labore amet dolor nisi ipsum eiusmod proident laborum eu."
    );
    const titleY = titleText.length === 2 ? 300 : 350;
    const titleLineHeight = 100;
    context.font = `bold 148pt 'DM Serif Display'`;
    context.fillStyle = "#000000";
    context.fillText(titleText[0], 1200, titleY);
    if (titleText[1])
      context.fillText(titleText[1], 1200, titleY + titleLineHeight);

    const buffer = imgCanvas.toBuffer("image/png");
    fs.writeFileSync(tmpPngFilePath, buffer);

    // TODO: Upload image to S3.
  }
}
