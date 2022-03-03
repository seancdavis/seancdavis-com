/**
 * Looks for eligible items that don't have an image and generates one for each.
 * It uploads the image to S3, and then adds the property to the content piece.
 */
import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import path from "path";
import canvas from "canvas";
import AWS from "aws-sdk";

import { formatTitle } from "./format-title.mjs";

const srcDir = path.join(process.cwd(), "src");
const __dirname = path.join(process.cwd(), "scripts/generate-images");

const tmpDir = path.join(process.cwd(), "tmp");
if (fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

const config = {
  news: {
    filePattern: "news/*.md",
    bgImage: path.join(__dirname, "templates/news-background.svg"),
  },
};

for (const contentType of Object.keys(config)) {
  const cfg = config[contentType];
  const allFilePaths = glob.sync(path.join(srcDir, cfg.filePattern));
  // const template = fs
  //   .readFileSync(path.join(templatesDir, cfg.template))
  //   .toString();

  for (const file of allFilePaths) {
    const rawContent = fs.readFileSync(file).toString();
    const { data } = matter(rawContent);

    // Skip objects that already have an image.
    if (data.image) continue;

    // const svgCode = nunjucks.renderString(template, { title: data.title });
    const tmpBasename = path.basename(file, path.extname(file));
    // const tmpSvgFilePath = path.join(tmpDir, `${tmpBasename}.svg`);
    // fs.writeFileSync(tmpSvgFilePath, svgCode);

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

    let canvasConfig = { w: 2400, h: 1260 };

    const imgCanvas = canvas.createCanvas(canvasConfig.w, canvasConfig.h);
    const context = imgCanvas.getContext("2d");

    function setFont(fontSize) {
      context.font = `bold ${fontSize}pt 'DM Serif Display'`;
    }

    // TITLE
    const titleText = formatTitle({
      title: data.title,
      maxFontSize: 110,
      maxLineWidth: 1600,
      context,
    });

    // console.log(titleText);
    // process.exit(0);

    let titleConfig = {
      text: titleText.text,
      color: "#051c28",
      // y: 0,
      x: canvasConfig.w / 2,
      fontSize: titleText.fontSize,
      lineHeight: titleText.fontSize * 1.75,
    };

    let badgeTextConfig = {
      text: "seancdavis.com",
      color: "#FFFFFF",
      x: canvasConfig.w / 2,
      // get y() {
      //   // Bottom margin is an extra line height.
      //   return 200 + titleConfig.lineHeight * (titleConfig.text.length + 1);
      // },
      fontSize: titleConfig.fontSize * 0.55,
      get w() {
        setFont(this.fontSize);
        return context.measureText(this.text).width;
      },
    };

    let badgeBgConfig = {
      color: "#2260bf",
      paddingX: badgeTextConfig.fontSize * 1.167,
      paddingY: badgeTextConfig.fontSize * 0.5,
      get x() {
        return badgeTextConfig.x - badgeTextConfig.w / 2 - this.paddingX;
      },
      // get y() {
      //   // plus two is just an aesthetic adjustment based on current values
      //   return badgeTextConfig.y - badgeTextConfig.fontSize - this.paddingY + 2;
      // },
      get w() {
        return badgeTextConfig.w + this.paddingX * 2;
      },
      get h() {
        return badgeTextConfig.fontSize + this.paddingY * 2;
      },
    };

    // console.log({ titleConfig, badgeTextConfig, badgeBgConfig });

    // now we have to calculate the total height of the content to get the
    // initial y. Then we can set the proper y values.
    //
    // This is the height of each title line, plus an empty half line (for margin),
    // plus the height of the badge background.
    const totalHeight =
      titleConfig.fontSize * (titleConfig.text.length + 0.5) + badgeBgConfig.h;
    titleConfig.y = canvasConfig.h / 2 - totalHeight / 4;
    badgeTextConfig.y =
      titleConfig.y + titleConfig.lineHeight * (titleConfig.text.length + 0.5);
    badgeBgConfig.y =
      badgeTextConfig.y - badgeTextConfig.fontSize - badgeBgConfig.paddingY + 2;

    // bg image
    // TODO: Replace this with proper background image
    const bgImage = await canvas.loadImage(cfg.bgImage);
    context.drawImage(bgImage, 0, 0, canvasConfig.w, canvasConfig.h);

    context.textAlign = "center";

    // TITLE
    // const titleY = titleText.length === 2 ? 300 : 350;
    // const titleLineHeight = 186;
    // context.font = `bold 124pt 'DM Serif Display'`;
    setFont(titleConfig.fontSize);
    context.fillStyle = titleConfig.color;
    // context.fillStyle = "#051c28";
    context.fillText(titleConfig.text[0], titleConfig.x, titleConfig.y);
    if (titleConfig.text[1]) {
      context.fillText(
        titleConfig.text[1],
        titleConfig.x,
        titleConfig.y + titleConfig.lineHeight
      );
    }

    // Site badge ->
    // const badgeX = 1200;
    // const badgeY = 630;
    // const badgePaddingX = 84;
    // const badgePaddingY = 36;
    // const badgeFontSize = 72;
    // const badgeText = "seancdavis.com";
    // context.font = `bold ${badgeFontSize}pt 'DM Serif Display'`;
    // const badgeWidth = context.measureText(badgeText).width;
    // context.fillStyle = "#2260bf";
    context.fillStyle = badgeBgConfig.color;
    // const badgePosition = {
    //   x: badgeX - badgeWidth / 2 - badgePaddingX,
    //   y: badgeY - badgeFontSize - badgePaddingY + 2, // plus two is just an aesthetic adjustment based on current values
    //   w: badgeWidth + badgePaddingX * 2,
    //   h: badgeFontSize + badgePaddingY * 2,
    // };
    context.fillRect(
      badgeBgConfig.x,
      badgeBgConfig.y,
      badgeBgConfig.w,
      badgeBgConfig.h
    );

    // badge text
    setFont(badgeTextConfig.fontSize);
    // context.fillStyle = "#ffffff";
    context.fillStyle = badgeTextConfig.color;
    context.fillText(
      badgeTextConfig.text,
      badgeTextConfig.x,
      badgeTextConfig.y
    );

    // UPDATE: This comes out a little grainy -> may still be the better option
    // const siteBadgeImagePath = path.join(templatesDir, "site-badge.svg");
    // const siteBadgeImage = await canvas.loadImage(siteBadgeImagePath);
    // context.drawImage(siteBadgeImage, 0, 0, 696, 147);

    const buffer = imgCanvas.toBuffer("image/png");
    fs.writeFileSync(tmpPngFilePath, buffer);

    // Upload image to S3.
    const bucket = process.env.AWS_BUCKET;
    const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
    const dateStr = path.basename(file).match(/^\d{4}-\d{2}-\d{2}/)[0];
    const uploadPath = `${contentType}/${dateStr}/${tmpBasename}.png`;
    const params = {
      Body: fs.readFileSync(tmpPngFilePath),
      Bucket: bucket,
      Key: uploadPath,
      ContentType: "image/png",
    };
    if (!process.env.SKIP_S3_UPLOAD) {
      s3.putObject(params, (err) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(
            `Uploaded meta image to: https://${bucket}.s3.amazonaws.com/${uploadPath}`
          );
        }
      });
    }

    // store ref on the original object.
    const newFileContent = rawContent.replace(
      /^---/,
      `---\nimage: /${uploadPath}`
    );
    fs.writeFileSync(file, newFileContent);
    console.log(`Stored image reference on [${contentType}] ${data.title}`);
  }
}
