import type { NotionEmbedBlock } from "../../types/notion";

// TODO: This was a simple attempt beyond fetching from the Twitter API here.
// But it's going to be much easier than trying to make all the rendering in the
// website async.
//
// This might be a better lib to use:
// https://github.com/twitterdev/twitter-api-typescript-sdk
//
// Previously, I left it at trying to determine the right project to use in the
// developer portal. I created another one
// (https://developer.twitter.com/en/portal/apps/24977852/settings) but thinking
// I should delete it in favor of the production app
// (https://developer.twitter.com/en/portal/projects/1453386255044075524/apps/23588172/settings).
//
// However, I have to make sure that the tweet publisher script still works in
// the www project.

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
