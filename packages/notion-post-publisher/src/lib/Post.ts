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
  blocks: Block[];
  properties: PostProperties;
};

export class Post {
  id: string;
  blocks: Block[];
  properties: PostProperties;

  constructor(params: PostConstructorInput) {
    this.id = params.id;
    this.blocks = params.blocks;
    this.properties = params.properties;
    this.validate();
  }

  /* ----- Writing to File ----- */

  async writeToFile(postsDir: string): Promise<string> {
    // const
    // console.log(postsDir);
    // const filename = getFilename(this.properties.title)
    // const frontmatter = get
    // const body
    // const content = `---\n${frontmatter}\n---\n${body}`
    // await writePostToFile(filename, content)

    // Get File path
    const dateStr = formatDate(new Date(), "yyyy-MM-dd");
    const slug = slugify(this.properties.title, { lower: true, strict: true });
    const filename = `${dateStr}-${slug}.md`;
    const filePath = path.join(postsDir, filename);

    const frontmatter = yaml.dump(this.properties);
    const body = this.blocks.map((block) => block.render()).join("\n");

    const postContent = `---\n${frontmatter}---\n\n${body}`;
    const formattedPostContent = prettier.format(postContent, {
      parser: "markdown",
    });

    fs.writeFileSync(filePath, formattedPostContent);

    return filename;
  }

  /* ----- Validations ----- */

  /**
   * Validates this classes attributes, throwing errors when the conditions are
   * not enough to be able to properly publish a post.
   */
  private validate() {
    if (!this.properties.title) {
      throw new Error(`Notion Page ${this.id} is missing a title.`);
    }
    if (!this.properties.description) {
      throw new Error(`${this.properties.title} is missing a description.`);
    }
    if ((this.blocks ?? []).length === 0) {
      throw new Error(`${this.properties.title} is missing content.`);
    }
  }

  /* ----- Class Methods ----- */

  /**
   * Takes in a Notion page ID value, from which it retrieves and resolves
   * blocks and properties.
   *
   * @param {string} notionPageId Page ID of pending post retrieved from Notion
   * database
   * @returns {Promise<Post}
   */
  static async create(notionPageId: string): Promise<Post> {
    const notionBlocks = await getAllPageBlocks(notionPageId);
    const blocks = notionBlocks.map((block) => new Block(block));
    const properties = await getPageProperties(notionPageId);
    return new Post({ id: notionPageId, blocks, properties });
  }
}
