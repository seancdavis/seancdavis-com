import { faker } from "@faker-js/faker";

import { NotionParagraphBlock, NotionRichText } from "../src/types/notion";

import { mockRichText } from "./RichText.mock";
import { mockUser } from "./User.mock";

type ParagraphBlockMockOptions = {
  richText?: NotionRichText[];
  hasChildren?: boolean;
};

export function mockParagraphBlock({
  richText = [mockRichText()],
  hasChildren = false,
}: ParagraphBlockMockOptions = {}): NotionParagraphBlock {
  const user = mockUser();

  return {
    object: "block",
    id: faker.string.uuid(),
    created_time: "2022-04-04T19:49:00.000Z",
    last_edited_time: "2022-04-04T19:56:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: hasChildren,
    archived: false,
    type: "paragraph",
    paragraph: {
      rich_text: richText,
      color: "default",
    },
    parent: {
      type: "page_id",
      page_id: faker.string.uuid(),
    },
    in_trash: false,
  };
}
