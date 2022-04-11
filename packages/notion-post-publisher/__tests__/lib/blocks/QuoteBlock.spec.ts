import { Block } from "../../../src/lib/Block";
import { QuoteBlock } from "../../../src/lib/blocks/QuoteBlock";
import {
  mockBulletedListItemBlock,
  mockParagraphBlock,
} from "../../../__mocks__";
import { mockQuoteBlock } from "../../../__mocks__/QuoteBlock.mock";

describe("QuoteBlock", () => {
  it("Renders a blockquote in markdown", () => {
    const data = mockQuoteBlock();
    const text = data.quote.rich_text[0].plain_text;
    const block = new QuoteBlock(data);
    const result = block.render();
    const expResult = `> ${text}`;
    expect(result).toBe(expResult);
  });
  it("Supports annotations", () => {
    const data = mockQuoteBlock({ richTextOptions: { bold: true } });
    const text = data.quote.rich_text[0].plain_text;
    const block = new QuoteBlock(data);
    const result = block.render();
    const expResult = `> **${text}**`;
    expect(result).toBe(expResult);
  });
  it("Renders children text", () => {
    const b = [
      mockParagraphBlock(),
      mockBulletedListItemBlock(),
      mockBulletedListItemBlock(),
    ];
    const data = mockQuoteBlock({ children: b });
    const block = new QuoteBlock(data);
    const result = block.render();
    const expText = `>\n> ${Block.create(b[0]).render()}\n>\n> ${Block.create(
      b[1]
    ).render()}\n> ${Block.create(b[2]).render()}`;
    expect(result).toContain(expText);
  });
});
