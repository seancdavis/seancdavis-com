---
title: How to Model SEO Content for Websites
description: >-
  Give flexibility and control to web content editors by building smart content
  models for SEO meta tags.
tags:
  - cms
image: /posts/220515/how-to-model-seo-content-for-websites-vaOneamY.png
seo:
  image: /posts/220515/how-to-model-seo-content-for-websites-55qnQjPK--meta.png
---

Building a system for editing SEO meta tag values is a commonly-overlooked part of building a website. It often appears in the final hours of a web project, distracting and often delaying the launch.

I’ve built and iterated on SEO content management so many times over the last decade that I figured it was time to write it down. Hopefully you can take something from this and apply it to your project.

The approach I’m presenting is more theoretical and less about a specific implementation. My aim is that you can use this as your foundation and apply it to the language, frameworks, and tools you’re using.

## SEO Modeling System Overview

When it comes to modeling any content for a website, it’s not a one-size-fits-all situation. The best content management experience is the one that best serves those who will be editing the content. Every project is unique in this way, though the foundation can often be shared.

This is the same approach I take when modeling SEO. I prefer to build my websites’ SEO systems in the following way:

1. Pick a set of foundational meta tags.
1. Allow for editing global default/fallback values.
1. Add the ability to override those values at the page level.
1. Sprinkle in the necessary amount of customization.

The following sections explore this process.

## Choosing the Right Meta Tags

We can add in the necessary nuance and flair for the individual situation as needed. But the base of any SEO system can be just three fields:

- Title
- Description
- Image

This is the minimum to make any page look presentable as it is shared on any number of platforms, from social media sites like Twitter to messaging services like Slack.

### Base HTML Meta Tags

That doesn’t just mean I’m only setting three tags. Quite the contrary. If we can make these three values required, then we can use that information to set a series of additional tags that will better present your site as it is shared.

Here are the minimum SEO tags I tend to set:

```html
<head>
  <!-- Basics -->
  <title>{TITLE}</title>
  <meta name="description" content="{DESCRIPTION}" />
  <meta name="image" content="{IMAGE}" />

  <!-- OpenGraph / Facebook -->
  <meta property="og:description" content="{DESCRIPTION}" />
  <meta property="og:image" content="{IMAGE}" />
  <meta property="og:title" content="{TITLE}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{URL}" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:description" content="{DESCRIPTION}" />
  <meta property="twitter:image" content="{IMAGE}" />
  <meta property="twitter:title" content="{TITLE}" />

  <!-- Other head content ... -->
</head>
```

Aside from the title, description, and image values, notice the following:

- `website` is hard-coded for OpenGraph.
- `summary_large_image` is hard-coded for Twitter. This means the preview will be [a large card with a large image above the text](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image).
- We need to know the \_full \_URL of the current page.

## Designing Global Defaults

Websites often have content that is shared among most pages. (Example: main navigation in the header.) It makes sense to have a mechanism for serving this global content. This is a common pattern you likely recognize if you’ve built a custom website.

SEO global fallbacks should follow this pattern, exclusively a safety measure. It is not a good practice for pages on a site to duplicate titles or descriptions, but rather to have unique meta content that properly describes the page.

### Pages Slip Through the Cracks

However, even if requiring SEO content at the page level, it’s possible that some pages will slip through the cracks. Especially when porting content over on large sites. It’s easy to miss one.

That said, ideally you’d do some sort of check before launching to catch these cases.

### Meta Image is Not Always Necessary

What I’ve found more frequently is that these fallbacks are necessary for pages that may not need an individual image, but could inherit from a global default.

This is more useful because you won’t get penalized by search engines for this. Popular search engines don’t make use of the data and are more concerned with having accurate titles and descriptions to better understand your page content.

## Taking SEO to the Next Level

Your editors may want more flexibility and customization beyond these basic tags. These are the three most common use cases I’ve run into and how I’ve implemented a solution:

### 1. **Avoiding Hard-Coded Values**

I mentioned above that I hard-coded the `og:type` and `twitter:card` values. This is because in most basic cases these don’t need to change. On larger or more advanced sites, that’s not the case, and I may need to add these fields. But when that happens, I often implement a more flexible solution (see next point).

### 2. **Specific OpenGraph and Twitter Tags**

In more complex editing scenarios, I’ve had to account for different content for `og:*` and `twitter:*` tags. In these cases, I often create another embedded model for OpenGraph and Twitter tags.

**I do not recommend this if you don’t have a good reason.** It’s not _just_ adding the models. This also requires additional logic that can get hairy. For example, for the `og:image` tag, you’d have to now check for an OG image, then an image on the page, and then an image on the global fallbacks.

And then when it comes to Twitter, should you fallback to OpenGraph if Twitter values aren’t set? Maybe. Maybe not. The point is there is a lot more to think about and it’s worthwhile to avoid it if you can.

### 3. Storing Custom Tags in a List Field

You may have noticed or already know that, aside from the first three tags, all meta tags follow the same structure:

```html
<meta property="..." content="..." />
```

Rather than looking to model specific fields for OG and Twitter, another approach that I’ve seen is to use a list type field and store values for `property` and `content`. This is a nice way to be super flexible and not have to worry about introducing additional logic.

The downside to this approach is that it requires more knowledge on the part of the content editor. A way to get around that is to present a list of possible values for `property` (dropdown/select field) rather than leaving it an open field.

## Additional Hints to Keep Things Simple and Working

Here are a number of other tips I’ve collected over the years that may help with building your SEO content system:

- **Full, Absolute URLs:** Remember when using URLs in meta content to use the full URL.
- **SEO Object: **I like to store these meta values as a nested object on a page. For example, I could render the meta title with `page.seo.title` rather than `page.title`. I’ve found that leaves the page object cleaner, especially since fields like `title` and `image` may have other, non-SEO uses.
- **Avoiding References: **Some CMSs are built in such a way that it’s not easy to embed SEO shapes into pages. In those cases, you may have to use a reference/association type of field. This isn’t ideal — it leads to more data, slower queries, and can be confusing for non-technical editors. If you can embed (see previous point), embed.
- **Page and Global Parity: **Use the same shape object (content model) for global defaults and the page-level overrides. Being consistent is a good practice, and this way you know that every field has a global fallback.
- **Editor Descriptions:** Add descriptions or help text to the fields to help your content editors. For example, for images, perhaps note the preferred size of an image (`1200 x 630`).
- **Auto-Generated Meta Images:** One super cool and useful pattern is to automatically generate meta images for each page. That ensures unique content when being shared and also frees you and editors from the burden of having to create an image for every page. [I outlined one approach here](https://www.seancdavis.com/posts/generate-meta-images-for-blog-posts-with-node/).
- **Escape Characters:** Because meta content is inserted as an attribute of an HTML tag, be sure to escape quotes and other characters as needed.
- **Smart Fallbacks:** I talked here a lot about global fallbacks, which are controlled manually by content editors. You could also add a fallback _between the page override and global defaults_ that looks at the page content and infers what it should use. For example, for a title, rather than falling back to the global default, if the page override is missing, take the content from the first `<h1>` on the page.

---

I hope this process has helped give you a basis and further inspiration for how to model SEO content for your projects!

I’m always curious to see how readers implement ideas like this for their site. Feel free to [drop me a line](https://twitter.com/seancdavis29) and we can talk SEO and content modeling!
