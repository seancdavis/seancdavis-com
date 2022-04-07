import fs from "fs";
import path from "path";
import slugify from "slugify";
import yaml from "js-yaml";
import { format as formatDate } from "date-fns";
import prettier from "prettier";

import type { PostProperties } from "../types/post";

import { Block } from "./Block";
import { getAllPageBlocks, getPageProperties } from "../utils/notion-utils";

type PostConstructorInput = {
  id: string;
  blocks: ReturnType<typeof Block.create>[];
  properties: PostProperties;
};

export class Post {
  readonly filename: string;
  readonly content: string;

  constructor(params: PostConstructorInput) {
    this.validate(params);
    this.filename = this.getFilename(params.properties.title);
    this.content = this.getContent(params.blocks, params.properties);
  }

  /* ----- Writing to File ----- */

  async writeToFile(postsDir: string): Promise<string> {
    const filePath = path.join(postsDir, this.filename);
    fs.writeFileSync(filePath, this.content);
    return this.filename;
  }

  /* ----- Attributes ----- */

  /**
   * Builds and returns a filename for this post based on today's date and the
   * title, in the form: {date}-{slug}.md
   *
   * @param title Title string from input properties
   * @returns Filename string
   */
  private getFilename(title: string): string {
    const dateStr = formatDate(new Date(), "yyyy-MM-dd");
    const slug = slugify(title, { lower: true, strict: true });
    return `${dateStr}-${slug}.md`;
  }

  /**
   * Builds a prettierized string of markdown content with properties converted
   * to YAML frontmatter.
   *
   * @param blocks Input array of block content
   * @param properties Input properties object
   * @returns Formatted markdown post content.
   */
  private getContent(
    blocks: PostConstructorInput["blocks"],
    properties: PostConstructorInput["properties"]
  ): string {
    const frontmatter = yaml.dump(properties);
    const body = blocks.map((block) => block.render()).join("\n");
    const postContent = `---\n${frontmatter}---\n\n${body}`;
    return prettier.format(postContent, { parser: "markdown" });
  }

  /* ----- Validations ----- */

  /**
   * Validates this classes attributes, throwing errors when the conditions are
   * not enough to be able to properly publish a post.
   *
   * @param params Input params from constructor.
   */
  private validate(params: PostConstructorInput) {
    if (!params.properties.title) {
      throw new Error(`Notion Page ${params.id} is missing a title.`);
    }
    if (!params.properties.description) {
      throw new Error(`${params.properties.title} is missing a description.`);
    }
    if ((params.blocks ?? []).length === 0) {
      throw new Error(`${params.properties.title} is missing content.`);
    }
  }

  /* ----- Class Methods ----- */

  /**
   * Takes in a Notion page ID value, from which it retrieves and resolves
   * blocks and properties.
   *
   * @param {string} notionPageId Page ID of pending post retrieved from Notion
   * database
   * @returns {Promise<Post>}
   */
  static async create(notionPageId: string): Promise<Post> {
    const notionBlocks = await getAllPageBlocks(notionPageId);
    const blocks = notionBlocks.map((block) => Block.create(block));
    const properties = await getPageProperties(notionPageId);
    return new Post({ id: notionPageId, blocks, properties });
  }
}
