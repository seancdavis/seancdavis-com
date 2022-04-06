import { NumberedListItemBlock } from "../../../src/lib/blocks/NumberedListItemBlock";
import { mockNumberedListItemBlock } from "../../../__mocks__/NumberedListItemBlock.mock";

describe("NumberedListItemBlock", () => {
  it("Returns an ordered list item", () => {
    const data = mockNumberedListItemBlock();
    const text = data.numbered_list_item.rich_text[0].plain_text;
    const block = new NumberedListItemBlock(data);
    const result = block.render();
    expect(result).toBe(`1. ${text}\n`);
  });
  it("Supports annotations", () => {
    const data = mockNumberedListItemBlock({ richTextOptions: { bold: true } });
    const text = data.numbered_list_item.rich_text[0].plain_text;
    const block = new NumberedListItemBlock(data);
    const result = block.render();
    expect(result).toBe(`1. **${text}**\n`);
  });
});
