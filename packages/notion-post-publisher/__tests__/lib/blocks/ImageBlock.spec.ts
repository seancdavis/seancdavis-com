import { ImageBlock } from "../../../src/lib/blocks/ImageBlock";
import {
  mockExternalImage,
  mockFileImage,
} from "../../../__mocks__/ImageBlock.mock";

function getImageUrl(img: ReturnType<typeof mockExternalImage>): string {
  return img.image.type === "external"
    ? img.image.external.url
    : img.image.file.url;
}

describe("ImageBlock", () => {
  // Also tests that it applies the caption as the alt attribute.
  it("Renders a post_image shortcode for an external image", () => {
    const data = mockExternalImage();
    const alt = data.image.caption[0].plain_text;
    const url = getImageUrl(data);
    const block = new ImageBlock(data);
    const result = block.render();
    const expResult = `{% post_image alt="${alt}", src="${url}" %}`;
    expect(result).toBe(expResult);
  });
  it("Renders a post_image shortcode for an uploaded image", () => {
    const data = mockFileImage();
    const alt = data.image.caption[0].plain_text;
    const url = getImageUrl(data);
    const block = new ImageBlock(data);
    const result = block.render();
    const expResult = `{% post_image alt="${alt}", src="${url}" %}`;
    expect(result).toBe(expResult);
  });
  it("Will render a blank alt tag", () => {
    const data = mockExternalImage({ caption: [] });
    const url = getImageUrl(data);
    const block = new ImageBlock(data);
    const result = block.render();
    const expResult = `{% post_image alt="", src="${url}" %}`;
    expect(result).toBe(expResult);
  });
});
