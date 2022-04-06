import { Post } from "../../src/lib/Post";
import {
  mockPageBlocksApiResponse,
  mockPagePropertiesResponse,
} from "../../__mocks__";
import {
  getAllPageBlocks,
  getPageProperties,
} from "../../src/utils/notion-utils";

jest.mock("../../src/utils/notion-utils", () => {
  // mockedGetAllPageBlocks.mockResolvedValue(mockPageBlocksApiResponse());
  return {
    getAllPageBlocks: async () => mockPageBlocksApiResponse(),
    getPageProperties: async () => mockPagePropertiesResponse(),
  };
});
// jest.mock("getPageProperties");
// const mockedGetAllPageBlocks = notionUtils.getAllPageBlocks as jest.MockedFn<
//   typeof notionUtils.getAllPageBlocks
// >;
// const mockedGetPageProperties = notionUtils.getPageProperties as jest.Mocked<
//   typeof notionUtils.getPageProperties
// >;

// mockedGetAllPageBlocks.mockResolvedValue(mockPageBlocksApiResponse());

describe("Post", () => {
  describe("[static] .create()", () => {
    it("Creates an instance of Post", async () => {
      const post = await Post.create("SOME_PAGE_ID");
      expect(post instanceof Post).toBeTruthy();
    });
  });
  describe(".validate()", () => {
    it("Throws an error when no title", async () => {
      const post = await Post.create("SOME_PAGE_ID");
      // expect(post instanceof Post).toBeTruthy();
      console.log(post.properties.title);
    });
  });
});
