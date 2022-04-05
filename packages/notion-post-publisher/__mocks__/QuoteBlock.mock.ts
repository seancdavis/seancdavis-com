import { faker } from "@faker-js/faker";

import { NotionQuoteBlock } from "../src/types/notion";

import { mockRichText, RichTextMockOptions } from "./RichText.mock";
import { mockUser } from "./User.mock";

type QuoteBlockMockOptions = {
  richTextOptions?: RichTextMockOptions;
};

export function mockQuoteBlock({
  richTextOptions,
}: QuoteBlockMockOptions = {}): NotionQuoteBlock {
  const user = mockUser();

  return {
    object: "block",
    id: faker.datatype.uuid(),
    created_time: "2022-04-04T20:12:00.000Z",
    last_edited_time: "2022-04-04T21:02:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: false,
    archived: false,
    type: "quote",
    quote: {
      rich_text: [mockRichText(richTextOptions)],
      color: "gray_background",
    },
  };
}
