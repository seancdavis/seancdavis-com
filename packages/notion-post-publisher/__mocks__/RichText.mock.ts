import { faker } from "@faker-js/faker";

import { NotionRichText } from "../src/types/notion";

export function RichTextMock(): NotionRichText {
  const text = faker.lorem.lines(1);

  return {
    type: "text",
    text: { content: text, link: null },
    annotations: {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: "default",
    },
    plain_text: text,
    href: null,
  };
}
