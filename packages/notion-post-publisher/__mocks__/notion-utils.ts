import type { NotionBlock } from "../src/types/notion";
import type { PostProperties } from "../src/types/post";
import { faker } from "@faker-js/faker";
import { mockParagraphBlock } from ".";

export function mockPageBlocksApiResponse(): NotionBlock[] {
  return [mockParagraphBlock(), mockParagraphBlock()];
}

export function mockPagePropertiesResponse(): PostProperties {
  return {
    title: faker.lorem.lines(1),
    description: faker.lorem.lines(1),
    tags: ["JavaScript"],
    tweet: faker.lorem.lines(1),
  };
}
