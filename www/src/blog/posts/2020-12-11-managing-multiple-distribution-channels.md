---
title: Managing multiple distribution channels from a single CMS
description: When managing multiple marketing channels, you don't need to spread the content. Here's one method for keeping it all together in a single source of truth.
tags:
  - repost-ample
  - cms
image: /blog/201211/201211--multichannel-cms.png
canonical_url: https://www.ample.co/blog/managing-multiple-distribution-channels-from-a-single-cms
---

Using a headless CMS has many benefits, and one of the biggest stems from the very thing that makes a headless CMS _headless_.

_Headless_ means that there's no front-end to the CMS product. That's a little confusing, because _technically_ the CMS _does_ have a front-end, but it's only for editing the content. The lack of a _head_ (or _front-end_, in this case) means that there is no publicly-facing website delivered by the CMS product. This is in contrast to the more traditional (i.e. _monolithic_) CMS approach, used by products like [WordPress](https://wordpress.org/) and [Drupal](https://www.drupal.org/).

{% post_image
    src="/blog/201211/5fd3ec6253c1a1b120c4f14e_5tPdoDv603KzkuBD5k_PsMBMzJI5KauawKSriKqFYWJMDUdpulmX1l5pceS91Lj--KqhHgUcf8F_L9nqJFtb7lFoZiGdfCY35vD7Ia1q3BeHp4WRwQ5Q3l2hPLTBNdTXHcy6XCCn.jpeg",
    alt="Monolithic CMS approach diagram",
    flatten="true" %}

Being headless means the CMS doesn't really care how you used the content. Its job is simply to _provide_ the content to you, and then it's up to you to determine the presentation layer. That means you are free to work with whatever tools or frameworks you prefer. That also means you can have more than one front-end application consuming content from a headless CMS.

This is great for when the same type of content is to be distributed across multiple front-ends (i.e. _channels_). Consider an organization that has both a website and native applications, but wants to share content to both channels. That content can be sourced from the same (headless) CMS and consumed individually by each application.

{% post_image
    src="/blog/201211/5fd3ec6274de03693a2c18d0_qh-kg5SrxHPW0WqI3njT6cvNAnUcLPnM5YfFBhD_RIm8xjlylahpzRsEl-GcAyz6ZrMxFnjH-mWDqlgatnFgZtXft9RWXPuZ9kl8q32w8NeqSQISJFpfNucVd7AQWW0D64LiH5AO.jpeg",
    alt="Headless CMS diagram",
    flatten="true" %}

Or think about a fancy veterinarian's office that has a website and a mobile application. The website has a blog, consisting of helpful tips for pet care, often written from the perspective of the animal. The mobile application currently only allows for making and checking appointments, but they want the blog posts to be natively available to that application as well. This is a perfect use case for a headless CMS!

{% post_image
    src="/blog/201211/5fd3ec6260d65cdac707798d_1MO0fB1TaZDcbykS1L1xEiCPctRP5UKN0tg4ZaF1gxOEHiPojylDoEw_xSvM4RkGIu4Xly55XFPPJACJHiU_-POgNDWMaQ8TCl54TYOHjSUIOGVbqmWRtBsUNcNTV6WgwYPOngSi.jpeg",
    alt="Diagram of content being consumed by different applications",
    flatten="true" %}

While this is a valuable model, it is fairly simplistic and rigid, as it assumes all content is available to each channel. What if the vet wanted to be more discerning than that? What if, instead of sending all blog posts to all channels, they wanted to control which blog posts were published to the website and which to the blog on mobile (or both)?

## Distribution Channels

This is where _distribution channels_ come into play. A channel is simply a _front-end_ that consumes data from your headless CMS. This enables your CMS to act as the source of truth for your distributed content. This is also referred to as  the _omnichannel_ approach.

As I've hinted at above, distribution channels are a powerful approach. They provide a one-stop-shop for content editing, wherein editors know exactly where to go and where that content will be distributed as they add or change it.

It gets a little trickier when we want to be more discerning and deliberate when deciding where each piece of content should be distributed. Using the vet as our example, let's walk through a series of solutions in building out a distribution channel editing experience.

### The Toggle

Right now, the vet has two _channels_: a website and an application. They want to send all articles to the website, but only a subset to the application.

{% post_image
    src="/blog/201211/5fd3ec63eb2fea653b7d3925_W_GKYI0AhyOuxnHel-X_EqQjkESCJL511coo-EzVmo9RSMd3BuLod0_LLAj5SoSBJplspvetFd2l37lv6Vauec7jfO7eBkVNgafix8hAGuVwS-omYvSbhLwgKcnKZ8Gk4xpggo41.jpeg",
    alt="Diagram of content being pushed to two channels",
    flatten="true" %}

When working with a headless CMS, one approach could be to add a field to the Post model (or content type) that would also publish the post to the application if selected.

{% post_image
    src="/blog/201211/5fd3ec6274de0357a72c18d1_rhpr0E_WTthOwCeZ-0XXy0N_gqiXtKlTJ6-qRG_oI6fyRUgkAeCmgI4zhFdpJLp_u2AsHazMW93hNnLuZlSGQJNTK7zA2vSm2Aq2yAD9j0dLeS7yAQJj5sCXgx-dBXDI2tyWaR7_.png",
    alt="CMS options to publish posts to an app",
    flatten="true" %}

_(Note: All screenshots here are using_ [_Contentful_](https://www.contentful.com/)_.)_

That's nice and simple, but it doesn't scale. In other words, it works great..._until another channel comes into play_. (And once you have two channels, there's _usually_ another on its way.)

### The Association

The vet decides to spin up a marketing campaign site. They haven't been getting much fish business, and want to create some attention. They've been authoring a few posts from the perspective of fish, which are largely all super cheesy, derivative of Dory from [_Finding Nemo_](https://www.imdb.com/title/tt0266543/). But still, it may sell.

So they spin up a new website, but they only want it to include the fish posts. They _could_ add another toggle field, but that's going to get out of hand real quick. (Because there will certainly be _another_ channel sometime soon.) It's time to start being a little more clever and flexible.

A better approach would be to start using _tags_ on posts. Then they could pull the appropriate posts based on some tag association — maybe _fish_ for the campaign site and _mobile_ for the app, with all posts still being syndicated to the main website.

{% post_image
    src="/blog/201211/5fd3ec635a755058e4d477dc_T2-ryjELYD62FUw43SnzH0zys-lkAEet1xm5ZJLO4q1UeaUx2C8EfhpzZY6fr1hsvHhqq3_mwvarlTAB7q82wd2drdC6bySiPdfbo6SXrw1oKak1qxKBaldxSWJQZbxOgdnMoMWr.png",
    alt="CMS showing a tagging system",
    flatten="true" %}

That method could certainly work. It's flexible and built to scale.

However, the problem I've found with this approach is that it's a little _too_ flexible. Content editors tend to thrive when there's just enough flexibility to be dangerous, but not so much that it gets in the way of being productive.

Using something open-ended like _tags_ creates a scenario in which editors may desire to use the field for some other means of organization. And maybe eventually they want to display that content on the screen. Then you're in a sticky situation: You could end up with distribution logic baked into a field that's meant to be displayed on the front-end.

These are all hypotheticals, but they aim to point out that there's simply _a little too much_ flexibility here.

The other annoyance in this approach is that it's inconsistent. The logic for pulling the appropriate posts differs from channel to channel. Wouldn't it be nicer if every channel was treated equally and the logic for pulling articles was consistent across all channels?

### The Channel Field

To address the concerns of _too much flexibility_ on the back-end and _inconsistency_ on the front-end, let's create a field that is focused solely on distribution channels and can only be interpreted as such.

We'll create a new _channels_ field. That field could be a multi-select list of channels to which the content can be distributed.

{% post_image
    src="/blog/201211/5fd3ec6305a437781231bd72_aaNm5DuulaoirA6c7j3evAS04pWqMCMRliMlKUAIe4zdc1cJBVuwDJC7Hye0YPMD0RzXhKoSoCNl8UBRs-5saAyWjABzVVNlVMcMnGXhh2C4KW9dyKs1EnSqzipxRylyx1dMit_Q.png",
    alt="CMS options for distribution channels",
    flatten="true" %}

The front-ends all then have the same logic for gathering posts. They'd simply have to swap out the value of the channel.

Revisiting the tag association approach for a second, its logic looked like this:

- Website: Give me all posts.
- App: Give me posts that have the _app_ checkbox set to _true_.
- Campaign: Give me posts associated with the _campaign_ tag.

The beauty of this _channel_ field approach is that it is consistent across front-ends, while serving a clear and specific purpose in the CMS. The updated logic looks like this:

- Website: Give me posts with "website" included in the _channels_ field.
- App: Give me posts with "app" included in the _channels_ field.
- Campaign: Give me posts with "campaign" included in the _channels_ field.

Now _that_ feels like a solution I can get along with. And I like to think the animals would appreciate it, too.

## Canonicalization

One thing to note when taking the _channel_ field approach is to also account for [_canonicalization_](https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls). When content is duplicated across multiple pages on the web, Google only gives credence to one. And if you don't tell Google which one is the original (the one that should show up in search results), it'll guess. And it's always good to [be intentional when it comes to SEO](https://www.ample.co/blog/which-seo-platform-is-right-for-your-business).

It would be beneficial to have another field that sets the canonical host. For one project, we actually combined them all together into an interactive field using Contentful.

{% post_image
    src="/blog/201211/5fd3ec63c2fe792d2d1835e7_2pr_ILIRxkaMax7hX9PPJylvOa7-G_xQ3W81Jc5V1FUXF1Mdw3mQgxZ6ISQWx2-fyK7LzmgG2L7D3ohwxon_-g4VBEVqdXNHOi_xkmxSm0zUXW_OfYJ_qfD3u1C1L6l9StCU0d0y.png",
    alt="CMS options to set sites as distribution channels",
    flatten="true" %}

But that took a bit of work to get it right. You could accomplish this more easily by adding a _canonical_host_ field with a singular-select field of your channels as choices.

## Structured Models

Keep in mind that not all content types (or models) are designed to fit within this model. For example, we've found in working with our clients that pages tend to be super specific to the site on which they are published. The styling elements and the components within those pages are often drastically different from one site to another.

The reason posts work well as an example is because they are _structured_. Blog posts have structured fields that get mapped to specific areas on the page. Consider other types of content like locations or products, which also often have a strict structure to them.

Compare that with pages, which, if you're designing a solid content editing experience, are often more fluid and flexible. For example, you may have to switch around sections on page, while a post is typically just a title, some meta data, imagery, and body copy.

In general, this approach works best when paired with structured content models.

## What's Next?

That's it — now it's time for you to try it out!

We'd love to hear how you account for distribution channels with various headless CMS products. ([We're nerds](https://www.ample.co/about). We love talking about [all things CMS](https://www.ample.co/blog/comparing-headless-content-management-systems)!) [Drop us a line](https://www.ample.co/contact).
