import { BulletedListItemBlock } from "../BulletedListItemBlock";
import { BulletedListItemMock } from "../__mocks__/BulletedListItem.mock";

describe("BulletedListItemBlock", () => {
  it("Returns a list item", () => {
    const data = BulletedListItemMock();
    const text = data.bulleted_list_item.rich_text[0].plain_text;
    const block = new BulletedListItemBlock(data);
    const result = block.render();
    expect(result).toBe(`- ${text}\n`);
  });
});
