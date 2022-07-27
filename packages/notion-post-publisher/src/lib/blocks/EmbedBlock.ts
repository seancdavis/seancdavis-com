import type { NotionEmbedBlock } from "../../types/notion";

const embedRenderers: { [key: string]: (url: string) => string } = {
  "twitter.com": (url: string) => {
    const matches = url.match(/\/status\/(?<id>\d+)/);
    const id = matches?.groups?.id;
    if (!id) throw new Error(`Could not identify tweet ID from URL: ${url}`);
    return `{% twitter_embed id="${id}" %}`;
  },
};

export class EmbedBlock {
  domain: string;
  url: string;

  constructor(params: NotionEmbedBlock) {
    this.domain = new URL(params.embed.url).hostname;
    this.url = params.embed.url;
  }

  render() {
    if (!(this.domain in embedRenderers)) {
      throw new Error(`Embed block domain ${this.domain} not supported.`);
    }
    return embedRenderers[this.domain](this.url);
  }
}
