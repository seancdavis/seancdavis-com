import type { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";
import { getAllPageBlocks, getPageProperties } from "../utils/notion-utils";

export type PostProperties = {
  title?: string;
  tweet?: string;
  description?: string;
  tags?: string[];
};

type PostConstructorInput = {
  blocks: GetBlockResponse[];
  properties: PostProperties;
};

export class Post {
  blocks: GetBlockResponse[];
  properties: {};

  constructor({ blocks, properties }: PostConstructorInput) {
    this.blocks = blocks;
    this.properties = properties;
  }

  /* ----- Class Methods ----- */

  /**
   * Build a new instance of a post after retrieving all the post blocks.
   *
   * @param {string} notionPageId Page ID of pending post retrieved from Notion
   * database
   * @returns {Promise<Post}
   */
  static async create(notionPageId: string): Promise<Post> {
    const blocks = await getAllPageBlocks(notionPageId);
    const properties = await getPageProperties(notionPageId);
    console.log(properties);

    return new Post({ blocks, properties });
  }
}
