import path from "path";

import config from "./config.mjs";

/**
 * Takes a raw background config object (from config.mjs) and does two things:
 *
 *    1. Replaces the `titleOptions` with appropriate title config.
 *    2. Resolves the absolute path to the image file.
 *
 * @param {object} bgConfig raw background config object
 */
function resolveBackgroundConfig(bgConfig) {
  // Populate rich title options.
  bgConfig.titleOptions = bgConfig.titleOptions.map(
    (key) => config.titles[key]
  );
  // Resolve the path to the file.
  const bgDir = path.join(process.cwd(), "scripts/generate-images/backgrounds");
  bgConfig.filePath = path.join(bgDir, bgConfig.filePath);
  // Return the resulting object.
  return bgConfig;
}

export function getRandomBackground() {
  const { backgrounds } = config;
  const bgConfig = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  return resolveBackgroundConfig(bgConfig);
}
