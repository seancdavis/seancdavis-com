---
title: Why are There So. Many. CMSs?
description: >-
  It’s difficult to choose a CMS today because there are so many options. But
  why are there so many options?
tags:
  - cms
  - jamstack
tweet: >-
  Why is it so overwhelming to choose a CMS today? How are there still so many
  different players in the space?


  This is a question I ask myself regularly, and I tried to answer it here.
image: /posts/220827/why-are-there-so-many-cmss-FuXDxLUc.png
seo:
  image: /posts/220827/why-are-there-so-many-cmss-7IE0Fagy--meta.png
---

> _Why are there so many [EXPLETIVE] CMSs?_

I've been asked this (rhetorical) question a number of times in the last few years, and I thought it would be fun topic to explore.

{% callout type="note" %}
Disclaimer: I'll preface this entire prosaic exploration by noting that this is an exploration. There are a great many factors that led to why things were the way they were, and why they are the way they are. This is a synopsis and snippet from my perspective.
{% endcallout %}

## Reading Between the Lines

It's difficult to talk content management without mentioning WordPress in some way. It essentially defined what a CMS is (although that definition is changing).

And while WordPress is definitely still a thing (more on this below), there's usually an underpinning below this question. And I think what folks are usually wondering is: _Why isn't there a modern WordPress?_

Why isn't there a single content provider that stands above the rest? That when you think about managing content in 2022, you think about this one thing.

Before we can answer that question, I think we have to spend time on two considerations first.

### WordPress is Still a Thing

The first is that WordPress is very much still a thing. In fact, [it is used by 2 of every 5 websites in 2022](https://blog.hubspot.com/website/wordpress-stats)! And it's grown from 2021. It's grown more than 10% year over year since 2011.

I mention this because I think it's important for contextualizing this exploration. While we're exploring modern technology in this conversation, WordPress continues to be relevant (even if not _modern_), and it continues to grow. Those of us tapped into modern tools know that there are many things vying for a market share from WordPress, and yet WordPress continues to dominate.

### Why the WordPress Thing Happened

It's also important to consider why WordPress became so popular. While [there are](https://www.quora.com/Why-is-Wordpress-so-popular) [a lot of](https://www.wpbeginner.com/why-you-should-use-wordpress/) [explanations](https://sitecare.com/blog/why-is-wordpress-so-popular/), I attribute WordPress's success largely to three factors that work together:

- It was the first well-made open-source CMS.
- It is a complete package and super fast (and cheap) to go from nothing to a website running in production.
- It is extendible. If you can't find a plugin that solves the problem, writing one isn't that difficult (for developers).

Why WordPress continues to be so popular is likely an extension of these three points, but it will also to explain how competitors are vying for a share.

## The Perception of Saturation

There have _always_ been a lot of CMSs. It just wasn't always so obvious.

Before the modern era of headless CMS, most websites were built as monoliths (tightly-couple front and back ends). This architecture made it more practice to build and maintain a custom CMS. Back in those days there were probably _a lot more_ CMSs. You just couldn't see most of them.

## 3 Factors that Led to the Current Content Landscape

There are certainly more than three factors that led to the current content management landscape. But when I think about _why_ and _where_ we are today, these are the first factors that come to mind.

### The Shift to Decoupled Services

From somewhere before 2016-2017 or so, the go-to technological choice for the typical website was to build a monolithic application — _tightly-coupled_ front end and CMS.

The emergence of the Jamstack changed that. Netlify helped commoditize prerendering websites and delivering pages from the edge, solving problems that were very difficult to address on a per-project basis.

Within a few years, the industry shifted and we began to see a move toward decoupled websites, driven by API-based content management systems. This opened the door for a whole new class of tools — CMSs that were _only_ CMSs. They didn't provide a front-end website. They simply enabled developers to consume and use the content however they saw fit, via an API.

### The Role of a CMS is Evolving

In the monolithic days, the role of a CMS was to _manage_ content, while the front end _consumed_ that content directly from the database. As headless (API) CMSs emerged, the only inherent difference is that they were decoupled from front ends. Otherwise, they looked and worked very similarly to traditional CMSs.

But in the last few years we've seen rapid development and evolution of what _content providers_ can offer.

While tools like Contentful and Sanity (and _hundreds_ more) are more of a traditional headless CMS, we have tools like [Uniform](https://uniform.dev/), [StepZen](https://stepzen.com/), [Hygraph](https://hygraph.com/), and [TakeShape](https://www.takeshape.io/) that are combining the idea of headless CMS with mesh APIs. This is becoming a class of tools called a _digital experience platform_. DXPs enable developers to have a source of truth for all their content, even when that content may originate from several other sources. Think: Contentful for page data and Shopify for product data.

{% callout type="note" %}
[Stackbit](https://www.stackbit.com/) (where I work) is taking a similar approach, but doesn't quite fit in this category. It's more like a _editing experience platform_ — a space that doesn't quite exist yet.
{% endcallout %}

But it's not stopping there. Contentful and Sanity have been forced to think about how a headless CMS can solve open content authoring in a world where we have components at our fingertips. They've explored how to provide a WYSIWYG experience that is backed by some _structure_.

Structured-but-flexible content was a space Notion has been playing in for a few years. And I've now seen developers beginning to use Notion as a content source. At first, Notion was a fantastic personal content management tool — from notes, to task lists, to spreadsheets. When they bolted on an API, developers immediately started using Notion to power the content for their websites. And it makes perfect sense. Notion has a super rich and somewhat flexible editing experience, but it is backed by structured content that can be fed into components on the front end.

In other words, the role a CMS plays for a website is still actively changing.

### The Next Era is Unproven

Because we're seeing such a rapid evolution of CMS-like tools, it makes sense that there are a lot of tools vying for our attention. We're actively developing new categories that all fit under a broader set of "content editing" and "content delivery" tools.

A great many of these tools are API-based CMSs, plain and simple. But if you're wondering why we're talking about Sanity one day, Uniform the next, and even considering Notion as a CMS, it's because we're not really sure what the role of a modern CMS is.

Because of that, the next era of content is still _to be determined_. It hasn't been proven yet. And for that reason, I think we're going to see even more new players to the game.

I also don't think we will see a single winner. We're going to see some nuance in variations on content providers, and several tools will likely grow to be major players in the space.

## Picking the Right CMS Today

The question that generally follows why there are so many CMSs is how to possibly pick one in this landscape.

That one's much easier: _Just do it._ Don't overthink it. Pick one that fits your needs today, and have _some_ confidence that it will solve your needs tomorrow.

But if the tool evolves, or if your site evolves, or if you evolve, it's all fine. All of these tools are API-first, which means that getting the content out is (relatively) easy. And bringing it into another tool isn't much harder. It takes time, but it's doable, and it's a natural transition for today's websites.

Just be sure to be aware of vendor lock-in when choosing a CMS today.

---

There are a lot of CMSs. But there have always been a lot of CMSs. I hope you've enjoyed this exploration as much as I have. And I hope you pick your next CMS with confidence and with the knowledge that you can move to a new vendor as you evolve, and with much less hassle than in the previous era of content management.
