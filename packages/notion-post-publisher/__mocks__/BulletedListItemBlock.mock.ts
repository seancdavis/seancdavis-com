import { faker } from "@faker-js/faker";

import { NotionBulletedListItemBlock } from "../src/types/notion";

import { mockRichText, RichTextMockOptions } from "./RichText.mock";
import { mockUser } from "./User.mock";

type BulletedListItemBlockMockOptions = {
  richTextOptions?: RichTextMockOptions;
};

export function mockBulletedListItemBlock({
  richTextOptions,
}: BulletedListItemBlockMockOptions = {}): NotionBulletedListItemBlock {
  const user = mockUser();

  return {
    object: "block",
    id: faker.string.uuid(),
    created_time: "2022-04-03T11:58:00.000Z",
    last_edited_time: "2022-04-04T20:09:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: false,
    archived: false,
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [mockRichText(richTextOptions)],
      color: "default",
    },
    parent: {
      type: "page_id",
      page_id: faker.string.uuid(),
    },
    in_trash: false,
  };
}
