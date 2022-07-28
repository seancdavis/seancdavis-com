import { Client } from "twitter-api-sdk";
import { format as formatDate } from "date-fns";
import prettier from "prettier";

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

// const embedRenderers: { [key: string]: (url: string) => string } = {
//   "twitter.com": (url: string) => {
//     // const matches = url.match(/\/status\/(?<id>\d+)/);
//     // const id = matches?.groups?.id;
//     // if (!id) throw new Error(`Could not identify tweet ID from URL: ${url}`);
//     // return `{% twitter_embed id="${id}" %}`;
//   },
// };

export class EmbedBlock {
  domain: string;
  embedBlock?: TwitterEmbedBlock;
  // url: string;

  constructor(params: NotionEmbedBlock) {
    this.domain = new URL(params.embed.url).hostname;
    // this.url = params.embed.url;
    if (this.domain in embedBlockMap) {
      this.embedBlock = new embedBlockMap[this.domain](params);
    }
  }

  async prerender() {
    if (this.embedBlock && "prerender" in this.embedBlock) {
      await this.embedBlock.prerender();
    }
  }

  render() {
    if (!this.embedBlock) {
      throw new Error(`Embed block not supported: ${this.domain}`);
    }
    return this.embedBlock.render();
    // if (!(this.domain in embedRenderers)) {
    //   throw new Error(`Embed block domain ${this.domain} not supported.`);
    // }
    // return embedRenderers[this.domain](this.url);
  }
}

/* ----- Twitter ----- */

class TwitterEmbedBlock {
  id: string;
  url: string;
  tweet?: {
    created_at: Date;
    text: string;
    author: {
      name: string;
      username: string;
    };
  };

  constructor(params: NotionEmbedBlock) {
    this.url = params.embed.url;
    const matches = this.url.match(/\/status\/(?<id>\d+)/);
    const id = matches?.groups?.id;
    if (!id) {
      throw new Error(`Could not identify tweet ID from URL: ${this.url}`);
    }
    this.id = id;
  }

  async prerender() {
    const client = new Client(process.env.TWITTER_BEARER_TOKEN!);
    const tweet = await client.tweets.findTweetById(this.id, {
      "tweet.fields": ["created_at", "text", "author_id"],
    });
    if (
      !tweet.data?.author_id ||
      !tweet.data?.created_at ||
      !tweet.data?.text
    ) {
      throw new Error(
        `Could not find appropriate attributes for tweet: ${this.id}`
      );
    }
    const author = await client.users.findUserById(tweet.data.author_id, {
      "user.fields": ["name", "username"],
    });
    if (!author.data?.name || !author.data?.username) {
      throw new Error(
        `Could not find appropriate attributes for author: ${tweet.data.author_id}`
      );
    }
    this.tweet = {
      created_at: new Date(tweet.data.created_at),
      text: tweet.data.text,
      author: {
        name: author.data.name,
        username: author.data.username,
      },
    };
  }

  render() {
    if (!this.tweet) {
      throw new Error(`Tweet not properly prerendered: ${this.id}`);
    }

    const output = `
      <blockquote class="twitter-tweet">
        <p lang="en" dir="ltr">
          ${this.tweet.text}
        </p>
        &mdash; ${this.tweet.author.name} (@${
      this.tweet.author.username
    }) <a href="${this.url}">${formatDate(
      this.tweet.created_at,
      "MMMM d, yyyy"
    )}</a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    `;
    return prettier.format(output, { parser: "html" });
  }
}

/* ----- Mapper ----- */

const embedBlockMap: { [key: string]: any } = {
  "twitter.com": TwitterEmbedBlock,
};
