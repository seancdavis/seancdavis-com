import { Client } from "@notionhq/client";
import { UpdatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import type { NotionBlock } from "../types/notion";
import type { PostProperties } from "../types/post";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

/* ----- Types ----- */

type PageResponse = {
  properties: { [key: string]: any };
};

/* ----- Controls ----- */

const statusPropertyName = "Status";
const publishedDatePropertyName = "Publish Date";
const postLinkPropertyName = "Link";
const pendingStatus = "Draft: Ready";
const publishedStatus = "Published";

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
      property: statusPropertyName,
      select: {
        equals: pendingStatus,
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
 * @returns {Promise<NotionBlock[]>}
 */
export async function getAllPageBlocks(pageId: string): Promise<NotionBlock[]> {
  const response = await notion.blocks.children.list({
    block_id: pageId,
  });
  const blocks = response.results as unknown as NotionBlock[];
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

/**
 * Marks a notion page as published by setting its status, publish date, and
 * link properties.
 *
 * @param page_id ID of the Notion page.
 * @param date Date (string) that the post was published.
 * @param link Link to the published post.
 */
export async function markPageAsPublished(
  page_id: string,
  date: string,
  link: string
): Promise<UpdatePageResponse> {
  const page = await notion.pages.update({
    page_id,
    properties: {
      [statusPropertyName]: {
        select: {
          name: publishedStatus,
        },
      },
      [publishedDatePropertyName]: {
        date: {
          start: date,
        },
      },
      [postLinkPropertyName]: {
        url: link,
      },
    },
  });
  return page;
}
