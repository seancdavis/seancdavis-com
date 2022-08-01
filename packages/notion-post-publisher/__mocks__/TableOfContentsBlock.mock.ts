import { faker } from "@faker-js/faker";

import { NotionTableOfContentsBlock } from "../src/types/notion";

import { mockUser } from "./User.mock";

export function mockTableOfContentsBlock(): NotionTableOfContentsBlock {
  const user = mockUser();

  return {
    object: "block",
    id: faker.datatype.uuid(),
    created_time: "2022-04-04T19:49:00.000Z",
    last_edited_time: "2022-04-04T19:50:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: false,
    archived: false,
    type: "table_of_contents",
    table_of_contents: { color: "gray" },
  };
}
