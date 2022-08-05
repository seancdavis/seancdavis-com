import { faker } from "@faker-js/faker";

import { NotionRichText } from "../src/types/notion";

export type RichTextMockOptions = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  text?: string;
  link?: null | { url: string };
};

export function mockRichText({
  bold = false,
  italic = false,
  code = false,
  text = faker.lorem.lines(1),
  link = null,
}: RichTextMockOptions = {}): NotionRichText {
  return {
    type: "text",
    text: { content: text, link },
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
