import type { NotionBlock } from "../src/types/notion";
import { faker } from "@faker-js/faker";
import { mockRichText, mockUser } from ".";

export function mockInvalidBlock(): NotionBlock {
  const user = mockUser();

  return {
    object: "block",
    id: faker.datatype.uuid(),
    created_time: "2022-04-06T09:24:00.000Z",
    last_edited_time: "2022-04-06T09:24:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: false,
    archived: false,
    type: "to_do",
    to_do: {
      rich_text: [mockRichText()],
      checked: false,
      color: "default",
    },
  };
}
