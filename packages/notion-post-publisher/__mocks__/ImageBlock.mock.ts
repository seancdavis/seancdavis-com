import { faker } from "@faker-js/faker";

import { NotionImageBlock } from "../src/types/notion";

import { mockUser } from "./User.mock";

type ImageBlockMockOptions = {
  caption?: NotionImageBlock["image"]["caption"];
};

function mockGenericImage(): Omit<NotionImageBlock, "image"> {
  const user = mockUser();

  return {
    object: "block",
    id: faker.datatype.uuid(),
    created_time: "2022-04-04T20:14:00.000Z",
    last_edited_time: "2022-04-04T20:24:00.000Z",
    created_by: user,
    last_edited_by: user,
    has_children: false,
    archived: false,
    type: "image",
  };
}

export function mockExternalImage({
  caption = [mockImageCaption(faker.lorem.lines(1))],
}: ImageBlockMockOptions = {}): NotionImageBlock {
  const image: Extract<NotionImageBlock["image"], { external: {} }> = {
    type: "external",
    caption,
    external: {
      url: "https://images.unsplash.com/photo-1649020696118-0dbd7f765076?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
  };

  return {
    ...mockGenericImage(),
    image,
  };
}

export function mockFileImage({
  caption = [mockImageCaption(faker.lorem.lines(1))],
}: ImageBlockMockOptions = {}): NotionImageBlock {
  const image: Extract<NotionImageBlock["image"], { file: {} }> = {
    type: "file",
    caption,
    file: {
      url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/caa43a49-f8ff-4420-ba5a-b57b45babe63/marek-piwnicki-leLMngQNwaU-unsplash.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220405%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220405T104427Z&X-Amz-Expires=3600&X-Amz-Signature=f7eb5de3955766cc9e8705150323c586c78b850fd73a190baaf4cf70847c13c7&X-Amz-SignedHeaders=host&x-id=GetObject",
      expiry_time: "2022-04-05T11:44:27.711Z",
    },
  };

  return {
    ...mockGenericImage(),
    image,
  };
}

export function mockImageCaption(
  text: string
): NotionImageBlock["image"]["caption"][0] {
  return {
    type: "text",
    text: { content: text, link: null },
    annotations: {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: "default",
    },
    plain_text: text,
    href: null,
  };
}
