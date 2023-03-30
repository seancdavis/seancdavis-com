---
title: React Wrap Balancer is Cool. But Should You Use It?
description: >-
  An interesting project that helps avoid handing words in layouts, which is
  particularly useful for headings.
tags:
  - 'Video: Short'
tweet: >-
  Came across this project last month. It’s really interesting, but also reminds
  me of fixing layouts with jQuery, and I cringed a bit. But, it makes me
  excited for balanced text to come to CSS.
image: /posts/230329/react-wrap-balancer-is-cool-but-should-you-use-it-BgV3ISae.png
seo:
  image: >-
    /posts/230329/react-wrap-balancer-is-cool-but-should-you-use-it-YBS8d6Ec--meta.png
---

{% youtube_embed id="-o53JVTwJkA" %}

The [React Wrap Balancer](https://react-wrap-balancer.vercel.app/) project is a really cool idea. And it's obvious that the folks working on it have considered the performance implications of using JavaScript to adjust the layout of elements on a page.

## Avoiding Hanging Words in Headings

Because we can't account for every scenario when designing our layouts, a tool like this is powerful in avoiding unbalanced text, where a single word may overflow onto a line all by itself and just not look right.

React Wrap Balancer fixes this through thoughtful calculation.

{% post_image alt="", src="/uploads/230329/react-wrap-balancer.png" %}

I've tinkered with this a bit, and it works great. It's particularly useful with headings in layouts like blog posts, where the length of a heading can vary greatly from one post to another.

## Solving Layout Problems with JavaScript

As cool as this is, when I first saw the demo, I cringed a bit. It made me feel like I was back in my early days of development (c. 2010) and using jQuery to drive changes to layouts I couldn't control with CSS.

But CSS has grown so powerful in the last decade that I rarely run into a layout problem I can't solve with CSS. Therefore, I can reserve JavaScript exclusively for interactive and data-driven functionality.

CSS can't solve this layout issue today, and I'm hoping this project pushes CSS in that direction.

## When to Use React Wrap Balancer

Tools like this are incredibly useful when you're working with a framework that already brings a lot of JavaScript to the client. If you're using Next.js or another React framework that hydrates components on the client, this tool is a no-brainer. I'd start using it immediately!

If you're using another framework that is more cautious about how much JavaScript you ship to your users, I'd project that framework's caution and decide if the added JavaScript is worth it for you.

Personally, I'm going to hold off. [Balanced text](https://www.amitmerchant.com/balanced-text-wrapping-is-coming-to-css/) is coming to CSS soon, and when that happens, I'll absolutely be taking advantage of it.
