import { faker } from "@faker-js/faker";

import { NotionRichText } from "../src/types/notion";

export type RichTextMockOptions = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
};

export function mockRichText({
  bold = false,
  italic = false,
  code = false,
}: RichTextMockOptions = {}): NotionRichText {
  const text = faker.lorem.lines(1);

  return {
    type: "text",
    text: { content: text, link: null },
    annotations: {
      bold,
      italic,
      code,
      // These are not supported in the rich text processor yet.
      strikethrough: false,
      underline: false,
      color: "default",
    },
    plain_text: text,
    href: null,
  };
}
