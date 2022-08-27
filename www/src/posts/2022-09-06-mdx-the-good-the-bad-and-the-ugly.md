---
title: 'MDX: The Good, The Bad, and The Ugly'
description: >-
  MDX is a very cool piece of technology. It gives developers a lot of power in
  authoring content. But it has enough challenges that suggest we’re ready for
  something better.
tags:
  - markdown
  - mdx
tweet: >-
  I’ve been hesitating to put this one out there for awhile. I see why folks
  (developers) like MDX. I really do. And it is absolutely a cool piece of
  technology. Very cool. Buuuut …


  I think we can do better.
image: /posts/220827/mdx-the-good-the-bad-and-the-ugly-7zRabGvw.png
seo:
  image: /posts/220827/mdx-the-good-the-bad-and-the-ugly-0JBEw-K0--meta.png
---

MDX is a very cool and useful piece of technology. But it's not without its challenges. Fortunately, I believe we can learn from and use the patterns established by MDX to move into the next generation of content (for developers) for the web.

## Why I Like MDX

One of the most valuable things MDX gave us was a _conversation_. The fact that I'm writing this post and thinking about the next generation of web content is, in large part, because MDX popularized a particular type of content editing.

### MDX Identified the Limitations & Potential of Markdown

MDX was the manifestation of several technologies that can be synthesized into a simple idea: _markdown isn't enough_.

If I consider foundational changes with markdown since it was released by John Gruber and Aaron Swartz in 2004, four pivotal moments come to mind:

1. [GitHub Flavored Markdown](https://github.github.com/gfm/) (based on [CommonMark](https://spec.commonmark.org/), which dates back to 2014) introduced core capabilities and syntax adjustments to Markdown.
1. YAML frontmatter was used to provide meta information about a Markdown file. I haven't been able to trace a history on this. My best guess is that Jekyll (from GitHub) introduced this in its early days (late 2000s, or early 2010s).
1. Server-side templating engines could be combined with markdown to first resolve HTML from the templating language, then parse the markdown, and leave us with static HTML. Again, I don't have a good sense of when this really picked up (perhaps this was also Jekyll), although it is a common pattern with many site frameworks today, including 11ty.
1. MDX introduced a similar concept as server-side templating, but combined with it client-ready JavaScript, making it trivial to add interactivity to MDX files.

When looking at the history of markdown, MDX is one of the most powerful unlocks of its usage in the last two decades.

### Developers can Move Fast

MDX led to the ability for developers to create _rich_ and _interactive_ content at speeds they had never known before.

To be able to work with interactive components (backed by a component framework) among plain text content was a truly powerful idea. Anyone who has worked on a project with interactive components and MDX files as the content source has certainly felt this.

### MDX is Ultimately Flexible

Part of the reason MDX is so fast to author is because of its flexibility. If I need to move a component around, I just move the (plain text) content around and it works. I don't have to worry about structure. I'm working with an open markdown file, so my bounds seem limitless.

### Ultimately Flexible, with Structure

I'm no expert with abstract syntax trees or [unist](https://github.com/syntax-tree/unist), but I _love_ that it's taking plain text content and turning it into structured content. It's a powerful concept, because it's providing _structure_ to something that is _flexible_.

The best we could get with Markdown was to build structured content using YAML frontmatter. _That_ is gross (to edit manually).

## Biggest Challenges of MDX

The innovation and the power of MDX are absolutely impossible to deny. It's been an incredible step forward. And now we're ready for the next step.

### We're Haunted by the (Static) Past

First off, let's step back before Markdown to understand why Markdown exists, which comes from the first sentence on the [v1.0.1 Markdown project page](https://daringfireball.net/projects/markdown/):

> Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML).

Markdown was built to get us _away_ from authoring content in HTML, which is _actually_ the worst. MDX has taken us right back into it. If you look at almost any MDX file, you will immediately feel like it's more HTML than Markdown.

### Flexibility is a Slippery Slope

You might say that if you can be disciplined about your components and have sensible global defaults, you can minimize the "markup" (JSX code, or the X in MDX) needed to make an MDX file more legible.

I would agree. 100%.

The challenge is discipline on that level is extremely difficult to accomplish, precisely because it goes against why MDX is so great — because it's flexible. Developers can create rich content quickly. And what happens when developers move fast?

Things get messy.

### MDX isn't (Really) a Templating Language

MDX parsers typically yield JavaScript code, _not_ HTML, like most templating languages. And unlike most templating engines, for MDX to be truly effective, it almost always has to be used with some other technology (usually a site framework).

Part of this challenge is because MDX gets parsed on the server, which produces code that can be run on a client. (It's technically a bit more complicated than that.) Because of this, I can't build a component that renders other MDX files, which is a fairly basic feature of content being processed on the server.

That means that if I want to share content in an MDX project, I either have to put the content in components (very bad) or build some other mechanism to manage shared content (worse).

### Not Easy to Transfer

Even though there is an AST, it's very difficult to see and parse that structure.

This makes transferring the content to a new source extremely difficult when compared to other solutions. I would argue that it's definitely easier than having a ton of [Mustache](https://mustache.github.io/) or [Nunjucks](https://mozilla.github.io/nunjucks/) components. But it's definitely not easier than plain makrdown or structured frontmatter.

You don't need to be weighed down by obsessing on the next step of your site. But if you're building a site and hoping to outgrow it someday, it is at least worth _considering_ the debt you're incurring when writing in a syntax from which it is difficult to escape.

## When I Would Use MDX Today

Given my conflicted feelings on MDX, I do still work with it regularly today.

If you aren't already working with it, I recommend MDX as a legitimately great solution when all of the following conditions are met:

- You are working with a project using JSX-based components.
- All of your content authors are comfortable working with code.
- You don't _need_ to reuse content _within_ content files.
- You will benefit _significantly_ from (i.e. you _need_ to use) interactive components.
- The interactive components you're using do not require a large number of properties (i.e. the markup can stay relatively clean).

## MDX Alternatives

If you're considering using MDX, I'd also encourage you to consider the following:

- [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx)**:** You may be surprised to learn that this gets you the core MDX functionality with much less overhead. It also predates MDX by almost two years. ([The first commit was in 2015](https://github.com/probablyup/markdown-to-jsx/commits/main?after=3cffbc9e618dd1b2d92fc7aab999ba64a169330f+454&branch=main&qualified_name=refs%2Fheads%2Fmain), compared [to MDX in 2017](https://github.com/mdx-js/mdx/commits/main?after=6690566c65647a98693aa5eaec5fb6995a16d4a2+1504&branch=main&qualified_name=refs%2Fheads%2Fmain).)
- T**raditional templating language (plus site framework):** Depending on what you're trying to solve, consider if a server-side language (even something as simple as [Nunjucks](https://mozilla.github.io/nunjucks/)) could get the job done. Note: This would usually be paired with a site framework like [11ty](https://11ty.dev/).
- **CMS:** At some point, when you have multiple authors, when you need rich content, it may be worth looking into a structured content management system. The editing experience may not be as nice or fast, but it also may be easier to work with and maintain, which could save the project time overall.

---

Like many tools, MDX suits some projects perfectly well, while it isn't a great fit for other projects. Regardless, it is undeniable that it is a cool piece of technology that pushed us forward.

Choose what's right for you today, but understand the debt that you may be digging for yourself. And let's use this conversation to work toward the next generation of content editing for developers.
