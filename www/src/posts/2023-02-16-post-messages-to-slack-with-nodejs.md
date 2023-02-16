---
title: Post Messages to Slack with Node.js
description: >-
  Build a simple Slack app that sends one-way messages to a channel using a Node
  script.
tags:
  - javascript
  - node
  - slack
image: /posts/230216/post-messages-to-slack-with-nodejs-Dn0bsHsx.png
seo:
  image: /posts/230216/post-messages-to-slack-with-nodejs-Bn0TSML9--meta.png
---

{% youtube_embed id="SbUv1nCS7a0" %}

Slack apps appear to be complex when getting started using their documentation. And many apps are complex. They are built to be distributed among multiple Slack teams, and they typically listen for input from users and adjust responses based on that input. They are _apps_, after all.

But they don't have to be. Sometimes you may just want to send a message to Slack based on some other event. You don't need to listen for input from users, but only want to send one-way messages.

This process is actually quite simple and only involves three basic steps:

1. Registering the app
1. Understanding how blocks work
1. Writing the script

Let's do it!

## Registering a Slack Application

Let's create and configure a new Slack application.

### Create Slack App

Begin by going to [api.slack.com/apps](https://api.slack.com/apps) and clicking **Create New App**.

{% post_image alt="", src="/uploads/230216/new-slack-app.png" %}

Choose **From Scratch**, then give it a name and choose the workspace where you want to install it.

{% post_image alt="", src="/uploads/230216/new-app-modal.png" %}

### Enable Incoming Webhooks

In the basic information section, go into _Incoming Webhooks_.

{% post_image alt="", src="/uploads/230216/incoming-webhooks.png" %}

Slide the toggle to enable the feature. After doing this, you will see a button near the bottom called _Add New Webhook To Workspace_. Click this and choose a channel where you'll install the app.

{% post_image alt="", src="/uploads/230216/install-webhook.png" %}

{% callout type="note" %}
This doesn't mean it's the only channel the bot can post to. You can change this later, but have to pick something now.
{% endcallout %}

After doing this, you'll see that the webhook integration has been added to the channel in your Slack team.

{% post_image alt="", src="/uploads/230216/slack-installation-message.png" %}

### Add Permissions

Navigate to _OAuth & Permissions_ (under _Features_ in the side navigation) and scroll down to the _Scopes_ section.

Enable the following scopes as _Bot Token Scopes_:

- `chat:write`
- `chat:write.public`
- `incoming-webhook` (should already be enabled)

{% post_image alt="", src="/uploads/230216/bot-token-scopes.png" %}

{% callout type="warning" %}
If the channel you want to post to is a private channel, go back to Slack and invite the app _user_ into the channel.
{% endcallout %}

You will likely see a notification at this point, asking you to reinstall the application into the workspace after adding these scopes. Follow the steps it provides.

### Display Information

Finally, if you want to adjust how the app appears when posting messages, you can adjust the display information near the bottom of the _Basic Information_ page under _Settings_.

Note that we'll have to come back here for some security credentials when we start writing code. But for now, let's move on to learn about blocks.

## Understanding Slack Blocks

Slack messages are typically made up of blocks. These are structured JSON objects that tell Slack how to render the message. It gives you a lot of flexibility in how you present your message.

### Block Kit Builder

This is likely the thing you'll spend the most time adjusting so that your messages are formatted exactly as you'd like. Fortunately, there is a [block kit builder](https://app.slack.com/block-kit-builder) that you can use to get more familiar with blocks.

### Example Blocks

Here's an example of blocks you might use to notify Slack that you just published a post.

```json
{
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": ":fire: New post published to the site: <https://www.seancdavis.com/|*Working with Slack API*>"
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "context",
      "elements": [
        {
          "type": "image",
          "image_url": "https://avatars.githubusercontent.com/u/5245089?v=4",
          "alt_text": "Sean C Davis"
        },
        {
          "type": "mrkdwn",
          "text": "Author: <https://www.seancdavis.com/|*Sean C Davis*>"
        }
      ]
    }
  ]
}
```

### Block Structure

There are a few things that tripped me up as I was learning about blocks:

- A markdown block is of type `mrkdwn` (not `markdown`).
- Markdown structure is not standard markdown. Slack has its own flavor. The block kit builder will show you some examples.
- You should not use action blocks. Actions are for interactive apps and you're not enabling any interactivity in the app we're building here.

Here are the [block kit docs](https://api.slack.com/block-kit), which are a nice reference while you're structuring your content.

## Writing the Script

The code is so surprisingly simple that I don't even need to show you an example project. It just takes a few steps.

If you don't have a project already, begin with [a new blank Node.js project](/posts/new-javascript-project-setup/).

### Install Dependencies

The only dependency we'll use here is Slacks's SDK, called [@slack/bolt](https://slack.dev/bolt-js/).

```txt
npm install @slack/bolt
```

If you also don't have a way to store and load environment variables, you can take advantage of [dotenv](https://npmjs.com/package/dotenv).

```txt
npm install dotenv
```

### Save Environment Variables

We're going to retrieve and store three environment variables:

`SLACK_SIGNING_SECRET`: Find this in the _App Credentials_ section in the _Basic Information_ page. Copy the _Signing Secret_.

{% post_image alt="", src="/uploads/230216/slack-signing-secret.png" %}

`SLACK_BOT_TOKEN`: This is under _OAuth & Permissions_. There should be a single token that you can copy. (See below for a screenshot.)

{% post_image alt="", src="/uploads/230216/slack-bot-token.png" %}

`SLACK_CHANNEL`: The name of the channel that you are going to send the message to. I use an environment variable so that I can easily swap this out between development and production.

Once you have these values, paste them in the appropriate place in your project.

`.env` {.filename}

```bash
SLACK_SIGNING_SECRET="..."
SLACK_BOT_TOKEN="..."
SLACK_CHANNEL="..."
```

### Write the Script

Then we can write the script. And it's super simple!

`index.mjs` {.filename}

```js
import Slack from "@slack/bolt";

const app = new Slack.App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const blocks =
  /* Add blocks payload here ... */

  await app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: process.env.SLACK_CHANNEL,
    text: "...",
    blocks,
  });
```

Be sure to set the `blocks` constant to the payload you've built with the block kit builder (or use my example).

And replace the `text` property in `postMessage` with an appropriate text representation of your message. This is for usages where Slack does not render block content.

{% callout type="note" %}
Notice here that I'm using `.mjs` as the file extension. This is so I could have access to top-level `await`. You can also set `"type": "module"` in your `package.json`.
{% endcallout %}

Now run the script and see the results!

---

I hope this serves as a solid foundation for you to build something great (or fun, or both)!

Feel free to [create an issue](https://github.com/seancdavis/seancdavis-com/issues/new) if you have a question or trouble with this code.
