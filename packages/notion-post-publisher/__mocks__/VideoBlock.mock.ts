import { faker } from "@faker-js/faker";

import { NotionVideoBlock } from "../src/types/notion";

import { mockUser } from "./User.mock";

export function mockVideoBlock(): NotionVideoBlock {
  const user = mockUser();

  return {
    object: "block",
    id: faker.string.uuid(),
    created_time: "2022-04-04T20:13:00.000Z",
    last_edited_time: "2022-04-04T20:13:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: false,
    archived: false,
    type: "video",
    video: {
      caption: [],
      type: "external",
      external: { url: "https://youtu.be/FFBMgrAa6bs" },
    },
    parent: {
      type: "page_id",
      page_id: faker.string.uuid(),
    },
    in_trash: false,
  };
}
