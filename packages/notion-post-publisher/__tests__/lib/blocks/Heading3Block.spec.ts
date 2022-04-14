import { Heading3Block } from "../../../src/lib/blocks/Heading3Block";
import { mockHeading3Block } from "../../../__mocks__/Heading3Block.mock";

describe("Heading3Block", () => {
  it("Renders an <h3> in markdown", () => {
    const data = mockHeading3Block();
    const text = data.heading_3.rich_text[0].plain_text;
    const block = new Heading3Block(data);
    const result = block.render();
    const expResult = `### ${text}`;
    expect(result).toBe(expResult);
  });
  it("Supports annotations", () => {
    const data = mockHeading3Block({ richTextOptions: { bold: true } });
    const text = data.heading_3.rich_text[0].plain_text;
    const block = new Heading3Block(data);
    const result = block.render();
    const expResult = `### **${text}**`;
    expect(result).toBe(expResult);
  });
});
