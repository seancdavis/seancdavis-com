/**
 * Looks for eligible posts that don't have an image and generates one for each.
 * It then generates a second image with the title to be used as the meta image.
 * After uploading both to S3, it adds the appropriate properties to the content
 * piece.
 */
import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import path from "path";

import config from "./config.mjs";
import { postsWithoutImage } from "./post-utils.mjs";

console.log(postsWithoutImage());
