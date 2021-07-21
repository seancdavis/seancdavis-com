---
title: "WTF is Markdown?"
description: "Markdown is a powerful syntax and tool that enables us to more easily write content for the web."
image: /blog/210721/wtf--markdown.png
tags:
  - wtf
---

Markdown is a readability-focused way to author content for the web. You can think of it as a _language_, although it's _technically_ not. That's because browsers can't read markdown. Content on the web must ultimately be [HTML](/blog/wtf-is-html/). Therefore, markdown is really two things:

1. A _syntax_, or a specification on the behavior of specific characters.
2. A _tool_ that converts the markdown syntax into valid HTML that web browsers can parse.

## Syntax Overview

While I encourage you to refer to the [CommonMark spec](https://commonmark.org/), or [the original spec](https://daringfireball.net/projects/markdown/syntax), here's a taste of markdown to show you how it gets out of your way, unlike HTML.

If you want to add a heading in HTML, you need an opening and closing tag, like this:

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

With markdown, you use a series of hashes at the beginning of the line to indicate 1) that it is a heading, and 2) which level of heading it should be.

The above HTML, written as markdown, looks like this:

```md
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

More than anything, markdown is a minimalistic means of specifying structure to your content. It's easy to read and write the content while still understanding its structure.

## Why Use Markdown?

There are many _more_ reasons to use markdown. Shoot, I'm using it right now in an application called [Bear](https://bear.app/). But of all the reasons, this is why I write with markdown virtually every day:

- Markdown is **application-agnostic**. It's just text and a specification on how that text should be structured and displayed.
- That also means markdown is **future-proof and portable**. I can take it out of one application and it's still just markdown.
- Markdown is **widely used and supported**. I use it almost anywhere I'm authoring content, except for email.
- Markdown is **readable on its own**. Even if using in a space that does not support markdown, it's still relative easy to understand what's going on without having to parse a bunch of HTML code.

## History and Variations of Markdown

Markdown [was created by John Gruber in 2004](https://daringfireball.net/projects/markdown/). The "official" syntax can be found [here](https://daringfireball.net/projects/markdown/syntax), though there are variations on it which extend its behavior. One of the most popular is [GitHub Flavored Markdown](https://github.github.com/gfm/), which adds a few features like [tables](https://github.github.com/gfm/#tables-extension-), [task list items](https://github.github.com/gfm/#task-list-items-extension-), and [strikethrough text](https://github.github.com/gfm/#strikethrough-extension-).

## Markdown Parsers

The original markdown parser was written in Perl. Today there are many parsing libraries available to you, depending on the language you're using.

For instance, if you're using JavaScript, there's [remark](https://github.com/remarkjs/remark), [markdown-it](https://github.com/markdown-it/markdown-it), [commonmark.js](https://github.com/commonmark/commonmark.js), and many others.

They tend to be fairly easy to discover, too. [Here's a nice article from CSS-Tricks](https://css-tricks.com/choosing-right-markdown-parser/) if you're having trouble finding or choosing the right parser for your project.

## References and Next Steps

There are tons of references out there, so I won't go through an exhaustive list. But I'll start you with [_The Markdown Guide_](https://www.markdownguide.org/), which is an excellent resource when getting started. In fact, their [_Getting Started_ page](https://www.markdownguide.org/getting-started/) is a great place to jump to next.
