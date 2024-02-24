import prettier from "prettier";

import type { NotionEmbedBlock } from "../../types/notion";

export class EmbedBlock {
  domain: string;
  embedBlock?: TwitterEmbedBlock;

  constructor(params: NotionEmbedBlock) {
    this.domain = new URL(params.embed.url).hostname;
    if (this.domain in embedBlockMap) {
      this.embedBlock = new embedBlockMap[this.domain](params);
    }
  }

  // async prerender() {
  //   if (this.embedBlock && "prerender" in this.embedBlock) {
  //     await this.embedBlock.prerender();
  //   }
  // }

  render() {
    if (!this.embedBlock) {
      throw new Error(`Embed block not supported: ${this.domain}`);
    }
    return this.embedBlock.render();
  }
}

/* ----- Twitter ----- */

class TwitterEmbedBlock {
  id: string;
  url: string;

  constructor(params: NotionEmbedBlock) {
    this.url = params.embed.url;
    const matches = this.url.match(/\/status\/(?<id>\d+)/);
    const id = matches?.groups?.id;
    if (!id) {
      throw new Error(`Could not identify tweet ID from URL: ${this.url}`);
    }
    this.id = id;
  }

  render() {
    const output = `
      <blockquote class="twitter-tweet">
        <a href="https://twitter.com/username/status/${this.id}"></a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    `;
    return prettier.format(output, { parser: "html" });
  }
}

/* ----- Stackblitz ----- */

class StackblitzEmbedBlock {
  url: string;

  constructor(params: NotionEmbedBlock) {
    this.url = params.embed.url;
  }

  render() {
    return `{% code_playground url="${this.url}" %}`;
  }
}

/* ----- Mapper ----- */

const embedBlockMap: { [key: string]: any } = {
  "twitter.com": TwitterEmbedBlock,
  "stackblitz.com": StackblitzEmbedBlock,
};
