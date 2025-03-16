import { faker } from "@faker-js/faker";
import { NotionParagraphBlock } from "../src/types/notion";

// Note: NotionParagraphBlock['last_edited_by'] is a common user object shape
// with Notion.
export function mockUser(): NotionParagraphBlock["last_edited_by"] {
  return { object: "user", id: faker.string.uuid() };
}
