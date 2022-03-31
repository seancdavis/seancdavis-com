import { Client } from "@notionhq/client";
import type { BlockObjectResponse } from "../types/notion";
import type { PostProperties } from "../types/post";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

/* ----- Types ----- */

type PageResponse = {
  properties: { [key: string]: any };
};

/* ----- Utils ----- */

/**
 * Retrieve a list of id values for all Notion pages with a status of "Draft:
 * Ready"
 *
 * @returns {Promise<string[]>}
 */
export async function getPendingPageIds(): Promise<string[]> {
  if (!process.env.NOTION_DATABASE_ID) {
    throw new Error("NOTION_DATABASE_ID not set.");
  }

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Status",
      select: {
        equals: "Draft: Ready",
      },
    },
  });
  return (response.results || []).map((res) => res.id);
}

/**
 * Resolve all blocks for a page, accounting for block children and pagination
 * only where necessary to serve basic post features.
 *
 * @param {string} pageId ID string from Notion representing the Notion page.
 * @returns {Promise<BlockObjectResponse[]>}
 */
export async function getAllPageBlocks(
  pageId: string
): Promise<BlockObjectResponse[]> {
  const response = await notion.blocks.children.list({
    block_id: pageId,
  });
  const blocks = response.results as unknown as BlockObjectResponse[];
  return blocks;
}

/**
 * Retrieve the page from Notion API and extract only the properties.
 *
 * @param {string} pageId ID string from Notion representing the Notion page.
 * @returns {Promise<PostProperties>}
 */
export async function getPageProperties(
  page_id: string
): Promise<PostProperties> {
  const page = (await notion.pages.retrieve({ page_id })) as PageResponse;
  const properties = page?.properties;
  // Note that this is not strongly typed because of the way Notion defines
  // types. I've made all PageProperty properties optional, but there is
  // validation built into the Page object.
  //
  // Therefore, the goal in this method is to get out of here without an error
  // based on the SDK's data structure. If there is an error, we want it to come
  // from instantiating the Page and make it easier to debug here.
  return {
    title: properties["Name"].title?.[0]?.plain_text,
    description: properties["Description"].rich_text?.[0]?.plain_text,
    tags: properties["Tags"].multi_select?.map(
      (tag: { name: string }) => tag.name
    ),
    tweet: properties["Tweet"]?.rich_text?.[0]?.plain_text,
  };
}
