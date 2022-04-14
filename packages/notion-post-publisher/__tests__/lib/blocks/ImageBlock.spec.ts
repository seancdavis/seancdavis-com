import { format } from "date-fns";
import path from "path";
import { ImageBlock } from "../../../src/lib/blocks/ImageBlock";
import { NotionImageBlock } from "../../../src/types/notion";
import {
  mockExternalImage,
  mockFileImage,
} from "../../../__mocks__/ImageBlock.mock";

function getImageUrl(img: ReturnType<typeof mockExternalImage>): string {
  return img.image.type === "external"
    ? img.image.external.url
    : img.image.file.url;
}

async function renderBlock(
  data: NotionImageBlock = mockFileImage()
): Promise<{ data: NotionImageBlock; result: string; block: ImageBlock }> {
  const block = new ImageBlock(data);
  await block.prerender();
  const result = block.render();
  return { data, result, block };
}

describe("ImageBlock", () => {
  it("Renders a post_image shortcode for an uploaded image", async () => {
    const { block, result } = await renderBlock();
    const expResult = `{% post_image alt="${block.alt}", src="/${block.s3FilePath}" %}`;
    expect(result).toBe(expResult);
  });
  it("Uploads to a uploads/[date]/[filename] path on s3", async () => {
    const { data, block, result } = await renderBlock();
    const imageUrl = getImageUrl(data);
    const filename = path.basename(imageUrl).split("?")[0];
    const date = format(new Date(), "yyMMdd");
    const expS3Path = `/uploads/${date}/${filename}`;
    const expResult = `{% post_image alt="${block.alt}", src="${expS3Path}" %}`;
    expect(result).toBe(expResult);
  });
  it("Renders the alt tag from the Notion image caption", async () => {
    const { data, block, result } = await renderBlock();
    const alt = data.image.caption[0].plain_text;
    const expResult = `{% post_image alt="${alt}", src="/${block.s3FilePath}" %}`;
    expect(result).toBe(expResult);
  });
  it("Supports external images on Notion", async () => {
    const { block, result } = await renderBlock(mockExternalImage());
    const expResult = `{% post_image alt="${block.alt}", src="/${block.s3FilePath}" %}`;
    expect(result).toBe(expResult);
  });
  it("Will render a blank alt tag when there is no caption", async () => {
    const data = mockExternalImage({ caption: [] });
    const { block, result } = await renderBlock(data);
    const expResult = `{% post_image alt="", src="/${block.s3FilePath}" %}`;
    expect(result).toBe(expResult);
  });
  it("Throws an error if prerender was not called", async () => {
    const block = new ImageBlock(mockFileImage());
    expect(() => {
      block.render();
    }).toThrow("Image not uploaded. Must call prerender() first.");
  });
});
