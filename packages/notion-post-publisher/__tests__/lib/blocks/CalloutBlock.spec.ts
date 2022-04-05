import { CalloutBlock } from "../../../src/lib/blocks/CalloutBlock";
import { mockCalloutBlock } from "../../../__mocks__/CalloutBlock.mock";

describe("CalloutBlock", () => {
  it("Returns a list item", () => {
    const data = mockCalloutBlock();
    const text = data.callout.rich_text[0].plain_text;
    const block = new CalloutBlock(data);
    const result = block.render();
    const expResult = `{% callout type="note" %}\n${text}\n{% endcallout %}\n`;
    expect(result).toBe(expResult);
  });
  it("Supports annotations", () => {
    const data = mockCalloutBlock({ richTextOptions: { bold: true } });
    const text = data.callout.rich_text[0].plain_text;
    const block = new CalloutBlock(data);
    const result = block.render();
    const expResult = `{% callout type="note" %}\n**${text}**\n{% endcallout %}\n`;
    expect(result).toBe(expResult);
  });
});
