import { CodeBlock } from "../../../src/lib/blocks/CodeBlock";
import { NotionCodeBlock } from "../../../src/types/notion";
import { mockCodeBlock } from "../../../__mocks__/CodeBlock.mock";
import { mockRichText } from "../../../__mocks__/RichText.mock";

describe("CodeBlock", () => {
  // This also tests that `plain text` is mapped to `txt`.
  it("Renders a code block in markdown", () => {
    const data = mockCodeBlock({
      richText: [mockRichText({ text: "Hello World" })],
      language: "plain text",
    });
    const block = new CodeBlock(data);
    const result = block.render();
    const expResult = `\`\`\`txt\nHello World\n\`\`\``;
    expect(result).toBe(expResult);
  });
  // This also tests the lang map from `javascript` to `js`
  it("Supports multiple lines of code", () => {
    const data = mockCodeBlock({ language: "javascript" });
    const text = data.code.rich_text.map((rt) => rt.plain_text).join("");
    const block = new CodeBlock(data);
    const result = block.render();
    const expResult = `\`\`\`js\n${text}\n\`\`\``;
    expect(result).toBe(expResult);
  });
  test.each<{
    language: NotionCodeBlock["code"]["language"];
    codeLanguage: string;
  }>([
    { language: "plain text", codeLanguage: "txt" },
    { language: "typescript", codeLanguage: "ts" },
    { language: "javascript", codeLanguage: "js" },
    { language: "markdown", codeLanguage: "md" },
  ])('Maps "$language" to "$codeLanguage"', ({ language, codeLanguage }) => {
    const data = mockCodeBlock({ language });
    const text = data.code.rich_text.map((rt) => rt.plain_text).join("");
    const block = new CodeBlock(data);
    const result = block.render();
    const expResult = `\`\`\`${codeLanguage}\n${text}\n\`\`\``;
    expect(result).toBe(expResult);
  });
});
