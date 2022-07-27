import { ChildPageBlock } from "../../../src/lib/blocks/ChildPageBlock";
import { mockChildPageBlock } from "../../../__mocks__/ChildPageBlock.mock";

describe("ChildPageBlock", () => {
  it("Renders nothing", () => {
    const data = mockChildPageBlock();
    const block = new ChildPageBlock(data);
    const result = block.render();
    expect(result).toBeNull();
  });
});
