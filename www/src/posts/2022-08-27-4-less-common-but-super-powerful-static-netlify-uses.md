---
title: 4 Less Common, but Super Powerful (Static) Netlify Uses
description: >-
  Netlify isn’t just for websites. Learn how you can use Netlify to serve your
  other sites with useful content, creating a single source of truth for your
  assets and data, as needed.
tags:
  - api
  - jamstack
  - netlify
tweet: >-
  This is a collection of patterns that goes back several years for me. But I
  wanted to bring them together.


  Netlify isn’t just for websites. It can also be for web projects that serve
  your other web projects. 😊
image: >-
  /posts/220827/4-less-common-but-super-powerful-static-netlify-uses-2MtVruvD.png
seo:
  image: >-
    /posts/220827/4-less-common-but-super-powerful-static-netlify-uses-xYWg3Gds--meta.png
---

One thing I love about Netlify is the ability to flex it to fit a variety of scenarios. As a commoditized CDN with instant cache invalidation and deploy hooks tied into GitHub repos, it's a fantastic fit to serve really any content that can be committed to a git repository.

The scenarios I've included here have a common trait: they all involve _prerendering_ content. This means that before a user makes a request, we know the content that will be returned.

There are plenty of other super powerful uses for Netlify on the dynamic level. I plan to pursue those soon, but wanted to keep this post focused.

## 1. Asset Host

Netlify can serve as a static asset host. This isn't the most convenient use, but it can be super powerful for a limited number of assets that you want to share across multiple projects, repos, emails, etc.

For example, at [Stackbit](https://www.stackbit.com/), we have a repo that is wired up to [assets.stackbit.com](https://assets.stackbit.com/), and we use it for assets like [our logo](https://assets.stackbit.com/logos/stackbit-full-logo-hydrant.png). That way, wherever we need the logo in a pinch, we just link to this file.

It's a single source of truth for the logo and delivered from a CDN, which makes it faster to download across the world. And if we update the logo, we just drop a new image in there and _voila!_ it updates instantly everywhere. (Although there are reasons you may not want to blindly update an image in this way.)

### Bonus: Image Transformations

As a bonus, if you're using [Netlify's ](https://docs.netlify.com/large-media/overview/)[large media](https://docs.netlify.com/large-media/overview/)[ feature](https://docs.netlify.com/large-media/overview/), you also have access to on-demand [image transformations](https://docs.netlify.com/large-media/transform-images/), which means you can deliver optimized and scaled versions of your image assets as needed.

## 2. Static API

In the earlier days of Jamstack, I spent a lot of time talking about the possibilities of [static APIs](/posts/lets-talk-about-static-apis/). They aren't a direct replacement for your typical API, but when you don't need authentication, you can deliver content super fast to any front-end application that needs it.

And it can work just like a typical pre-rendered site works. As content is updated (wherever it may be), you use webhooks to trigger a new build with Netlify and within a few moments, your API delivers the updated content. It's not in real-time exactly, but _near-real-time_, depending on how your API is being built.

## 3. Shared Content/Data

A similar way to think about the previous step is more generally as _shared content_. You don't have to think about this as an API.

Consider any content that you might want to share across multiple web projects. The link to your logo. Your organization name. Team members. This can all live as content in a single source of truth. It can be in JSON format or really any other plain text format. (JSON is generally the easiest to consume, but there may be a better choice depending on your use case.)

## 4. JavaScript CDN

One specific example of shared content (aside from an API or assets) is a shared JavaScript library.

Several years ago, I was working for a client that had several development teams. There was a simple JavaScript library we wrote that needed to be shared across several projects and teams.

Rather than formally submit this to an official JavaScript CDN, we made the script publicly available by spinning up a repo of plain JS files and using Netlify to host it. We set the headers for those files, and _voila!_ all front-end applications could consume and run the shared script. [Read this article](/posts/use-netlify-host-js-libraries/) for more details on this approach.

## A Common Thread in these Examples

If you step back from these four ideas, you can see that there's a trend. They are all simply building, deploying, and hosting static files that can be consumed by more than one other project.

There are a great number of specific examples that can fall within those bounds. And these are just static examples. Netlify becomes even more powerful when you consider what you can deliver through [dynamic content at the edge](https://docs.netlify.com/edge-functions/overview/). But I'll save that for another time.
