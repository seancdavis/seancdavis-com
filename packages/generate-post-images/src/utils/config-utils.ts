import path from "path";

import config from "../config";
import type { BackgroundConfig, TitleConfig } from "../config";

export interface ResolvedBackgroundConfig
  extends Omit<BackgroundConfig, "titleOptionKeys">,
    TitleConfig {}

/**
 * Takes a raw background config object (from config.mjs) and does two things:
 *
 *    1. Uses `titleOptionKeys` to set a title attributes directly on the object
 *    2. Resolves the absolute path to the image file.
 *
 * @param {object} bgConfig raw background config object
 */
function resolveBackgroundConfig(
  bgConfig: BackgroundConfig
): ResolvedBackgroundConfig {
  // Choose a random title object.
  const titleKey = getRandomItem(bgConfig.titleOptionKeys);
  const titleConfig = config.titles[titleKey];
  // Set the properties on this object, removing titleOptionKeys.
  const { titleOptionKeys, ...bgConfigProps } = bgConfig;
  const resBgConfig = {
    ...bgConfigProps,
    ...titleConfig,
  } as ResolvedBackgroundConfig;
  // Resolve the path to the file.
  const bgDir = path.join(__dirname, "../../src/assets");
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
  const bgConfig = getRandomItem(config.backgrounds) as BackgroundConfig;
  return resolveBackgroundConfig(bgConfig);
}

/**
 * Given an array of objects, return a random object from the array.
 *
 * @param {array} arr An array of objects
 * @returns {object} A random object from the array
 */
function getRandomItem(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)]!;
}
