---
title: Parse a Web Page and Post to Slack Using Ruby
description: When another website is doing the heavy-lifting updating some
  content you want to keep up on, but there's no good integration with Slack,
  you can parse it yourself and post directly to a Slack channel.
tags:
  - slack
  - ruby
image: /posts/default/default-pink-02.png
---

While I will have a more specific example of how this might be used, I wanted to publish a quick set of thoughts on combining two of my recently articles.

I've written about [scraping and parsing a web page using Nokogiri](/posts/scrape-parse-webpage-ruby/) and also about [posting content to Slack](/posts/use-ruby-to-post-content-to-slack/), both within the context of Ruby. Why not use them together?

There are more and more integrations with Slack what seems like every day. But instead of waiting for one, or figuring out how to build your own, what if there's something on a web page you want to post to Slack but that site doesn't offer an API.

I'll let you come up with all the crazy examples, but I'm guessing you've come here for a reason. I'm guessing you already know _what_ you want to post, you just need to know _how_.

So, I have this article here and a consolidation of the two I mentioned above.

First, I would focus on [parsing the web page](/posts/scrape-parse-webpage-ruby/) until you know you are outputting all the correct content.

Next, combine that with a way to [post to one of your Slack channels](/posts/use-ruby-to-post-content-to-slack/). Have fun with it!

But the power in this is going to be in automatic updating. That means that you'll want to wrap up the parsing code in either a rake task or an executable ruby script. And then you'll want to run that script regularly using cron.

See [this guide](/posts/command-line-scripts-using-ruby/) on setting up command line scripts using Ruby. Then, when you add that script to a server running [Cron](https://en.wikipedia.org/wiki/Cron/), you'll just want to run it every so often. And you can do that by pointing right to the file. For example, say you threw the file in `/home/slack/bin/post_to_slack`. And let's say you want to run it at 4:00am every morning, then you'd open up your cronjob editor (`crontab -e`) and add:

```
0 4 * * * /bin/bash -l -c '/home/slack/bin/post_to_slack'
```

This assumes that `/home/slack/bin` is in your path, which the [article on command line scripts](/posts/command-line-scripts-using-ruby/) discusses.
