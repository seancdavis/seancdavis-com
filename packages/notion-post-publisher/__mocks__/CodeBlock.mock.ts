import { faker } from "@faker-js/faker";

import { NotionCodeBlock, NotionRichText } from "../src/types/notion";

import { mockRichText, RichTextMockOptions } from "./RichText.mock";
import { mockUser } from "./User.mock";

type CodeBlockMockOptions = {
  richText?: NotionRichText[];
  language?: NotionCodeBlock["code"]["language"];
};

const jsFuncMock = [
  "function sayHello() {\n",
  '\tconsole.log("Hello")',
  "\n}",
].map((text) => mockRichText({ text }));

export function mockCodeBlock({
  richText = jsFuncMock,
  language = "javascript",
}: CodeBlockMockOptions = {}): NotionCodeBlock {
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
    type: "code",
    code: {
      caption: [],
      rich_text: richText,
      language,
    },
  };
}
