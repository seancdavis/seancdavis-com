---
title: Use Ruby To Post Content To Slack
description: Once you learn how to use Slack's incoming webhooks, the
  possibilities are endless. See how to post to Slack using Ruby.
tags:
  - ruby
  - slack
image: /blog/default/default-orange-01.png
---

Slack has a really nice feature called [Incoming Webhooks](https://api.slack.com/incoming-webhooks). It enables you to post messages with dynamic content, using a dynamic username and avatar.

The possibilities on what you can use this for are endless. For example, you could post score updates on sporting events, changes within another service, like git commits, or project tasks.

Before we get into this, I want to mention one thing. Always make sure your solution doesn't exist before you try to create one. For example, I wanted to post commits pushed to Bitbucket in my Slack channel. Well, there is already an integration written for that. Another time I wanted to have a running feed of Basecamp activity, and while there is no Slack integration, there is [a nice script](https://github.com/jamescarlos/slackcamp) to which I made a few changes and now run as a cron job.

If your solution doesn't already exist, let's get into it!

## 01: Create Incoming Webhook

The first thing to do is to setup an incoming webhook service integration. You can do this from your services page. The URL is `[your-team].slack.com/services/new`.

Here choose _Incoming Webhooks_, then pick a channel and add the integration.

Do note that the channel you pick doesn't have to have any bearing on the channel to which you actually post, as you can change that with the payload you send to Slack.

## 02: Send The Request

From here, it's really quite simple, especially with Ruby. But let's keep it clean and wrap it up in a method.

```ruby
require 'json'

def notify_slack(webhook_url, channel, username, text, image)
  payload = {
    :channel  => channel,
    :username => username,
    :text     => text,
    :icon_url => image
  }.to_json
  cmd = "curl -X POST --data-urlencode 'payload=#{payload}' #{webhook_url}"
  system(cmd)
end
```

We set up the payload, then send a curl request. **This means you need to have curl installed on your machine.**

When you want to send a request, just call the method, assuming it's already defined.

```ruby
notify_slack(
  '[my_webhook_url]',
  '#general',
  'I Am Not A Robot',
  'I am not a robot, even though I look like one.',
  'http://www.clipartillustration.com/wp-content/uploads/2015/04/133315--preview.jpg',
)
```

Sure, you can clean it up from here, but it really is that quick. Now go do something fun with it!

---

**References:**

- Here's [the gist](https://gist.github.com/seancdavis/a2aa19d25cf60e9d95a9) for the method above.
- [Slack's Incoming Webhooks](https://api.slack.com/incoming-webhooks)
- [Slackcamp](https://github.com/jamescarlos/slackcamp)
