import prettier from "@prettier/sync";
import glob from "fast-glob";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";

import { TOPICS_DIR } from "../constants";
import { toTitleCase } from "./string-utils";

/**
 * Create topic files with basic content for missing tags. This makes an
 * assumption that all topic filenames are exclusively lower case and can be
 * programmatically capitalized (to be overridden manually as needed).
 *
 * @param tags A list of tags for a given page
 * @returns A list of tag slugs created
 */
export async function createNewTags(tags?: string[]): Promise<string[]> {
  if (!tags || tags.length === 0) return [];
  const allTagSlugs = glob
    .sync(path.join(TOPICS_DIR, "*.md"))
    .map((filePath) => path.basename(filePath, path.extname(filePath)));
  const newTags = tags
    .map((tag) => tag.toLowerCase())
    .filter((tag) => !allTagSlugs.includes(tag));
  newTags.map((slug) => {
    const title = toTitleCase(slug.replace(/-/g, " "));
    const tag = { title, pagination: { data: `collections.${slug}` } };
    const content = `---\n${yaml.dump(tag)}\n---`;
    fs.writeFileSync(
      path.join(TOPICS_DIR, `${slug}.md`),
      prettier.format(content, { parser: "markdown" })
    );
    console.log(`Created new topic: ${slug}`);
  });
  return newTags;
}
