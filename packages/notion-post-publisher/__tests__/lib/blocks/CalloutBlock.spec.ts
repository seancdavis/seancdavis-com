import {
  CalloutBlock,
  CalloutTypeMap,
} from "../../../src/lib/blocks/CalloutBlock";
import { NotionCalloutBlock } from "../../../src/types/notion";
import { mockParagraphBlock } from "../../../__mocks__";
import {
  mockCalloutBlock,
  CalloutBlockMockOptions,
} from "../../../__mocks__/CalloutBlock.mock";

async function renderBlock(
  data: NotionCalloutBlock = mockCalloutBlock()
): Promise<{ data: NotionCalloutBlock; result: string; block: CalloutBlock }> {
  const block = new CalloutBlock(data);
  await block.prerender();
  const result = block.render();
  return { data, result, block };
}

describe("CalloutBlock", () => {
  it("Renders a callout shortcode", async () => {
    const { data, result } = await renderBlock();
    const text = data.callout.rich_text[0].plain_text;
    const expResult = `{% callout type="note" %}\n${text}\n{% endcallout %}`;
    expect(result).toBe(expResult);
  });
  // Default of "note" is tested above.
  for (const [icon, type] of Object.entries(CalloutTypeMap)) {
    const emoji = icon as CalloutBlockMockOptions["emoji"];
    it(`Supports ${type} type using the ${emoji} emoji`, async () => {
      const data = mockCalloutBlock({ emoji });
      const { result } = await renderBlock(data);
      expect(result).toContain(` type="${type}" `);
    });
  }
  it("Supports annotations", async () => {
    const data = mockCalloutBlock({ richTextOptions: { bold: true } });
    const { result } = await renderBlock(data);
    const text = data.callout.rich_text[0].plain_text;
    const expResult = `{% callout type="note" %}\n**${text}**\n{% endcallout %}`;
    expect(result).toBe(expResult);
  });
  it("Renders children text", async () => {
    const childBlock = mockParagraphBlock();
    const data = mockCalloutBlock({ children: [childBlock] });
    const { result } = await renderBlock(data);
    expect(result).toContain(childBlock.paragraph.rich_text[0].plain_text);
  });
  it("Throws an error if prerender was not called", async () => {
    const block = new CalloutBlock(mockCalloutBlock());
    expect(() => {
      block.render();
    }).toThrow("Children have not been processed. Call prerender() first.");
  });
});
