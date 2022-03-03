import path from "path";

/**
 * Given the path to a content item, return a path at which to store a temporary
 * png image.
 *
 * @param filePath string - path to the content item file (not the image)
 * @param tmpDir string - full path to the tmp directory
 * @returns string - full path on where to store image
 */
export function tmpImagePath(filePath, tmpDir) {
  const tmpBasename = path.basename(filePath, path.extname(filePath));
  return path.join(tmpDir, `${tmpBasename}.png`);
}
