import { ToggleBlock } from "../../../src/lib/blocks/ToggleBlock";
import { mockToggleBlock } from "../../../__mocks__/ToggleBlock.mock";

describe("ToggleBlock", () => {
  it("Renders nothing", () => {
    const data = mockToggleBlock();
    const block = new ToggleBlock(data);
    const result = block.render();
    expect(result).toBeNull();
  });
});
