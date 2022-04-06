import { ParagraphBlock } from "../../../src/lib/blocks/ParagraphBlock";
import { mockParagraphBlock } from "../../../__mocks__/ParagraphBlock.mock";
import { mockRichText } from "../../../__mocks__/RichText.mock";

describe("ParagraphBlock", () => {
  it("Renders an paragraph in markdown", () => {
    const data = mockParagraphBlock();
    const text = data.paragraph.rich_text[0].plain_text;
    const block = new ParagraphBlock(data);
    const result = block.render();
    const expResult = `${text}\n`;
    expect(result).toBe(expResult);
  });
  it("Supports annotations", () => {
    const data = mockParagraphBlock({
      richText: [mockRichText({ bold: true })],
    });
    const text = data.paragraph.rich_text[0].plain_text;
    const block = new ParagraphBlock(data);
    const result = block.render();
    const expResult = `**${text}**\n`;
    expect(result).toBe(expResult);
  });
});
