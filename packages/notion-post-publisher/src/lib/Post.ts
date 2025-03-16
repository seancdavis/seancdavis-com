import prettier from "@prettier/sync";
import { format as formatDate } from "date-fns";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import slugify from "slugify";

import type { PostProperties } from "../types/post";

import { getAllPageBlocks, getPageProperties } from "../utils/notion-utils";
import { renderBlocks } from "../utils/render-utils";
import { createNewTags } from "../utils/www-utils";
import { Block, CreatableBlock } from "./Block";

type PostConstructorInput = {
  id: string;
  blocks: CreatableBlock[];
  properties: PostProperties;
};

export class Post {
  readonly content: string;
  readonly date: string;
  readonly filename: string;
  readonly url: string;
  readonly slug: string;
  readonly title: string;

  constructor(params: PostConstructorInput) {
    this.validate(params);
    this.title = params.properties.title;
    this.date = formatDate(new Date(), "yyyy-MM-dd");
    this.slug = slugify(this.title, { lower: true, strict: true });
    this.filename = `${this.date}-${this.slug}.md`;
    this.url = `https://www.seancdavis.com/posts/${this.slug}`;
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
    const body = renderBlocks(blocks);
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
    let blocks: CreatableBlock[] = [];
    for (const params of notionBlocks) {
      const block = await Block.create(params);
      blocks.push(block);
    }
    const properties = await getPageProperties(notionPageId);
    await createNewTags(properties.tags);
    return new Post({ id: notionPageId, blocks, properties });
  }
}
