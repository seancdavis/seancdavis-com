import type { NotionBlock } from "../types/notion";
import { logger } from "../utils/logger-utils";

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
  ToggleBlock,
  VideoBlock,
} from "./blocks";

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
  toggle: ToggleBlock,
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
  | ToggleBlock
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
    logger.debug(`Creating block: ${params.type}`);
    // If the block is not supported, return an instance of this class, a
    // generic block which throws an error on render.
    if (!Object.keys(BlockMap).includes(params.type)) {
      return new Block(params.type);
    }
    // Otherwise, pick a block from the map and return a new instance of it.
    const blockType = params.type as keyof typeof BlockMap;
    const block = new BlockMap[blockType](blockType as any);
    // If prerender() exists on the block instance, run it.
    if ("prerender" in block) await block.prerender();
    // Return the block instance.
    return block;
  }
}
