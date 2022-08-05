import { TableOfContentsBlock } from "../../../src/lib/blocks/TableOfContentsBlock";
import { mockTableOfContentsBlock } from "../../../__mocks__/TableOfContentsBlock.mock";

describe("TableOfContentsBlock", () => {
  it("Renders nothing", () => {
    const data = mockTableOfContentsBlock();
    const block = new TableOfContentsBlock(data);
    const result = block.render();
    expect(result).toBeNull();
  });
});
