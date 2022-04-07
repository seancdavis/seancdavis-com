import { BulletedListItemBlock } from "../../../src/lib/blocks/BulletedListItemBlock";
import { mockBulletedListItemBlock } from "../../../__mocks__/BulletedListItemBlock.mock";

describe("BulletedListItemBlock", () => {
  it("Returns a list item", () => {
    const data = mockBulletedListItemBlock();
    const text = data.bulleted_list_item.rich_text[0].plain_text;
    const block = new BulletedListItemBlock(data);
    const result = block.render();
    expect(result).toBe(`- ${text}`);
  });
  it("Supports annotations", () => {
    const data = mockBulletedListItemBlock({ richTextOptions: { bold: true } });
    const text = data.bulleted_list_item.rich_text[0].plain_text;
    const block = new BulletedListItemBlock(data);
    const result = block.render();
    expect(result).toBe(`- **${text}**`);
  });
});
