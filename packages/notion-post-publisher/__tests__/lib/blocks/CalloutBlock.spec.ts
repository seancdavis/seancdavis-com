import {
  CalloutBlock,
  CalloutTypeMap,
} from "../../../src/lib/blocks/CalloutBlock";
import {
  mockCalloutBlock,
  CalloutBlockMockOptions,
} from "../../../__mocks__/CalloutBlock.mock";

describe("CalloutBlock", () => {
  it("Renders a callout shortcode", () => {
    const data = mockCalloutBlock();
    const text = data.callout.rich_text[0].plain_text;
    const block = new CalloutBlock(data);
    const result = block.render();
    const expResult = `{% callout type="note" %}\n${text}\n{% endcallout %}`;
    expect(result).toBe(expResult);
  });
  // Default of "note" is tested above.
  for (const [icon, type] of Object.entries(CalloutTypeMap)) {
    const emoji = icon as CalloutBlockMockOptions["emoji"];
    it(`Supports ${type} type using the ${emoji} emoji`, () => {
      const data = mockCalloutBlock({ emoji });
      expect(new CalloutBlock(data).render()).toContain(` type="${type}" `);
    });
  }
  it("Supports annotations", () => {
    const data = mockCalloutBlock({ richTextOptions: { bold: true } });
    const text = data.callout.rich_text[0].plain_text;
    const block = new CalloutBlock(data);
    const result = block.render();
    const expResult = `{% callout type="note" %}\n**${text}**\n{% endcallout %}`;
    expect(result).toBe(expResult);
  });
});
