import { Heading2Block } from "../../../src/lib/blocks/Heading2Block";
import { mockHeading2Block } from "../../../__mocks__/Heading2Block.mock";

describe("Heading2Block", () => {
  it("Renders an <h2> in markdown", () => {
    const data = mockHeading2Block();
    const text = data.heading_2.rich_text[0].plain_text;
    const block = new Heading2Block(data);
    const result = block.render();
    const expResult = `## ${text}`;
    expect(result).toBe(expResult);
  });
  it("Supports annotations", () => {
    const data = mockHeading2Block({ richTextOptions: { bold: true } });
    const text = data.heading_2.rich_text[0].plain_text;
    const block = new Heading2Block(data);
    const result = block.render();
    const expResult = `## **${text}**`;
    expect(result).toBe(expResult);
  });
});
