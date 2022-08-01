import type {
  NotionBlock,
  NotionBulletedListItemBlock,
  NotionCalloutBlock,
  NotionChildPageBlock,
  NotionCodeBlock,
  NotionDividerBlock,
  NotionEmbedBlock,
  NotionHeading1Block,
  NotionHeading2Block,
  NotionHeading3Block,
  NotionImageBlock,
  NotionNumberedListItemBlock,
  NotionParagraphBlock,
  NotionQuoteBlock,
  NotionTableOfContentsBlock,
  NotionVideoBlock,
} from "../types/notion";

import {
  BulletedListItemBlock,
  CalloutBlock,
  ChildPageBlock,
  CodeBlock,
  DividerBlock,
  EmbedBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  ImageBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  QuoteBlock,
  TableOfContentsBlock,
  VideoBlock,
} from "./blocks";

type SupportedNotionBlocks =
  | NotionBulletedListItemBlock
  | NotionCalloutBlock
  | NotionChildPageBlock
  | NotionCodeBlock
  | NotionDividerBlock
  | NotionEmbedBlock
  | NotionHeading1Block
  | NotionHeading2Block
  | NotionHeading3Block
  | NotionImageBlock
  | NotionNumberedListItemBlock
  | NotionParagraphBlock
  | NotionQuoteBlock
  | NotionTableOfContentsBlock
  | NotionVideoBlock;

const BlockMap = {
  bulleted_list_item: BulletedListItemBlock,
  callout: CalloutBlock,
  child_page: ChildPageBlock,
  code: CodeBlock,
  divider: DividerBlock,
  embed: EmbedBlock,
  heading_1: Heading1Block,
  heading_2: Heading2Block,
  heading_3: Heading3Block,
  image: ImageBlock,
  numbered_list_item: NumberedListItemBlock,
  paragraph: ParagraphBlock,
  quote: QuoteBlock,
  table_of_contents: TableOfContentsBlock,
  video: VideoBlock,
};

export type CreatableBlock =
  | Block
  | BulletedListItemBlock
  | CalloutBlock
  | ChildPageBlock
  | CodeBlock
  | DividerBlock
  | EmbedBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | ImageBlock
  | NumberedListItemBlock
  | ParagraphBlock
  | QuoteBlock
  | TableOfContentsBlock
  | VideoBlock;

export class Block {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  render() {
    throw new Error(`Block not supported: ${this.type}`);
  }

  static async create(params: NotionBlock): Promise<CreatableBlock> {
    // If the block is not supported, return an instance of this class, a
    // generic block which throws an error on render.
    if (!Object.keys(BlockMap).includes(params.type)) {
      return new Block(params.type);
    }
    // Otherwise, pick a block from the map and return a new instance of it.
    const blockParams = params as SupportedNotionBlocks;
    const block = new BlockMap[blockParams.type](blockParams as any);
    // If prerender() exists on the block instance, run it.
    if ("prerender" in block) await block.prerender();
    // Return the block instance.
    return block;
  }
}
