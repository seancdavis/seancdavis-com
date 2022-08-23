---
title: 6 Reasons I (Still) Love 11ty
description: >-
  Two years after launching my site with 11ty, it’s grown considerably, and yet
  I’m still in love with the tool.
tags:
  - eleventy
image: /posts/220805/6-reasons-i-still-love-11ty-xRF27f-6.png
seo:
  image: /posts/220805/6-reasons-i-still-love-11ty-ckupy6_U--meta.png
---

The last time I rebuilt this site, I chose 11ty. It felt like the right framework for me. It was JavaScript-based. I didn't have to reformat my markdown blog posts. It made sense.

Over more than two years of working with 11ty, I've regularly considered switching to a fancier and more powerful framework. And yet (at the time of writing), I'm still using 11ty.

While there are reasons for staying with 11ty that are specific to my site, there are a number of other reasons I continue to love 11ty outside the context of this site. Six reasons, to be exact. Here they are:

## 1. Time to Hello World

11ty (or Eleventy) is _super_ quick to get started. It's so simple that the getting started instructions are listed [on the home page](https://www.11ty.dev/).

Three commands and you have a website. No fancy tooling. Just a little HTML, a stripped-down web server, and you're up and running. If you then push to GitHub, wire up Netlify, and you have a live site in five minutes. Amazing!

Simplicity is at the core of 11ty, and that has never changed.

There's something elegant in its simplicity, especially when compared to all the fancy JavaScript frameworks today. Next.js has done a superb job of optimizing the developer experience, but getting started will never be printing a single line of HTML to a single file in a build directory.

## 2. Full Control over the Build

I love that there's no magic with the 11ty build. If you read and understand the documentation, you'll know how your content and templates will be translated to HTML, and that's _exactly_ what you'll see in the build directory.

And you can hook into the build process as needed. Want to minimize the HTML? Go for it. Want to strip out CSS and inline critical CSS? Okay. Do it. Or do nothing. It's your site. Your code. You tell 11ty what to do.

I'll admit that the other side to this argument is that teams of developers have obsessed over optimizations to improve developer experience, and that shouldn't be ignored. I agree. But the web is still HTML-first. And while that remains the case, plain HTML and full control over that HTML is difficult to beat (especially for beginners).

## 3. Motivated to Minimize JavaScript

There's no asset pipeline. There's no component framework. Everything happens on the server, during build time. HTML is pre-rendered (for the common case).

If you want to include JavaScript, _you have to work for it._ Again, there's something powerful in that. You have to make the conscious decision that you _need_ interactivity on a given page, and then figure out how best to create that interactivity.

The power of JS is undeniable. (And I _love_ JavaScript. I really do.) And yet, the power of _not_ using JS is liberating.

## 4. Encouraged to Separate Code from Content

Whether or not it was the intention, 11ty is content-driven. You can use templates, but you don't have to. You can have a simple markdown file and it will render as an HTML file during the build.

Separating code and content is a crucial attribute of modern websites, and 11ty leads you there. So just when you may start thinking this framework is promoting archaic practices, here you have a site that is still nicely organized by today's standards.

## 5. Easy to Migrate

Because code in an Eleventy site tends to be separate from the content, it's also easy to move that content to another content source when you decide to rebuild your website with a more powerful or "more modern" framework.

As your content and team grows, you may outgrow 11ty. That's okay. The beauty of that is that you're already in good shape to do so, at least from a content perspective. Having content in markdown files makes it trivial to move to another site or even to bring into a CMS.

## 6. Noble Community

Perhaps the thing I love the most about 11ty is that it's not about commercial success. Okay, yes, [it is now nearly fully sponsored by Netlify](https://www.11ty.dev/blog/eleventy-oss/). But Zach still has full control, and he is focused on what is best for the community.

Will we see some features appear because Netlify wants to prioritize them? Maybe. We started to see that a bit with server-side rendering. But in doing so, the other five points here were not sacrificed, and that's what's important to me. I expect that to continue well into the future.

## 11ty is Here to Stay

It's odd that something so simple doesn't immediately fall out of style. But I believe that 11ty has found its niche and the community cares deeply about that niche.

Because of that, I think 11ty is here to stay.

If my site continues to grow, it won't be able to run on Eleventy forever. But I'll continue to hold 11ty in high regard for the problems it solves and the focus it's maintained over the years.
