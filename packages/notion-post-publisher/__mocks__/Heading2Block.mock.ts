import { faker } from "@faker-js/faker";

import { NotionHeading2Block } from "../src/types/notion";

import { mockRichText, RichTextMockOptions } from "./RichText.mock";
import { mockUser } from "./User.mock";

type Heading2BlockMockOptions = {
  richTextOptions?: RichTextMockOptions;
};

export function mockHeading2Block({
  richTextOptions,
}: Heading2BlockMockOptions = {}): NotionHeading2Block {
  const user = mockUser();

  return {
    object: "block",
    id: faker.string.uuid(),
    created_time: "2022-04-04T19:49:00.000Z",
    last_edited_time: "2022-04-04T19:56:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: false,
    archived: false,
    type: "heading_2",
    heading_2: {
      rich_text: [mockRichText(richTextOptions)],
      color: "default",
      is_toggleable: false,
    },
    parent: {
      type: "page_id",
      page_id: faker.string.uuid(),
    },
    in_trash: false,
  };
}
