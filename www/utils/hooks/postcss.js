const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

const plugins = [
  require("postcss-import"),
  require("postcss-nested"),
  require("tailwindcss"),
  require("autoprefixer"),
  require("postcss-custom-properties"),
  ...(process.env.ELEVENTY_ENV === "production" ? [require("cssnano")] : []),
];

const processOptions = {
  from: path.join(__dirname, "../../src/_includes/css/index.css"),
  to: path.join(__dirname, "../../src/css/styles.css"),
};

/**
 * Extends Eleventy's configuration.
 *
 * @param {object} eleventyConfig Eleventy's configuration object
 */
exports.default = (eleventyConfig) => {
  let skipCssProcessing = false;

  /**
   * When running the dev server, if no CSS files were changed, tell the build
   * to skip running the PostCSS build.
   *
   * Note: This works because beforeWatch() runs before beforeBuild()
   */
  eleventyConfig.on("beforeWatch", (filesChanged) => {
    const cssFiles = filesChanged.filter((f) => f.endsWith(".css"));
    skipCssProcessing = cssFiles.length === 0;
  });

  /**
   * Unless told to skip (see above), run the PostCSS build.
   */
  eleventyConfig.on("beforeBuild", async () => {
    if (skipCssProcessing) return;
    console.log("[postcss] Building CSS bundle ...");
    const css = fs.readFileSync(processOptions.from).toString();
    const result = await postcss(plugins).process(css, processOptions);
    fs.writeFileSync(processOptions.to, result.css);
    console.log("[postcss] Done.");
  });
};
