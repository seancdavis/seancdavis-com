import { Client } from "twitter-api-sdk";
import { format as formatDate } from "date-fns";
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
