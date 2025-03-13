import { GetBlockResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionBlock = Extract<GetBlockResponse, { type: string }> & {
  children?: NotionBlock[];
};

export type NotionHeading1Block = Extract<NotionBlock, { type: "heading_1" }>;

export type NotionHeading2Block = Extract<NotionBlock, { type: "heading_2" }>;

export type NotionHeading3Block = Extract<NotionBlock, { type: "heading_3" }>;

export type NotionParagraphBlock = Extract<NotionBlock, { type: "paragraph" }>;

export type NotionQuoteBlock = Extract<NotionBlock, { type: "quote" }>;

export type NotionBulletedListItemBlock = Extract<
  NotionBlock,
  { type: "bulleted_list_item" }
>;

export type NotionNumberedListItemBlock = Extract<
  NotionBlock,
  { type: "numbered_list_item" }
>;

export type NotionCodeBlock = Extract<NotionBlock, { type: "code" }>;

export type NotionImageBlock = Extract<NotionBlock, { type: "image" }>;

export type NotionVideoBlock = Extract<NotionBlock, { type: "video" }>;

export type NotionCalloutBlock = Extract<NotionBlock, { type: "callout" }>;

export type NotionDividerBlock = Extract<NotionBlock, { type: "divider" }>;

export type NotionTableOfContentsBlock = Extract<
  NotionBlock,
  { type: "table_of_contents" }
>;

export type NotionChildPageBlock = Extract<NotionBlock, { type: "child_page" }>;

export type NotionEmbedBlock = Extract<NotionBlock, { type: "embed" }>;

export type NotionToggleBlock = Extract<NotionBlock, { type: "toggle" }>;

/* ----- Shared Types ----- */

// These are extracted from types above, but the objects are the same regardless
// of the type from which it is extracted.

export type NotionRichText = NotionParagraphBlock["paragraph"]["rich_text"][0];

export type NotionColor = NotionParagraphBlock["paragraph"]["color"];
