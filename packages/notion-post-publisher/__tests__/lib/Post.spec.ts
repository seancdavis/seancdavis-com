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
  return { getAllPageBlocks: jest.fn(), getPageProperties: jest.fn() };
});

const mockedGetAllPageBlocks = getAllPageBlocks as jest.MockedFn<
  typeof getAllPageBlocks
>;
const mockedGetPageProperties = getPageProperties as jest.MockedFn<
  typeof getPageProperties
>;

describe("Post", () => {
  describe("[static] .create()", () => {
    it("Creates an instance of Post", async () => {
      mockedGetAllPageBlocks.mockResolvedValue(mockPageBlocksApiResponse());
      mockedGetPageProperties.mockResolvedValue(mockPagePropertiesResponse());
      const post = await Post.create("SOME_PAGE_ID");
      expect(post instanceof Post).toBeTruthy();
    });
  });
  describe(".validate()", () => {
    it("Throws an error when no title", async () => {
      mockedGetAllPageBlocks.mockResolvedValue(mockPageBlocksApiResponse());
      mockedGetPageProperties.mockResolvedValue({
        ...mockPagePropertiesResponse(),
        title: "",
      });
      const post = await Post.create("SOME_PAGE_ID");
      expect(post).rejects.toEqual(
        "Notion Page SOME_PAGE_ID is missing a title."
      );
    });
  });
});
