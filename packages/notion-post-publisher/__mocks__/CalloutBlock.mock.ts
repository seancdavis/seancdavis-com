import { faker } from "@faker-js/faker";

import { NotionCalloutBlock, NotionParagraphBlock } from "../src/types/notion";

import { mockRichText, RichTextMockOptions } from ".";
import { mockUser } from "./User.mock";

export type CalloutBlockMockOptions = {
  richTextOptions?: RichTextMockOptions;
  emoji?: "⚠️" | "⚡" | "📋" | "💡" | "😊";
  children?: Array<NotionParagraphBlock>;
};

export function mockCalloutBlock({
  richTextOptions,
  emoji = "😊",
  children,
}: CalloutBlockMockOptions = {}): NotionCalloutBlock {
  const user = mockUser();
  let props: NotionCalloutBlock = {
    object: "block",
    id: faker.string.uuid(),
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
    parent: {
      type: "page_id",
      page_id: faker.string.uuid(),
    },
    in_trash: false,
  };

  if (children && children.length > 0) {
    props.has_children = true;
    props.children = children;
  }

  return props;
}
