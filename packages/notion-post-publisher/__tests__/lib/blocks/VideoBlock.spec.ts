import { VideoBlock } from "../../../src/lib/blocks/VideoBlock";
import { extractYouTubeId } from "../../../src/utils/url-utils";
import { mockVideoBlock } from "../../../__mocks__/VideoBlock.mock";

describe("VideoBlock", () => {
  it("Renders a callout shortcode", () => {
    const data = mockVideoBlock();
    // Get the URL from the mock.
    const url = data.video.type === "external" ? data.video.external.url : "";
    expect(url.length).toBeGreaterThan(0);
    const block = new VideoBlock(data);
    // Get the ID from the mock using the utility.
    const id = extractYouTubeId(url);
    expect(id).not.toBeNull();
    expect(block.youtubeId).toEqual(id);
    // Check render output
    const result = block.render();
    expect(result).toBe(`{% youtube_embed id="${id}" %}\n`);
  });
});
