/**
 * Looks for eligible items that don't have an image and generates one for each.
 * It uploads the image to S3, and then adds the property to the content piece.
 */
const fs = require("fs");
const glob = require("glob");
const matter = require("gray-matter");
const nunjucks = require("nunjucks");
const path = require("path");
const sharp = require("sharp");

// TODO: Add comments and refactor

const srcDir = path.join(process.cwd(), "src");

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
    .readFileSync(path.join(__dirname, "templates", cfg.template))
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

    // TODO: Upload image to S3.
  }
}
