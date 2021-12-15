---
title: WTF is Netlify?
description: What the what is Netlify and why am I always talking about it?
image: /posts/210504/wtf--netlify.png
tags:
  - netlify
  - wtf
---

Above all else, [Netlify](https://www.netlify.com/about/) is a tool used to deliver [Jamstack](/posts/wtf-is-jamstack) websites.

A Jamstack site typically has three primary pieces:

- Data source(s)
- Front-end build tooling
- Deployment/hosting

Netlify focuses on that third piece. It is a tool that will run your build process when you make a change, and then upload your static files to a CDN to serve them to your visitors without the need for an application server or database. It automates this process by connecting to your GitHub (or other Git remote provider) repository and running builds when code changes (based on your configuration).

But Netlify also understands that the practicality of scaling Jamstack sites requires additional functionality, which is why they offer features like [form submissions](https://www.netlify.com/products/forms/), [authentication](https://docs.netlify.com/visitor-access/identity/), and [serverless functions](https://www.netlify.com/products/functions/). They even have an [open-source CMS](https://www.netlifycms.org/).

But Netlify isn't just another player in the Jamstack ecosystem. In fact, Netlify (or, more specifically, CEO [Matt Biilmann](https://twitter.com/biilmann)) actually coined the term _Jamstack_ (originally "JAMstack"). On one hand, that means that some (for-profit) company holds the reigns to a community, including its [website](https://jamstack.org/), [conference](https://jamstackconf.com/), and [Slack community](https://jamstack.org/slack). On the other hand, it means there is a major player in the Jamstack community driving to keep the community's best interests at heart.

That's what I love most about the Jamstack community and Netlify. As the founders, Netlify welcomes competition. And yet, at the same time, they are dedicated to maintaining the core benefits of what makes the Jamstack so great within their primary service offerings.

As an introduction to Netlify, this only brushes the surface. I write quite a bit [about Netlify](/topics/netlify/) and also [the Jamstack](/topics/jamstack/). Check out some of those articles or [give Netlify a whirl](https://app.netlify.com/) to see for yourself what it's all about.
