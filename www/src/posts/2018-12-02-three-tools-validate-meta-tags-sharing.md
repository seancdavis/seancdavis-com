---
title: 3 Tools to Validate Your Page's Meta Tags for Social Sharing
description: When you write an article or create any new webpage that is going
  to be shared across the web, it's important that you know how the preview of
  that new property is going to be displayed.
tags:
  - seo
image: /posts/default/default-green-01.png
---

When a webpage gets shared -- on [Facebook](https://www.facebook.com/), [Twitter](https://twitter.com/), [Slack](https://slack.com/), [Medium](https://medium.com/), etc. -- there is often some sort of preview of that page which shows (if available) a title, text snippet, and image. When you are the author of such content it's important that you have control over the information that gets displayed when others share links to your content.

## Hey Meta

The most important piece is that you have [the essential meta tags](https://moz.com/blog/seo-meta-tags). SEO experts at Moz suggest a few key tags (click link in last sentence to read) but for social sharing, the important ones are **title** and **description**. Many services that allow for sharing web links will use these values. Even if they have platform-specific tags (like Facebook and Twitter), if they don't find _their_ tags, they are going to look to the generic title and description to know what to display.

One tool that does a great job with helping with these tags is [Hey Meta](http://www.heymeta.com/). You can put in any link and the Hey Meta tool will show you what meta it finds (or guess what it should be), and also provides an easy way to fill in the content yourself and generate the appropriate tags to drop into your page.

**Tool #1:** [Hey Meta](http://www.heymeta.com/)

## Facebook Debugger

Facebook developed [the Open Graph protocol](http://ogp.me/). While Facebook uses Open Graph to display its preview cards on shared links, Open Graph is meant to be a social sharing standard across the web. As it states on its home page:

> While many different technologies and schemas exist and could be combined together, there isn't a single technology which provides enough information to richly represent any web page within the social graph. The Open Graph protocol builds on these existing technologies and gives developers one thing to implement.

As I mentioned, Facebook (and others) will attempt to fall back to your basic meta tags if it doesn't find Open Graph (OG) tags, but because OG has become a social sharing standard, it is important to implement at least the primary OG tags on any page your publish to your site. Those are:

- `og:title`
- `og:type`
- `og:image`
- `og:url`

(While it's not optional, you should also consider `og:description` to be one of the primary tags you include on every page.)

Because Facebook is the leader in this space, it also takes on the responsibility of providing developers and publishers with [a tool for validating the OG tags for any given URL](https://developers.facebook.com/tools/debug/). This provides a means for previewing how your pages are going to show up on Facebook, and that can reasonably inform you on how they should show up on other platforms as well. [The ]

**Tool #2:** [Facebook Debugger](https://developers.facebook.com/tools/debug/)

## Twitter Card Validator

Twitter also has its own protocol separate from Facebook and Open Graph. In my experience, these tags are only used by Twitter, as most other social platforms assume either the OG tags or the generic meta tags (title, description).

Most of the focus with the Twitter tags is in having more control over manipulating how the card representing your webpage appears on their platforms. And for that, they have [a massive list](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup) of options you can include. Again, you can usually just stick to the basics, or you can ignore Twitter entirely and let them use the OG tags. In fact, [on that list](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup), Twitter displays which of their tags fall back to which OG tags.

In any case, Twitter tags are good to use if you want more control over what shows up on Twitter when others share your content. And they have [a validator](https://cards-dev.twitter.com/validator) to help you preview and debug you meta tags.

**Tool #3:** [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

These are the three tools I use whenever I post new content and am not entirely sure how various platforms are going to display it. I hope you can make use of these tools, too, to gain more control over the previews of your content.
