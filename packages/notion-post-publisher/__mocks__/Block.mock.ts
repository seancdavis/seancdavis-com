import type { NotionBlock } from "../src/types/notion";
import { mockRichText } from "./RichText.mock";
import { mockUser } from "./User.mock";

export function mockInvalidBlock(): NotionBlock {
  const user = mockUser();

  return {
    object: "block",
    id: "4fef2d95-504b-4f2f-89b7-22cdd1990fcd",
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
