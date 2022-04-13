import { getAllPageBlocks } from "../../src/utils/notion-utils";
import { mockParagraphBlock } from "../../__mocks__";

/**
 * What's happening here is a little goofy. Because getAllPageBlocks uses the
 * Notion SDK, I have to mock the necessary interactions with that library.
 *
 * const notion = new Client(...) will return an instance of MockNotionClient
 * below.
 *
 * This builds a simple object which will all for calling
 * notion.blocks.children.list(...), which calls list in the MockNotionClass
 * below.
 *
 * list() returns an object with a results property that is used by
 * getAllPageBlocks(). In it, it uses the results of listResponse(), a mock
 * function defined below.
 *
 * This enabled me to mock the response from list individually so that I can
 * create predictable responses and test applying children to parent blocks.
 *
 */

const listResponse = jest.fn();

jest.mock("@notionhq/client", () => {
  class MockNotionClient {
    blocks: any;
    constructor() {
      this.blocks = { children: { list: this.list } };
    }
    async list() {
      const results = await listResponse();
      return { results };
    }
  }

  return {
    Client: jest.fn().mockImplementation(() => new MockNotionClient()),
  };
});

const parentBlocks = [mockParagraphBlock({ hasChildren: true })];
const childBlocks = [mockParagraphBlock(), mockParagraphBlock()];

describe("getAllPageBlocks()", () => {
  beforeEach(() => {
    listResponse
      .mockResolvedValueOnce(parentBlocks)
      .mockResolvedValueOnce(childBlocks);
  });
  it("Automatically attaches children blocks", async () => {
    const blocksResponse = await getAllPageBlocks("");
    expect(blocksResponse[0].children).toEqual(childBlocks);
  });
});
