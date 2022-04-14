import { Heading1Block } from "../../../src/lib/blocks/Heading1Block";
import { mockHeading1Block } from "../../../__mocks__/Heading1Block.mock";

describe("Heading1Block", () => {
  it("Renders an <h1> in markdown", () => {
    const data = mockHeading1Block();
    const text = data.heading_1.rich_text[0].plain_text;
    const block = new Heading1Block(data);
    const result = block.render();
    const expResult = `# ${text}`;
    expect(result).toBe(expResult);
  });
  it("Supports annotations", () => {
    const data = mockHeading1Block({ richTextOptions: { bold: true } });
    const text = data.heading_1.rich_text[0].plain_text;
    const block = new Heading1Block(data);
    const result = block.render();
    const expResult = `# **${text}**`;
    expect(result).toBe(expResult);
  });
});
