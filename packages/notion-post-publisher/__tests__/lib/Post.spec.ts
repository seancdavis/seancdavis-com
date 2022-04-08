import fs from "fs";
import path from "path";
import { Post } from "../../src/lib/Post";
import {
  mockBulletedListItemBlock,
  mockNumberedListItemBlock,
  mockPageBlocksApiResponse,
  mockPagePropertiesResponse,
  mockParagraphBlock,
} from "../../__mocks__";
import {
  getAllPageBlocks,
  getPageProperties,
} from "../../src/utils/notion-utils";
import { Block } from "../../src/lib/Block";

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
  beforeEach(() => {
    mockedGetAllPageBlocks.mockResolvedValue(mockPageBlocksApiResponse());
    mockedGetPageProperties.mockResolvedValue(mockPagePropertiesResponse());
  });

  describe("[static] .create()", () => {
    it("Creates an instance of Post", async () => {
      const post = await Post.create("SOME_PAGE_ID");
      expect(post instanceof Post).toBeTruthy();
    });
    // This tests all attributes set in the constructor except the content,
    // which is tested below.
    it("Sets post attributes", async () => {
      mockedGetPageProperties.mockResolvedValue({
        ...mockPagePropertiesResponse(),
        title: "Hello World",
      });
      const post = await Post.create("SOME_PAGE_ID");
      const dateStr = new Date().toISOString().split("T")[0];
      const slug = "hello-world";
      const expFilename = `${dateStr}-${slug}.md`;
      expect(post.date).toEqual(dateStr);
      expect(post.slug).toEqual(slug);
      expect(post.url).toEqual(`https://www.seancdavis.com/posts/${slug}`);
      expect(post.title).toEqual("Hello World");
      expect(post.filename).toEqual(expFilename);
    });
    it("Sets post content", async () => {
      const blockResponse = await getAllPageBlocks("");
      const properties = await getPageProperties("");
      // Making an assumption here that each of the properties is populated.
      // These are set manually by the mock, so we can do this with confidence.
      const frontmatter = `---\ntitle: ${properties.title}\ndescription: ${
        properties.description
      }\ntags:${properties.tags!.map((t) => `\n  - ${t}`)}\ntweet: ${
        properties.tweet
      }\n---\n`;
      const blocks = blockResponse.map((b) => Block.create(b));
      // This assumes there are no list blocks, which we know based on the set
      // mock response.
      const body = blocks.map((b) => b.render()).join("\n\n") + "\n";
      const expContent = `${frontmatter}\n${body}`;
      const post = await Post.create("SOME_PAGE_ID");
      expect(post.content).toEqual(expContent);
    });
    it("Inserts single newlines between consecutive list items", async () => {
      const blocksResponse = [
        mockParagraphBlock(),
        mockBulletedListItemBlock(),
        mockBulletedListItemBlock(),
        mockNumberedListItemBlock(),
        mockNumberedListItemBlock(),
        mockParagraphBlock(),
      ];
      mockedGetAllPageBlocks.mockResolvedValue(blocksResponse);
      const b = blocksResponse.map((b) => Block.create(b).render());
      /**
       * Looks like this:
       *
       *  [paragraph]
       *
       *  - [bull]
       *  - [bull]
       *
       *  1. [num]
       *  1. [num]
       *
       *  [paragraph]
       *
       * Note: Prettier trims the double newline at the end.
       */
      const expBody = `${b[0]}\n\n${b[1]}\n${b[2]}\n\n${b[3]}\n${b[4]}\n\n${b[5]}\n`;
      const post = await Post.create("SOME_PAGE_ID");
      expect(post.content).toContain(expBody);
    });
  });

  describe(".validate()", () => {
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

  describe(".writeToFile()", () => {
    const postsDir = path.join(__dirname, "tmp");
    beforeEach(() => fs.mkdirSync(postsDir));
    afterEach(() => fs.rmSync(postsDir, { recursive: true, force: true }));
    it("Generates a file with post content", async () => {
      const post = await Post.create("");
      const filename = await post.writeToFile(postsDir);
      const content = fs.readFileSync(path.join(postsDir, filename)).toString();
      expect(content).toEqual(post.content);
    });
  });
});
