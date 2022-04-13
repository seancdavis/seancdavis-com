import { Block, CreatableBlock } from "../../../src/lib/Block";
import { QuoteBlock } from "../../../src/lib/blocks/QuoteBlock";
import { NotionQuoteBlock } from "../../../src/types/notion";
import {
  mockBulletedListItemBlock,
  mockParagraphBlock,
} from "../../../__mocks__";
import { mockQuoteBlock } from "../../../__mocks__/QuoteBlock.mock";

async function renderBlock(
  data: NotionQuoteBlock = mockQuoteBlock()
): Promise<{ data: NotionQuoteBlock; result: string; block: QuoteBlock }> {
  const block = new QuoteBlock(data);
  await block.prerender();
  const result = block.render();
  return { data, result, block };
}

describe("QuoteBlock", () => {
  it("Renders a blockquote in markdown", async () => {
    const { data, result } = await renderBlock();
    expect(result).toBe(`> ${data.quote.rich_text[0].plain_text}`);
  });
  it("Supports annotations", async () => {
    const data = mockQuoteBlock({ richTextOptions: { bold: true } });
    const { result } = await renderBlock(data);
    expect(result).toBe(`> **${data.quote.rich_text[0].plain_text}**`);
  });
  it("Renders children text", async () => {
    const childBlockData = [
      mockParagraphBlock(),
      mockBulletedListItemBlock(),
      mockBulletedListItemBlock(),
    ];
    const data = mockQuoteBlock({ children: childBlockData });
    const { result } = await renderBlock(data);
    let b: CreatableBlock[] = [];
    for (const child of childBlockData) {
      const block = await Block.create(child);
      b.push(block);
      if ("prerender" in block) await block.prerender();
    }
    const expText = `>\n> ${b[0].render()}\n>\n> ${b[1].render()}\n> ${b[2].render()}`;
    expect(result).toContain(expText);
  });
  it("Throws an error if prerender was not called", async () => {
    const block = new QuoteBlock(mockQuoteBlock());
    expect(() => {
      block.render();
    }).toThrow("Children have not been processed. Call prerender() first.");
  });
});
