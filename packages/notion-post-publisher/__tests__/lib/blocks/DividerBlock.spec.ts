import { DividerBlock } from "../../../src/lib/blocks/DividerBlock";
import { mockDividerBlock } from "../../../__mocks__/DividerBlock.mock";

describe("DividerBlock", () => {
  it("Renders a horizontal rule in markdown", () => {
    const data = mockDividerBlock();
    const block = new DividerBlock(data);
    const result = block.render();
    const expResult = `---\n`;
    expect(result).toBe(expResult);
  });
});
