import { faker } from "@faker-js/faker";
import { NotionParagraphBlock } from "@/types/notion";

// Note: NotionParagraphBlock['last_edited_by'] is a common user object shape
// with Notion.
export function UserMock(): NotionParagraphBlock["last_edited_by"] {
  return { object: "user", id: faker.datatype.uuid() };
}
