---
title: Global Content IDs to Minimize Risk in Changing URLs
description: >-
  Use a unique value within a URL and make the rest arbitrary. This way you have
  flexibility to change URLs without breaking functionality for your visitors.
tags:
  - quick-tip
image: >-
  /posts/220818/global-content-ids-to-minimize-risk-in-changing-urls-7j38ehuo.png
seo:
  image: >-
    /posts/220818/global-content-ids-to-minimize-risk-in-changing-urls-l4IzL9HO--meta.png
---

I do most of my writing in Notion these days, and I've recently paid closer attention to how URLs change as I change content. Take a look at this:

{% post_image alt="", src="/uploads/220818/notion-global-content-id.gif" %}

Notice that the URL includes the title of the page at first. When I erase it, there's a long obscure value. And when I add a new title, the title begins to appear in the URL, with the obscure value appended to the end.

## Global Content ID Explained

What Notion is doing is apply a _global ID value_ to this particular page. It doesn't matter what the page's title is. The content ID is always going to be attached to the page.

It can be nested anywhere. Moved to another database. Deleted. Doesn't matter. The ID stays the same.

## Applying Global IDs to Your Site

You can do the same thing with the pages on your site. How this works depends on your web framework and content source(s). But, generally speaking, it's possible.

In most cases, you would parse the end of the URL (for example, all characters after the last dash) and use that to match the appropriate content.

## Building Arbitrary URLs

The result of this practice is that (depending on your setup) the URL segments are essentially meaningless. You (or your content editors) can change them, and it doesn't matter. You're still going to be able to find the correct page and render it.

## Accounting for SEO

There is a side effect to this approach, which is that you can then have an endless number of URLs for any given page. That's great for delivering content, but not so great for long-term SEO value. You still want Google to think you only have a single URL for a given page.

Therefore, I'd suggest having a single go-to URL for each page, and being diligent when changing URL values for any given page.
