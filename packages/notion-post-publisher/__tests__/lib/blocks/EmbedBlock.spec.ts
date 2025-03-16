import prettier from "@prettier/sync";
import { mockEmbedBlock } from "../../../__mocks__/EmbedBlock.mock";
import { EmbedBlock } from "../../../src/lib/blocks/EmbedBlock";

describe("EmbedBlock", () => {
  it("throws an error when not supported", () => {
    const data = mockEmbedBlock({
      url: "https://github.com/seancdavis/seancdavis-com/",
    });
    const block = new EmbedBlock(data);
    expect(() => block.render()).toThrowError(
      `Embed block not supported: github.com`
    );
  });
  it("Supports twitter embeds", async () => {
    const data = mockEmbedBlock({
      url: "https://twitter.com/seancdavis29/status/1756294848431149188",
    });
    const block = new EmbedBlock(data);
    const result = block.render();
    expect(result).toBe(
      prettier.format(
        `<blockquote class="twitter-tweet">
          <a href="https://twitter.com/username/status/1756294848431149188"></a>
        </blockquote>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
        { parser: "html" }
      )
    );
  });
  it("Supports Stackblitz embeds", async () => {
    const url =
      "https://stackblitz.com/edit/nextjs-ehvtnq?ctl=1&embed=1&file=components/Link.jsx";
    const data = mockEmbedBlock({ url });
    const block = new EmbedBlock(data);
    const result = block.render();
    expect(result).toBe(`{% code_playground url="${url}" %}`);
  });
});
