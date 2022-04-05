import { faker } from "@faker-js/faker";

import { NotionBulletedListItemBlock } from "@/types/notion";

import { RichTextMock } from "./RichText.mock";
import { UserMock } from "./User.mock";

export function BulletedListItemMock(): NotionBulletedListItemBlock {
  const user = UserMock();

  return {
    object: "block",
    id: faker.datatype.uuid(),
    created_time: "2022-04-03T11:58:00.000Z",
    last_edited_time: "2022-04-04T20:09:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: false,
    archived: false,
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [RichTextMock()],
      color: "default",
    },
  };
}
