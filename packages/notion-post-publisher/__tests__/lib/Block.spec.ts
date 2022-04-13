import { Block } from "../../src/lib/Block";
import {
  BulletedListItemBlock,
  CalloutBlock,
  CodeBlock,
  DividerBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  ImageBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  QuoteBlock,
  VideoBlock,
} from "../../src/lib/blocks";
import {
  mockInvalidBlock,
  mockBulletedListItemBlock,
  mockCalloutBlock,
  mockCodeBlock,
  mockDividerBlock,
  mockHeading1Block,
  mockHeading2Block,
  mockHeading3Block,
  mockNumberedListItemBlock,
  mockParagraphBlock,
  mockQuoteBlock,
  mockVideoBlock,
  mockFileImage,
} from "../../__mocks__";

const supportedBlocks = {
  bulleted_list_item: {
    mockFn: mockBulletedListItemBlock,
    type: BulletedListItemBlock,
  },
  callout: {
    mockFn: mockCalloutBlock,
    type: CalloutBlock,
  },
  code: {
    mockFn: mockCodeBlock,
    type: CodeBlock,
  },
  divider: {
    mockFn: mockDividerBlock,
    type: DividerBlock,
  },
  heading_1: {
    mockFn: mockHeading1Block,
    type: Heading1Block,
  },
  heading_2: {
    mockFn: mockHeading2Block,
    type: Heading2Block,
  },
  heading_3: {
    mockFn: mockHeading3Block,
    type: Heading3Block,
  },
  image: {
    mockFn: mockFileImage,
    type: ImageBlock,
  },
  numbered_list_item: {
    mockFn: mockNumberedListItemBlock,
    type: NumberedListItemBlock,
  },
  paragraph: {
    mockFn: mockParagraphBlock,
    type: ParagraphBlock,
  },
  quote: {
    mockFn: mockQuoteBlock,
    type: QuoteBlock,
  },
  video: {
    mockFn: mockVideoBlock,
    type: VideoBlock,
  },
};

describe("Block", () => {
  describe("[static] .create()", () => {
    it("returns an instance of Block when type is not supported", async () => {
      const params = mockInvalidBlock();
      const block = await Block.create(params);
      expect(block instanceof Block).toBeTruthy();
    });
    for (let [name, { mockFn, type }] of Object.entries(supportedBlocks)) {
      it(`Supports ${name}`, async () => {
        const block = await Block.create(mockFn());
        expect(block instanceof type).toBeTruthy();
      });
    }
  });
  describe(".render()", () => {
    it("Throws an error that block type is not supported.", async () => {
      const params = mockInvalidBlock();
      const block = await Block.create(params);
      expect(() => {
        block.render();
      }).toThrow(`Block not supported: ${params.type}`);
    });
  });
});
