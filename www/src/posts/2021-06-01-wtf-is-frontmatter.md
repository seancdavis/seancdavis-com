---
title: "WTF is Frontmatter?"
description: Frontmatter is a really powerful pattern in software development these days. What exactly is it and why is it so great? Let's explore that together!
image: /posts/210601/wtf--frontmatter.png
tags:
  - wtf
---

Frontmatter is a software development pattern that I personally love and use _all the time_. I first came across it when working with [Jekyll](https://jekyllrb.com/docs/front-matter/) many years ago, though there may be earlier implementations of it.

What frontmatter enables you to do is specify metadata about a file. It is most often written in [YAML](/posts/wtf-is-yaml/), while the main content of the file may be written in another language, often a content or templating language like markdown or [HTML](/posts/wtf-is-html/). YAML is a good fit for frontmatter because it is specifically designed to get out of your way — to be concise and readable.

You'll often find frontmatter in places where the main content within a file is to be displayed, but requires additional content beyond the main portion of the file to know _how_ to display that content.

Let's take a look at an example.

## Understanding Frontmatter through an Example

Let's use a blog post for an example. Let's say that you have a blog where your posts are written in markdown. Each post has a title that you specify at the top of the file in an `<h1>` tag, and you then share a list of tags below that. It looks something like this:

```md
# Hello World

Post Tags:

- foo
- bar

And here is the body of the post ...
```

If this is the pattern you follow, then you'd have to write this out on every blog post. You probably need some special parser to find where your tags are, and that's prone to bugs.

Instead, you can build _structure_ about your post and abstract that from the part that really matters — the main content. We can use frontmatter to define the `title` and `tags` for the post like so:

```md
---
title: "Hello World"
tags:
  - foo
  - bar
---

And here is the body of the post ...
```

And then whatever tool is consuming and building out these posts can be more structured so that you have more control over how the title and tags look on every page.

## Why Frontmatter is Important

Frontmatter is unique because we're actually combining two different languages (YAML and markdown in our example) in the same file. We're using YAML to share information about that file.

Without frontmatter, if we wanted to maintain a structured approach (like in our example), we'd have to define that information _somewhere_. In our example, if frontmatter weren't a thing, that means we'd need a separate file to tell us what those things are. The main content might be in `my-post.md`

`my-post.md` {.filename}

```md
And here is the body of the post ...
```

While the meta info about that post lives in `my-post.config.yaml`:

`my-post.config.yaml` {.filename}

```yaml
title: "Hello World"
tags:
  - foo
  - bar
```

It's just one more thing to worry about. With frontmatter, we can keep all necessary information about an object together. That's super convenient for editing.

## Frontmatter Interpreters

Interpreting frontmatter was kind of a DIY sort of thing for many years while it was a newer concept. Now that it's been more widely adopted there are libraries out there to help you.

For example, one that I work with frequently is [gray-matter](https://github.com/jonschlinkert/gray-matter), which is a [Node.js](/posts/wtf-is-node/) library that will read text and provide the frontmatter as an object and the main content as another object.

There are all kinds of libraries out there now. You will likely be able to find one in your programming language of choice.

Now go build some super awesome files with metadata! And don't forget to [tell me about it](https://twitter.com/seancdavis29)!
