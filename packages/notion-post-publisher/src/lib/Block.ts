import type {
  NotionBlock,
  NotionCodeBlock,
  NotionDividerBlock,
  NotionParagraphBlock,
  NotionVideoBlock,
  NotionHeading2Block,
} from "../types/notion";

import {
  CodeBlock,
  DividerBlock,
  Heading2Block,
  ParagraphBlock,
  VideoBlock,
} from "./blocks";

type SupportedNotionBlocks =
  | NotionCodeBlock
  | NotionDividerBlock
  | NotionHeading2Block
  | NotionParagraphBlock
  | NotionVideoBlock;

const BlockMap = {
  code: CodeBlock,
  divider: DividerBlock,
  heading_2: Heading2Block,
  paragraph: ParagraphBlock,
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
