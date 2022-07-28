import { EmbedBlock } from "../../../src/lib/blocks/EmbedBlock";
import prettier from "prettier";
import { mockEmbedBlock } from "../../../__mocks__/EmbedBlock.mock";

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
      url: "https://twitter.com/seancdavis29/status/1550468441533870080",
    });
    const block = new EmbedBlock(data);
    await block.prerender();
    const result = block.render();
    expect(result).toBe(
      prettier.format(
        `<blockquote class="twitter-tweet">
      <p lang="en" dir="ltr">
        Every time I get close to wrapping up a project working with a new designer,
        I’m reminded of the benefit of considering extremes early on. We require so
        much flexibility and variability today that it’s impossible to capture a
        single, idealistic design. https://t.co/qTphiBEbNf
      </p>
      &mdash; Sean C Davis (@seancdavis29)
      <a href="https://twitter.com/seancdavis29/status/1550468441533870080"
        >July 22, 2022</a
      >
      </blockquote>
      <script
      async
      src="https://platform.twitter.com/widgets.js"
      charset="utf-8"
      ></script>`,
        { parser: "html" }
      )
    );
  });
});
