import path from "path";

import config from "./config";
import type { BackgroundConfig, TitleConfig } from "./config";

export interface ResolvedBackgroundConfig extends BackgroundConfig {
  titleOptions: TitleConfig[];
}

/**
 * Takes a raw background config object (from config.mjs) and does two things:
 *
 *    1. Uses `titleOptionKeys` to set rich `titleOptions` objects.
 *    2. Resolves the absolute path to the image file.
 *
 * @param {object} bgConfig raw background config object
 */
function resolveBackgroundConfig(
  bgConfig: BackgroundConfig
): ResolvedBackgroundConfig {
  const resBgConfig: any = { ...bgConfig };
  // Populate rich title options.
  resBgConfig.titleOptions = bgConfig.titleOptionKeys.map(
    (key: string): TitleConfig => config.titles[key]!
  );
  // Resolve the path to the file.
  const bgDir = path.join(process.cwd(), "scripts/generate-images/backgrounds");
  resBgConfig.filePath = path.join(bgDir, bgConfig.filePath);
  // Return the resulting object.
  return resBgConfig;
}

/**
 * Pulls a random config object from config.backgrounds and resolves it using
 * resolveBackgroundConfig().
 *
 * @returns {object} resolved config for single background image
 */
export function getRandomBackground(): ResolvedBackgroundConfig {
  const { backgrounds } = config;
  const bgConfig = backgrounds[Math.floor(Math.random() * backgrounds.length)]!;
  return resolveBackgroundConfig(bgConfig);
}
