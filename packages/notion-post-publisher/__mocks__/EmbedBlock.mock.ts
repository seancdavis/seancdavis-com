import { faker } from "@faker-js/faker";

import { NotionEmbedBlock } from "../src/types/notion";

import { mockUser } from "./User.mock";

export function mockEmbedBlock(
  { url }: { url: string } = {
    url: "https://twitter.com/seancdavis29/status/1550468441533870080",
  }
): NotionEmbedBlock {
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
    type: "embed",
    embed: {
      caption: [], // Captions do nothing at the moment
      url,
    },
  };
}
