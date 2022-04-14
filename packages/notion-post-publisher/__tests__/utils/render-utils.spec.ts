import { Block, CreatableBlock } from "../../src/lib/Block";
import { renderRichText, trailingNewlines } from "../../src/utils/render-utils";
import {
  mockBulletedListItemBlock,
  mockNumberedListItemBlock,
  mockParagraphBlock,
} from "../../__mocks__";
import { mockRichText } from "../../__mocks__/RichText.mock";

describe("renderRichText", () => {
  it("Renders plain text", () => {
    const richText = mockRichText();
    const plainText = richText.plain_text;
    expect(renderRichText([richText])).toEqual(plainText);
  });
  it("Joins multiple rich text objects", () => {
    const richTextArr = Array.from(Array(10).keys()).map(() => mockRichText());
    expect(renderRichText(richTextArr)).toEqual(
      richTextArr.map((rt) => rt.plain_text).join("")
    );
  });
  it("Supports bold", () => {
    const richText = mockRichText({ bold: true });
    const plainText = richText.plain_text;
    expect(renderRichText([richText])).toEqual(`**${plainText}**`);
  });
  it("Supports italic", () => {
    const richText = mockRichText({ italic: true });
    const plainText = richText.plain_text;
    expect(renderRichText([richText])).toEqual(`_${plainText}_`);
  });
  it("Supports code", () => {
    const richText = mockRichText({ code: true });
    const plainText = richText.plain_text;
    expect(renderRichText([richText])).toEqual(`\`${plainText}\``);
  });
  it("Supports combined annotations", () => {
    const richText = mockRichText({ bold: true, code: true });
    const plainText = richText.plain_text;
    expect(renderRichText([richText])).toEqual(`**\`${plainText}\`**`);
  });
});

describe("trailingNewlines()", () => {
  let blocks: CreatableBlock[] = [];

  beforeEach(async () => {
    const blockData = [
      mockParagraphBlock(),
      mockBulletedListItemBlock(),
      mockBulletedListItemBlock(),
      mockNumberedListItemBlock(),
      mockNumberedListItemBlock(),
      mockParagraphBlock(),
    ];
    for (const data of blockData) {
      const block = await Block.create(data);
      blocks.push(block);
    }
  });
  afterEach(() => {
    blocks = [];
  });
  it("Returns two newlines after paragraphs", () => {
    expect(trailingNewlines(blocks, 0)).toEqual("\n\n");
  });
  it("Returns a single newline after list items when there is another item", () => {
    expect(trailingNewlines(blocks, 1)).toEqual("\n");
    expect(trailingNewlines(blocks, 3)).toEqual("\n");
  });
  it("Returns two newlines after the last item in the list", () => {
    expect(trailingNewlines(blocks, 2)).toEqual("\n\n");
    expect(trailingNewlines(blocks, 4)).toEqual("\n\n");
  });
  it("Returns a single newline after the last item", () => {
    expect(trailingNewlines(blocks, 5)).toEqual("\n");
  });
});
