import type {
  NotionBlock,
  NotionBulletedListItemBlock,
  NotionCodeBlock,
  NotionDividerBlock,
  NotionHeading1Block,
  NotionHeading2Block,
  NotionHeading3Block,
  NotionNumberedListItemBlock,
  NotionParagraphBlock,
  NotionQuoteBlock,
  NotionVideoBlock,
} from "../types/notion";

import {
  BulletedListItemBlock,
  CodeBlock,
  DividerBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  NumberedListItemBlock,
  ParagraphBlock,
  QuoteBlock,
  VideoBlock,
} from "./blocks";

type SupportedNotionBlocks =
  | NotionBulletedListItemBlock
  | NotionCodeBlock
  | NotionDividerBlock
  | NotionHeading1Block
  | NotionHeading2Block
  | NotionHeading3Block
  | NotionNumberedListItemBlock
  | NotionParagraphBlock
  | NotionQuoteBlock
  | NotionVideoBlock;

const BlockMap = {
  bulleted_list_item: BulletedListItemBlock,
  code: CodeBlock,
  divider: DividerBlock,
  heading_1: Heading1Block,
  heading_2: Heading2Block,
  heading_3: Heading3Block,
  numbered_list_item: NumberedListItemBlock,
  paragraph: ParagraphBlock,
  quote: QuoteBlock,
  video: VideoBlock,
};

export class Block {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  render() {
    throw new Error(`Block not supported: ${this.type}`);
  }

  static create(params: NotionBlock) {
    // If the block is not supported, return an instance of this class, a
    // generic block which throws an error on render.
    if (!Object.keys(BlockMap).includes(params.type)) {
      return new Block(params.type);
    }
    // Otherwise, pick a block from the map and return a new instance of it.
    const blockParams = params as SupportedNotionBlocks;
    return new BlockMap[blockParams.type](blockParams as any);
  }
}
