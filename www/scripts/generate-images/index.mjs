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

import { formatTitle } from "./text-utils.mjs";

import { NewsImageGenerator } from "./news-image-generator.mjs";

const config = {
  __dirname: path.join(process.cwd(), "scripts/generate-images"),
  srcDir: path.join(process.cwd(), "src"),
  tmpDir: path.join(process.cwd(), "tmp"),
  generators: {
    news: {
      filePattern: "news/*.md",
      generator: NewsImageGenerator,
    },
  },
};

// Create tmp directory if it doesn't exist.
if (fs.existsSync(config.tmpDir)) {
  fs.mkdirSync(config.tmpDir, { recursive: true });
}

// Step through each of the generators in config object above.
for (const contentType of Object.keys(config.generators)) {
  const generatorConfig = config.generators[contentType];

  // Get all files matching the pattern.
  const filePattern = path.join(config.srcDir, generatorConfig.filePattern);
  const allFilePaths = glob.sync(filePattern);

  // Parse files and filter out those without images.
  const itemsWithoutImage = allFilePaths
    .map((filePath) => {
      const rawContent = fs.readFileSync(filePath).toString();
      const { data } = matter(rawContent);
      return { filePath, rawContent, data };
    })
    .filter(({ data }) => !data.image);

  for (const item of itemsWithoutImage) {
    // Generate the image.
    const generator = new generatorConfig.generator({ ...config, item });
    const tmpFilePath = await generator.run();
    console.log(tmpFilePath);
  }

  // TODO: Upload the image.
  // TODO: Separate function for this.
  // const bucket = process.env.AWS_BUCKET;
  //   const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  //   const dateStr = path.basename(file).match(/^\d{4}-\d{2}-\d{2}/)[0];
  //   const uploadPath = `${contentType}/${dateStr}/${tmpBasename}.png`;
  //   const params = {
  //     Body: fs.readFileSync(tmpPngFilePath),
  //     Bucket: bucket,
  //     Key: uploadPath,
  //     ContentType: "image/png",
  //   };
  //   if (!process.env.SKIP_S3_UPLOAD) {
  //     s3.putObject(params, (err) => {
  //       if (err) {
  //         console.log(err, err.stack);
  //       } else {
  //         console.log(
  //           `Uploaded meta image to: https://${bucket}.s3.amazonaws.com/${uploadPath}`
  //         );
  //       }
  //     });
  //   }

  // TODO: Store the image ref.
  // TODO: Separate function for this.
  // const newFileContent = rawContent.replace(
  //   /^---/,
  //   `---\nimage: /${uploadPath}`
  // );
  // fs.writeFileSync(file, newFileContent);
  // console.log(`Stored image reference on [${contentType}] ${data.title}`);

  // TODO: Delete temp image.
}
