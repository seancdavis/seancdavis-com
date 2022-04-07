import { QuoteBlock } from "../../../src/lib/blocks/QuoteBlock";
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
});
