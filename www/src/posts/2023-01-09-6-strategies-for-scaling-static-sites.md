---
title: 6 Strategies for Scaling Static Sites
description: >-
  Pre-rendering pages on a site (traditional SSG) is a great way to serve a
  small amount of content. But it’s difficult to scale this strategy. Here are a
  handful of strategies that can be used to maintain your productivity as your
  site grows.
tags:
  - performance
image: /posts/230109/6-strategies-for-scaling-static-sites-p1K8GIEu.png
seo:
  image: /posts/230109/6-strategies-for-scaling-static-sites-oxAu-FKh--meta.png
---

As edge computing continues to advance, I still find it a good practice to pre-render as much as possible. Especially for websites where the content isn't highly dynamic.

The primary challenge with the traditional SSG (static site generator) approach is that it can't scale forever. If you are building a site that will eventually be loaded with content, at some point your builds will slow enough to lower your productivity. Pre-rendering thousands of pages on every change is simply not efficient.

As this happens, there are a number of strategies you can employ to continue using the classic SSG strategy while your site continues to grow.

{% callout type="note" %}
These strategies depend very much on the site framework and build/deploy/hosting service you're using. You should be able to employ each strategy in some way based on the tools and services you're using, but I've tried to call out more glaring exceptions where relevant.
{% endcallout %}

## Real-Time Content Previews

Whether you're writing on your own or developing for a team of writers, it's beneficial to have some sort of mechanism for previewing the content in real-time.

For hobbyist projects, this is often achieved by running the development server locally and previewing in the browser. As you scale to more users and more posts, this becomes more complicated.

Many sites use deploy previews triggered via pull requests to preview the changes they've made. The problem with this approach is that you have to wait for builds to complete before you can preview, putting more pressure on solving slow build times (a really difficult problem to solve).

Tools like [Stackbit](https://stackbit.com/) exist to help folks writing content see what they are creating _before_ needing to run a full build.

## Ignore Old Content Locally

If you are going to continue working solo as your project expands, many of the more traditional SSG frameworks are built to rebuild the whole site every time you make a change.

One way to make this build process faster when working locally is to ignore content older than _some date_. (Big thanks to [Raymond Camden](https://www.raymondcamden.com/) for this tip.)

This is a strategy I use. I publish at most 10 articles each month. If I use only the last two years of articles while running the server locally, the updates/builds run much faster.

## Build On-Demand

Netlify has fully incorporated [on-demand builders](https://docs.netlify.com/configure-builds/on-demand-builders/) into their product offering. With on-demand builders, you can wait for traffic to hit a route and then cache the result for subsequent requests. Next.js and Vercel take a slightly different approach in rendering pages on demand, at the edge.

If you're thinking _this isn't traditional SSG_, you're right. The reality is that it's difficult for pre-rendered sites to remain _fully_ pre-rendered at scale without creating massive hurdles in some part of the process. The common way to address this need is to use your framework's and hosting provider's preferred methods for _building_ pages when the user requests them and not needing to pre-render every page during a build.

## Archive Content

Some of your old content may continue to get views, while having very little chance of changing. It may be important to keep around, but doesn't need to get regenerated every time you generate new content.

One way to do this is to offload the archived content into a separate codebase and proxy to it from the main website. When the active content gets updated, it never has to touch this archived content. When the archived content needs an update, the build may take a long time, but that's likely okay because the frequency of these builds is so small.

The biggest challenge I've found in this approach is that if you also want the look and feel to be consistent between old and new content, you'd have to either duplicate stylesheets or make assets shareable between the two projects in some way.

## Gradual Migration

After reading through these approaches, you may decide that it's actually time to upgrade your stack. It's time to move up and move on. That's totally okay.

In fact, you can migrate gradually. You don't have to rebuild your entire website at one time. You can establish the new look at feel and move one page over at a time. This is what we call a _gradual migration_.

If you're unsure, I'm happy to help. [Let's talk](/contact/).

## Incremental Builds

The last strategy I felt was necessary to put on here was _incremental builds_, where you only build the content that has changed. This is a common approach for scaling static sites. But the reality is that it's _incredibly_ difficult to achieve.

I've gone through a number of experiments to get this approach to work and it's just not sustainable. There are too many variables that you have to account for when adding or updating even just a single piece of content. It's super complex and contextual to determine what else needs to be updated.

Modern JavaScript is much better at handling this.

If you start thinking about implementing incremental builds with traditional SSGs, I recommend you take a step back and look at your whole strategy. It may be time to upgrade. Or you may be able to make use of the other strategies above.

---

Whatever your woes and your current circumstance, I hope this article pushes you forward a bit. If not, or if you need additional support, [let's chat](/contact/).
