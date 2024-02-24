import { faker } from "@faker-js/faker";
import { mockParagraphBlock } from ".";
import type { NotionBlock } from "../src/types/notion";
import type { PostProperties } from "../src/types/post";

export function mockPageBlocksApiResponse(): NotionBlock[] {
  return [mockParagraphBlock(), mockParagraphBlock()];
}

export function mockPagePropertiesResponse(): PostProperties {
  return {
    // These are shorter so we don't have to account for newlines when testing
    // YAML conversion.
    title: faker.lorem.words(5),
    description: faker.lorem.words(5),
    tags: ["JavaScript"],
  };
}
