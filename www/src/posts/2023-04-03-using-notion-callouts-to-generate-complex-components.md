---
title: Using Notion Callouts to Generate Complex Components
description: >-
  Exploring a theoretical approach to enabling Notion to serve as a CMS for
  complex websites with interactive components.
tags:
  - components
  - cms
  - inspiration
  - notion
image: >-
  /posts/230403/using-notion-callouts-to-generate-complex-components-_xzfdzh_.png
seo:
  image: >-
    /posts/230403/using-notion-callouts-to-generate-complex-components-ZDW7mBiS--meta.png
---

{% youtube_embed id="h6AO-WYB_4c" %}

This is part of a four-part series on showing the potential of Notion as a CMS for complex websites:

1. **Using Notion Callouts to Generate Complex Components**
1. [Accessing a Notion Database Using the API](/dd8daa7e418e45958427d673acd7d458)
1. [Write Notion Page and Block Data to JSON File with Node.js](/75e8127c9a50405e888b23132f893ecf)
1. [Transform Notion API Data into Component-Ready JSON](/4e4449e6cc524ddda5c6649f306ef945)

---

A world of possibilities was unlocked when Notion released its public API. Creative uses of Notion have continued to enter the scene since then, but perhaps none as common as _using Notion as a CMS_.

Give it a search and you'll find dozens of articles and even a few tools to help in the process.

## Perfect for Simple Sites

Being a content source for a website is a fantastic use of Notion. It's a thoughtful editing experience with an abundance of keyboard shortcuts that makes creating content with Notion a breeze.

### Limited Component Types

One of the things that makes Notion a great editing tool is the limited number of block types available to use. You never really have to think too hard about what block to use, because there are only a few to choose from.

### Blocks are Primitive HTML Elements

For the most part, each of these common block types is Notion's representation of a primitive web element (paragraph, divider, list). This is another reason working with Notion is so great — most of what we're working with are elements we're used to seeing on the web.

### Not Built to Expand

And because of this, Notion serves simple sites best as a CMS. Take a blog site as an example. Typically, a simple personal blog doesn't require much — typical typography patterns, along with images, media, and perhaps code blocks. Notion can support all of these components one-to-one and would be a great choice as a CMS.

## Notion Doesn't _Seem_ Great for Most Sites

Notion's blocks are built to serve content created in Notion. While flexible, it's meant more for building structured pages, and not rich and interactive web pages. It can be challenging to envision stretching Notion beyond serving the basic site.

### Shouldn't Be Limited by Content Source

And, on one hand, that's okay. You shouldn't be limited by your content source. You can do so many things on the web that tooling should not be the thing to get in your way.

If your content source can't flex in a convenient way to show what you want on the front end, it's probably not the right tool for you.

With Notion, you can add a code block, which can translate well to a technical blog. But if I wanted to attach a filename or label to the block (which I do on this blog), there isn't a good way to do that with the basic Notion blocks.

### Custom Components

Beyond basic examples, most websites are built with a collection of custom components. Even basic sites may run into challenges using Notion as a CMS because it doesn't serve many common components.

For example, a tab component that shows/hides content underneath is a fairly common pattern on the web. They often appear on very simple sites. There isn't a great way to handle tabs with Notion. You _could_ use a nested toggle block, but even if you solve that problem, you'll run up against another component limitation soon enough.

## Repurposing Basic Notion Blocks

But, we don't have to stop there and look for another CMS! Notion is a _structured_ and _visual_ way to build content, and it would be a shame to walk away from it as an option if you only anything more than the most basic site.

Instead, just as we dream up component systems in front-end code, we can design our own (opinionated) Notion block system that maps to components on the front end.

### Structured Content and Flexibility are Key Ingredients

While Notion generally only offers a small set of components, these components are _flexible_ and _structured_. Everything is backed by structured content. And it's all accessible via an API. So if we can design some system for how something in Notion translates to more complex components in code, we can make Notion work as a CMS for many more sites.

### Leveraging Callout Blocks

One basic block that Notion offers that isn't an HTML primitive is the callout block. Sure, many sites have callout components, but the callout block in Notion has something none of the other blocks do: icons.

Every callout block has an icon. We can use that icon to provide instructions to the code on which component should be used on the front end to serve the callout content within Notion.

And we can combine this icon map with the flexibility in Notion to _nest_ child blocks underneath parent blocks. We can even put callouts inside of callouts and further expand how Notion blocks are rendered on a site.

For example, rather than using a toggle component for tabs, we could use a callout with a tabs icon that had a series of child callout blocks to represent each tab. So something like the example below could translate to interactive components on a site.

{% post_image alt="", src="/uploads/230403/notion-tabs.png" %}

## Building a Proof of Concept

Bringing this idea to life is a real challenge. The end result is so super specific to your site that the system designed in Notion is going to be opinionated and slightly brittle. But that's also where the power comes in.

And the code will get complex pretty quickly. But the result is _extremely_ powerful.

To demonstrate all of this, I'm going to take you through a four-part series (this is part one) where we build a foundation you can apply to your site.

### A Primitive Example and Two Callout Examples

We'll first set up a basic mapping for paragraph blocks, then address two specific callout situations: a tab component (like the one shown above) and a code block that supports a filename, also done through a callout block.

{% post_image alt="", src="/uploads/230403/notion-code-block.png" %}

In the end, we'll have pages that look like this from components in Notion.

{% post_image alt="", src="/uploads/230403/website-page.png" %}

### This is Only a Foundation

This series is meant to provide the basics and possibilities. The end result is the foundation of a tool you can expand to your liking.

Because of this, I'll be cutting a few corners that I'd otherwise address if building this for my site:

- We'll only build the three examples mentioned above.
- Child blocks won't be considered on the front end unless of specific use in callouts.
- Rich text is ignored — no bold, italic, code, or emojis. All plain text.

This will keep us focused in only addressing the guts of the system.

### The Parts

Here's what we'll cover:

1. **Using Notion Callouts to Generate Complex Components** (this one)
1. [Accessing a Notion Database Using the API](/dd8daa7e418e45958427d673acd7d458)
1. [Write Notion Page and Block Data to JSON File with Node.js](/75e8127c9a50405e888b23132f893ecf)
1. [Transform Notion API Data into Component-Ready JSON](/4e4449e6cc524ddda5c6649f306ef945)

## Other Solutions

Last, I should mention that I've considered other solutions, and there may be a better approach for your needs.

### Using Text is a Mistake

One thing I can say with certainty is that using text to do some magical mapping is a mistake. I actually do this on posts I publish on my site. When I want to add a filename to a code block, I add `{.filename}` above the block (which is a one-to-one use to the markdown parser that generates the filename).

This seems _super_ flexible, and it is. But it's also _really easy_ to make a mistake.

While a callout icon mapping system is opinionated, it's a concise set of options that can be chosen visually and with clicks. You can choose an icon that isn't supported or choose the wrong icon, but if you keep it to Notion's provided icons, it's much harder to make a mistake.

### Can Be More Opinionated in Some Cases

And in some cases, you'll need to be more opinionated. Callout blocks may have to have specific child callouts that also have specific icons. This makes the system more brittle, but also more flexible.

I'd suggest keeping the callout system as simple as possible at first (so it's convenient and productive to work with in Notion), and introduce that complexity only as needed. In other words, design it with the editing experience in mind, not for code conveniences.

---

And with that, it's time to jump into Part 2 and get things set up!
