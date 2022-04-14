import { faker } from "@faker-js/faker";

import { NotionHeading3Block } from "../src/types/notion";

import { mockRichText, RichTextMockOptions } from "./RichText.mock";
import { mockUser } from "./User.mock";

type Heading3BlockMockOptions = {
  richTextOptions?: RichTextMockOptions;
};

export function mockHeading3Block({
  richTextOptions,
}: Heading3BlockMockOptions = {}): NotionHeading3Block {
  const user = mockUser();

  return {
    object: "block",
    id: faker.datatype.uuid(),
    created_time: "2022-04-04T19:49:00.000Z",
    last_edited_time: "2022-04-04T19:56:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: false,
    archived: false,
    type: "heading_3",
    heading_3: {
      rich_text: [mockRichText(richTextOptions)],
      color: "default",
    },
  };
}
