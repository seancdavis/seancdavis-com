---
title: Prerender if You Can Prerender
description: >-
  As edge computing advances, we have more power and more options on how pages
  are delivered. And yet, I continue to use this principal to begin the
  decision-making process.
tags:
  - developer-advice
tweet: >-
  All these page rendering methods we have at our disposal today are incredibly
  powerful! And yet, I still follow a *static first* approach.
image: /posts/220510/prerender-if-you-can-prerender-wNRynOWf.png
seo:
  image: /posts/220510/prerender-if-you-can-prerender-tvfgfT7i--meta.png
---

We are in the midst of a revolution in how pages for the web are rendered. There are [so many options](https://bejamas.io/blog/understanding-rendering-in-the-jamstack/) today!

Where do you begin?

How do you know if your page should be server-side rendered? Will your site be able to accommodate everything being prerendered as it scales?

With edge computing evolving into a commodity, there are more _reasonable_ and \_scalable \_options than ever before. The answer isn’t as obvious as it was even three years ago.

As I explore these expanding options, I continue to come back to a single foundational principal to govern all decisions that I make about choose the right rendering method for a particular page. As I’ve talked at length about this topic with [Brian Rinaldi](https://twitter.com/remotesynth), I’ll use [his words](https://bejamas.io/blog/understanding-rendering-in-the-jamstack/#when-to-use-what):

> Begin with a “static first” philosophy when building a Jamstack site. As Jamstack developers, we believe in the speed and security benefits of prerendering assets. So, ask yourself: “Can this content be prerendered?” If it can, then it probably should be, even if it requires a bit more effort than the alternative SSR implementation.

I _love_ the idea of **rendering pages static first**. Static pages have numerous benefits over those that are rendered on the fly. What exactly those benefits are depends on the scenario. But in general, there are fewer moving pieces, less work for the server to do, and more predictability in what your users are going to experience.

As your site and its requirements evolve, you’ll have to make decisions about the best approach, and you’ll likely end up exploring alternate methods for rendering pages. But begin with prerendering if you can.
