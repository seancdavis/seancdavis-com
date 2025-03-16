import { faker } from "@faker-js/faker";

import {
  NotionBulletedListItemBlock,
  NotionParagraphBlock,
  NotionQuoteBlock,
} from "../src/types/notion";

import { mockRichText, RichTextMockOptions } from "./RichText.mock";
import { mockUser } from "./User.mock";

type QuoteBlockMockOptions = {
  richTextOptions?: RichTextMockOptions;
  children?: Array<NotionParagraphBlock | NotionBulletedListItemBlock>;
};

export function mockQuoteBlock({
  richTextOptions,
  children,
}: QuoteBlockMockOptions = {}): NotionQuoteBlock {
  const user = mockUser();
  let props: NotionQuoteBlock = {
    object: "block",
    id: faker.string.uuid(),
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
    parent: {
      type: "page_id",
      page_id: faker.string.uuid(),
    },
    in_trash: false,
  };

  if (children && children.length > 0) {
    props.has_children = true;
    props.children = children;
  }

  return props;
}
