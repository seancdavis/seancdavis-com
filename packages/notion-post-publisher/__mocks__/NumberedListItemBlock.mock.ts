import { faker } from "@faker-js/faker";

import { NotionNumberedListItemBlock } from "../src/types/notion";

import { mockRichText, RichTextMockOptions } from "./RichText.mock";
import { mockUser } from "./User.mock";

type NumberedListItemBlockMockOptions = {
  richTextOptions?: RichTextMockOptions;
};

export function mockNumberedListItemBlock({
  richTextOptions,
}: NumberedListItemBlockMockOptions = {}): NotionNumberedListItemBlock {
  const user = mockUser();

  return {
    object: "block",
    id: faker.datatype.uuid(),
    created_time: "2022-04-03T11:58:00.000Z",
    last_edited_time: "2022-04-04T20:09:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: false,
    archived: false,
    type: "numbered_list_item",
    numbered_list_item: {
      rich_text: [mockRichText(richTextOptions)],
      color: "default",
    },
  };
}
