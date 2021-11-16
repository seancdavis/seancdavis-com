---
title: What Made the Essence of Jamstack Possible
description: The Jamstack may have been born out of pain, but it couldn't have existed without the convergence of a few key factors.
image: /blog/211007/211007-essence-of-jamstack.png
canonical_url: https://www.stackbit.com/blog/what-made-the-essence-of-jamstack-possible/
tags:
  - jamstack
  - stackbit
---

Let's begin with an infinite loop:

1.  Define Jamstack.
2.  Ask a few subject matter experts for feedback.
3.  Adjust until it's right.

_Maximum call stack size exceeded._

Why?

Because Jamstack is an elusive, malleable, evolving term. Many throughout the community mold the definition to suit their needs. It's not wrong. It's just ... difficult to define.

## The Essence of Jamstack

What made the Jamstack a total game-changer from the beginning wasn't whether server-side rendering was or wasn't technically part of the pattern, or how CDN caches were invalidated, or how much "work" can be done at the edge before responding to the request.

It was the _essence_ of Jamstack that mattered.

What Jamstack delivered to developers was a means of building websites that were faster, more scalable, less expensive, and more secure. (And still fun to build!)

## Born from Pain

Like many developer-led movements, the Jamstack pattern came about as the result of pain. WordPress seemed great at first. _You could get a site up and running in minutes!_

But once it came time to launch the site, the pain set in. Logging into cPanel, wiring up a database, waiting for DNS to propagate, endlessly changing the Apache config, running chmod a hundred different times until files could be uploaded because the entire server was publicly writeable (okay, maybe not _that_ bad).

And when it came to maintaining the site, it seemed the pain was, in fact, chronic. Security updates were necessary on what seemed like an almost weekly basis. Plugins were easy to create and quick to slow down every page load.

## Pain Doesn't Solve Problems

Pain leads to inspiration. The desire to lower pain can be a serious motivator.

But that doesn't _solve_ the problem.

Developers were frustrated with WordPress for years and years. Our own CEO, Ohad Eder-Pressman, dates his move toward a Jamstack-like pattern back to 2010, after AWS announced S3 could be used to host websites. And yet, the Jamstack wasn't truly born until Netlify came along in 2015, and it didn't get loads of attraction until 2018 or so.

What made the Jamstack possible wasn't the pain of WordPress or custom Rails or Django applications or maintaining customized, proprietary CMSs.

What allowed Jamstack to thrive was the convergence of several factors. While I'm sure there are plenty more we could add to the list, the five advancements I outlined below feel to me as the real catalysts.

## 1. Static Site Generators

[Jekyll](https://jekyllrb.com/) is largely credited with popularizing the class of tools called _static site generators_. It was built to serve GitHub's _Pages_ feature, which enabled users to deploy static sites. Amazingly, this dates all the way back to 2008.

Aside from Jekyll, static site generators didn't really pick up much traction for several years. Hugo was 2013, Next.js was 2016. I had worked with Middleman a bit, and it began in 2009, but never really took off.

Today there are 333 of these tools listed on [the Jamstack community website](https://jamstack.org/generators/). Many are in response to Jamstack, but it was slow to start.

## 2. API Economy

Not every tool came with an API in 2010 like it seems they do today. Content management systems were monolithic applications where the editing portion lived in the same application as the publicly-accessible front end (e.g. WordPress).

As APIs became more popular as a way to enable developers to work with product data, it paved the way for API-driven, back-end services to emerge, like headless CMSs, DBaaS, and BaaS. For example, Contentful, arguably the most popular API-driven CMS, was founded in 2013.

## 3. Node.js Maturity

Before Node.js, to statically render a website during a build process meant you were writing code in some other language, like Ruby (Jekyll was written in Ruby).

Node.js came on the scene in 2009. It took years to mature to the point at which we could build solid tooling with it.

The beauty of Node is that it enabled developers to write server-side code with a client-side language they were already familiar with. Although Jekyll and Hugo are still popular today, the emergence of Node.js is arguably the thing we needed for static site generators to take off.

This also led to muddiness between what is front end and what is back end. Soon front-end developers had the power in their hands to build and manage an entire website without learning a new programming language. Without Node.js, the Jamstack would not have looked as attractive to developers more comfortable with front end code.

## 4. Git-Based Workflows & Continuous Delivery

The combination of Jekyll and GitHub Pages showed us that we could build an entire website statically, while still separating the code from the content. (We've had markdown since 2004 to help with flat-file authoring.)

Meanwhile, continuous delivery becomes popularized as a concept in 2010. This led GitHub (and other git providers) to explore working both continuous integration and continuous delivery into their products.

The Jamstack hinges on a build process, which must be triggered from some outside system. It makes sense that the trigger come from a change to the code (or an API being used in the project).

## 5. Commoditization of the CDN

Content delivery networks (CDN) have been around since the 1990s. But they have been traditionally difficult to work with. AWS's CloudFront came along in 2008, which made that process so much easier.

Still, the biggest challenge in using a CDN for a static site was cache invalidation, which was not easy to accomplish.

_This_ is what Netlify gave us, and it was the last piece of the puzzle that we needed to be able to have the Jamstack.

At Stackbit, we're all about the Jamstack! We're working to build a one-of-a-kind tool that uses Jamstack best practices to deliver a cohesive site-building experience, while delivering a mouth-watering in-context editing experience that is difficult to find in this Jamstack world.

---

This post was motivated by a conversation I had with our CEO, [Ohad Eder-Pressman](https://twitter.com/ohadpr). Here's the clip that gave me the inspiration:

{% youtube_embed
    id="FepIBME2BpA",
    title="What Made Jamstack Possible",
    image="/blog/211007/211007-essence-of-jamstack.png" %}
