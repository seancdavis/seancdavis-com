import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionBlock = Extract<GetBlockResponse, { type: string }>;

export type NotionHeading1Block = Extract<
  GetBlockResponse,
  { type: "heading_1" }
>;

export type NotionHeading2Block = Extract<
  GetBlockResponse,
  { type: "heading_2" }
>;

export type NotionHeading3Block = Extract<
  GetBlockResponse,
  { type: "heading_3" }
>;

export type NotionParagraphBlock = Extract<
  GetBlockResponse,
  { type: "paragraph" }
>;

export type NotionBulletedListItemBlock = Extract<
  GetBlockResponse,
  { type: "bulleted_list_item" }
>;

export type NotionNumberedListItemBlock = Extract<
  GetBlockResponse,
  { type: "numbered_list_item" }
>;

export type NotionCodeBlock = Extract<GetBlockResponse, { type: "code" }>;

export type NotionVideoBlock = Extract<GetBlockResponse, { type: "video" }>;

export type NotionDividerBlock = Extract<GetBlockResponse, { type: "divider" }>;

/* ----- Shared Types ----- */

// These are extracted from types above, but the objects are the same regardless
// of the type from which it is extracted.

export type NotionRichText = NotionParagraphBlock["paragraph"]["rich_text"][0];

export type NotionColor = NotionParagraphBlock["paragraph"]["color"];
