/**
 * Looks for eligible items that don't have an image and generates one for each.
 * It uploads the image to S3, and then adds the property to the content piece.
 */
import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import path from "path";

import { NewsImageGenerator } from "./news-image-generator.mjs";
import { EventImageGenerator } from "./event-image-generator.mjs";
import { ToolImageGenerator } from "./tool-image-generator.mjs";
import { uploadFile, storeImageRef } from "./file-utils.mjs";

const config = {
  __dirname: path.join(process.cwd(), "scripts/generate-images"),
  srcDir: path.join(process.cwd(), "src"),
  tmpDir: path.join(process.cwd(), "tmp"),
  generators: {
    events: {
      filePattern: "events/*.md",
      generator: EventImageGenerator,
    },
    news: {
      filePattern: "news/*.md",
      generator: NewsImageGenerator,
    },
    tools: {
      filePattern: "tools/*.md",
      generator: ToolImageGenerator,
      uploadDirType: "slug",
    },
  },
};

// Create tmp directory if it doesn't exist.
if (!fs.existsSync(config.tmpDir)) {
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
    // Upload generated image.
    const uploadPath = await uploadFile(
      tmpFilePath,
      contentType,
      generatorConfig.uploadDirType
    );
    if (!uploadPath) continue;
    // Store reference on item.
    storeImageRef(item.filePath, uploadPath);
    // Delete temp file.
    fs.unlinkSync(tmpFilePath);
    console.log(`Generated image for [${contentType}] ${item.data.title}`);
  }
}
