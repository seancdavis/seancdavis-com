import { renderRichText } from "../../src/utils/render-utils";
import { mockRichText } from "../../__mocks__/RichText.mock";

describe("renderRichText", () => {
  it("Renders plain text", () => {
    const richText = mockRichText();
    const plainText = richText.plain_text;
    expect(renderRichText([richText])).toEqual(plainText);
  });
  it("Joins multiple rich text objects", () => {
    const richTextArr = Array.from(Array(10).keys()).map(() => mockRichText());
    expect(renderRichText(richTextArr)).toEqual(
      richTextArr.map((rt) => rt.plain_text).join("")
    );
  });
  it("Supports bold", () => {
    const richText = mockRichText({ bold: true });
    const plainText = richText.plain_text;
    expect(renderRichText([richText])).toEqual(`**${plainText}**`);
  });
  it("Supports italic", () => {
    const richText = mockRichText({ italic: true });
    const plainText = richText.plain_text;
    expect(renderRichText([richText])).toEqual(`_${plainText}_`);
  });
  it("Supports code", () => {
    const richText = mockRichText({ code: true });
    const plainText = richText.plain_text;
    expect(renderRichText([richText])).toEqual(`\`${plainText}\``);
  });
  it("Supports combined annotations", () => {
    const richText = mockRichText({ bold: true, code: true });
    const plainText = richText.plain_text;
    expect(renderRichText([richText])).toEqual(`**\`${plainText}\`**`);
  });
});
