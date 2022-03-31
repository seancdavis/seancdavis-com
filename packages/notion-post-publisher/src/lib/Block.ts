import type { BlockObjectResponse } from "../types/notion";

import { DividerBlock, ParagraphBlock } from "./blocks";

type BlockType = "paragraph";

const BlockMap = {
  divider: DividerBlock,
  paragraph: ParagraphBlock,
};

function mapBlock(type: BlockType, params: BlockObjectResponse) {
  return new BlockMap[type](params as any);
}

export class Block {
  type: string;

  constructor(params: BlockObjectResponse) {
    this.type = params.type;

    if (Object.keys(BlockMap).includes(params.type)) {
      const type = params.type as BlockType;
      return mapBlock(type, params);
    }
  }

  render() {
    throw new Error(`Block not supported: ${this.type}`);
  }
}
