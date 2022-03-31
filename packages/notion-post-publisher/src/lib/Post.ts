import fs from "fs";
import path from "path";
import slugify from "slugify";
import yaml from "js-yaml";
import { format as formatDate } from "date-fns";
import prettier from "prettier";

import type { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";

import { getAllPageBlocks, getPageProperties } from "../utils/notion-utils";

export type PostProperties = {
  title: string;
  description: string;
  tweet?: string;
  tags?: string[];
};

type PostConstructorInput = {
  id: string;
  blocks: GetBlockResponse[];
  properties: PostProperties;
};

export class Post {
  id: string;
  blocks: GetBlockResponse[];
  properties: PostProperties;

  constructor({ id, blocks, properties }: PostConstructorInput) {
    this.id = id;
    this.blocks = blocks;
    this.properties = properties;
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
    const body = "Hello World";

    const postContent = `---\n${frontmatter}---\n\n${body}`;
    const formattedPostContent = prettier.format(postContent, {
      parser: "markdown",
    });

    fs.writeFileSync(filePath, formattedPostContent);

    return filename;
  }

  /* ----- Validations ----- */

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
    const blocks = await getAllPageBlocks(notionPageId);
    const properties = await getPageProperties(notionPageId);
    return new Post({ id: notionPageId, blocks, properties });
  }
}
