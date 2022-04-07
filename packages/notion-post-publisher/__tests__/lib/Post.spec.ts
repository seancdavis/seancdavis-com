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
    beforeEach(() => {
      mockedGetAllPageBlocks.mockResolvedValue(mockPageBlocksApiResponse());
      mockedGetPageProperties.mockResolvedValue(mockPagePropertiesResponse());
    });
    it("Throws an error when no title", async () => {
      mockedGetPageProperties.mockResolvedValue({
        ...mockPagePropertiesResponse(),
        title: "",
      });
      const errMessage = "Notion Page SOME_PAGE_ID is missing a title.";
      await expect(Post.create("SOME_PAGE_ID")).rejects.toThrow(errMessage);
    });
    it("Throws an error when no description", async () => {
      mockedGetPageProperties.mockResolvedValue({
        ...mockPagePropertiesResponse(),
        description: "",
      });
      const properties = await getPageProperties("");
      const errMessage = `${properties.title} is missing a description.`;
      await expect(Post.create("SOME_PAGE_ID")).rejects.toThrow(errMessage);
    });
    it("Throws an error when no content (empty array of blocks)", async () => {
      mockedGetAllPageBlocks.mockResolvedValue([]);
      const properties = await getPageProperties("");
      const errMessage = `${properties.title} is missing content.`;
      await expect(Post.create("SOME_PAGE_ID")).rejects.toThrow(errMessage);
    });
  });
});
