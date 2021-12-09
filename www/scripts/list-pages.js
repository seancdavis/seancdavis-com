const fs = require("fs");
const glob = require("fast-glob");
const path = require("path");

const buildDir = path.join(__dirname, "../dist");
const pagePattern = path.join(buildDir, "**/*.html");
const pages = glob
  .sync(pagePattern)
  .map((file) => file.replace(buildDir, ""))
  .sort();

const outputDir = path.join(__dirname, "../tmp");
const outputFile = path.join(outputDir, "pages-list.txt");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
fs.writeFileSync(outputFile, pages.join("\n"));

console.log(`List of pages written to ${outputFile}`);
