import { faker } from "@faker-js/faker";

import { NotionDividerBlock } from "../src/types/notion";

import { mockUser } from "./User.mock";

export function mockDividerBlock(): NotionDividerBlock {
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
    type: "divider",
    divider: {},
  };
}
