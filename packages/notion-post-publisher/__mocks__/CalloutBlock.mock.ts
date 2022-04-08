import { faker } from "@faker-js/faker";

import { NotionCalloutBlock } from "../src/types/notion";

import { mockRichText, RichTextMockOptions } from "./RichText.mock";
import { mockUser } from "./User.mock";

export type CalloutBlockMockOptions = {
  richTextOptions?: RichTextMockOptions;
  emoji?: "⚠️" | "⚡" | "📋" | "💡" | "😊";
};

export function mockCalloutBlock({
  richTextOptions,
  emoji = "😊",
}: CalloutBlockMockOptions = {}): NotionCalloutBlock {
  const user = mockUser();

  return {
    object: "block",
    id: faker.datatype.uuid(),
    created_time: "2022-04-04T20:12:00.000Z",
    last_edited_time: "2022-04-04T21:02:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: false,
    archived: false,
    type: "callout",
    callout: {
      rich_text: [mockRichText(richTextOptions)],
      icon: { type: "emoji", emoji },
      color: "gray_background",
    },
  };
}
