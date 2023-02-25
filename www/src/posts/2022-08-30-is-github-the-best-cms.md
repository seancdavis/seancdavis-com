---
title: Is GitHub the Best CMS?
description: >-
  It seems like a silly question, given that GitHub is not typically thought
  about as a CMS. But I analyze the question anyways, using a series of 11
  factors.
tags:
  - cms
  - git
  - github
image: /posts/220823/is-github-the-best-cms-a0RJXUUv.png
seo:
  image: /posts/220823/is-github-the-best-cms-chNc1KZ6--meta.png
---

Back in 2018, I was evaluating several headless CMSs with [@tcmacdonald](https://twitter.com/tcmacdonald). Our goals was to identify 2-3 go-to recommendations for our clients. Amid this search, Taylor prompted me with an intriguing question:

> Is GitHub the best CMS?

We discussed it briefly, but brushed it aside and continued with our research. And yet, some form of that question has pestered me over the years — enough that I've given in and decided to write about it.

Let's explore the question together: _Is GitHub the best CMS?_

## Wait. Is GitHub Even a CMS?

One of the reasons I loved this question from the minute I heard it was because most of us don't think about GitHub as a CMS. Because it's not meant to be. Not _really_.

It's a service for hosting and manipulating code repositories using Git.

### What is a CMS?

A CMS (content management system) is software that enables editors to manage content that can be made available to developers to present in one or more front-end sites or applications.

Using that logic, GitHub is _absolutely_ a CMS. Just as much as Notion can be a CMS. They both provide a means for editing _content_, along with a way to extract that content from their system for use in web code.

### A History with Content

Content management has actually been a substantial feature within GitHub since its early days. GitHub developed [Jekyll](https://jekyllrb.com/), arguably the longest-lasting (popular) static site generator (SSG).

Jekyll was built to work with GitHub Pages (another early feature), which enabled developers to quickly and cheaply build and deploy websites using files as the content source.

In other words, while it may seem silly to be considering a tool to be better than an entire class of other tools in which it is not trying to compete, **content management has really always been a core capability of GitHub.**

## Using GitHub as a CMS

In considering if GitHub is the best CMS, we should also consider what it means to use GitHub as a CMS. Unlike CMS-specific services, the use of GitHub as a content source is not as prescriptive. But generally, it means the following:

- Content is stored in files within a Git repository. They can be one or more of many types — JSON, Markdown, MDX, YAML, etc.
- The front end(s) may or may not live in the same repository as the content.
- When delivering to a front-end application, content can be consumed directly from the files or via GitHub's API.

### Clarification on Git CMS

To clarify, I'm not talking about a Git CMS, such as [Forestry](https://forestry.io/) or [Netlify CMS](https://www.netlifycms.org/). These are editor interfaces and API mechanisms placed _on top of_ Git providers (like GitHub). They play a role in making the case for GitHub as the best CMS, but I'm focused exclusively on GitHub for this article.

## What We Want in a CMS

In the time I've spent studying common CMS features, balanced with the expectations of content editors, I've identified a series of core areas on which to evaluate a content source provider.

The areas are extensive, not exhaustive. It's enough to reasonably evaluate the capabilities of any given CMS, focusing on an equal balance of value for all involved in working with a CMS.

Let's step through each topic and consider how GitHub measures up to more common CMS products.

### Cost

GitHub is nearly _unbeatable_ when it comes to cost. If you're using a personal repository, it can be completely free. Working with organizations introduces more cost, but it's on a much smaller scale than the typical CMS.

For example, a GitHub organization is [$4 per user per month](https://github.com/pricing), while DatoCMS (one of the less expensive CMS options) is $99 per month for 10 users (about $10 per user per month).

GitHub is _extremely_ affordable. _However_, when it comes to pricing CMSs, cost can have a direct correlation to the amount of content stored, which will come into play in the next section.

### Performance & Scalability

On a small scale, it's tough to tell the difference between using GitHub as a CMS compared to an API-based content source. Although this is _highly_ dependent on how you are loading content and if that loading mechanism is optimized.

Without a doubt, there's an excess of nuance to consider. But, at a high level, when it comes to scalability, file-based content does not scale as well as database-driven and API-based content. Frankly, it's not even close when you get into the hundreds of thousands of records.

That said, there's a tradeoff. The scale of content for typical CMS solutions can drive the cost up quickly and, in some cases, unpredictably. If you have a site with a lot of content, file-based content storage is not the solution. But, you're going to pay a lot for the right solution.

### Reliability

The importance of reliability in working with a CMS is directly related to whether or not constant access to content is a critical function. And the answer to that tends to depend on how much content you are prerendering.

Many sites out there do query an API-based CMS at runtime, which makes reliability super important. But when using file-based content, it's more likely that nearly all that content will be prerendered.

Regardless, it's difficult to track down how GitHub compares to CMS providers in historic uptime. So, while this category is important to consider based on your expected retrieval methods and frequency, I find it to be a wash because it's so highly contingent on the specific use case.

### Content Modeling

Solid content modeling features in a CMS can lead to the balance of both _flex_i_bility_ and _productivity_ — the ability to move quickly and build data structures in any way.

It's tough to beat file-based content for flexibility. They are plain text files and can have content structured in nearly any way. But, this requires manually parsing the content. _You_ have to build the structure. Although there are some tools out there (I helped bring [Contentlayer](https://contentlayer.dev/) to life, which is a great option here), this tends to be a lot of work.

When you take a CMS like Contentful, it can be super tedious to build up content models. Typically, once it's built, it's solid. But, in some cases, the flexibility within content models can be limited. For example, Contentful does not allow for nesting rich objects within the field of a model.

With file-based content, you can build and flex super fast, but you have to do the work, which can be _very_ time-consuming. So, again, probably a tie here. The balance of benefits are contextual.

### Editing Experience

There's not much of a match here. [GitHub.com](http://GitHub.com) is not built to be a CMS. It's getting better, but it's unlikely to ever be the content-editing experience of a true CMS.

But, GitHub has an open API. So, when paired with another tool — [Forestry](https://forestry.io/), [Stackbit](https://stackbit.com/), [Netlify CMS](https://www.netlifycms.org/), etc. — it can become super powerful.

But we're talking about GitHub on its own, so we'll give this one to the CMSs.

### Asset Management & Delivery

When it comes to file-based content, asset management typically means storing files in a Git repository, which is ... undesirable. But, you can easily use an S3, Dropbox, Imgix, or any other cloud-based service, and use some sort of link or key as the value in an image field, and then resolve that field into a rich image at build time or runtime.

In contrast, many CMSs out there have their own asset management functionality and delivery CDN. They are optimized for upload, manipulation, and delivery.

Regardless, to _truly_ optimize images on your site, you have to do a lot of work on the front end, or rely heavily on your site framework. Because GitHub leaves the option open, I could also give this one a tie, although a slight edge to CMSs.

### Version Control

Git _is_ version control. Enough said?

Yeah. GitHub wins this one.

### Collaboration

Collaboration with content management is _extremely_ difficult. Very few CMSs have figured out how to do this elegantly. I've been in situations (recently) where two users editing the same record were constantly overwriting the other's changes.

Git, at the very least, _protects_ against this with its built-in conflict resolution tooling.

The downside is that if you have a conflict with Git, it's not reasonable to ask a non-technical person to resolve that conflict. Whereas, non-technical folks can usually resolve conflicts in CMSs without developer intervention.

### Omnichannel

_Omnichannel_ refers to the ability to have a single source of truth with content, with one or more front-end applications consuming the content. This is an inherent feature of nearly any API CMS.

With Git, it can be done, and without much difficulty through features like [submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). You can have content in a single repository and pull it into multiple front-end build processes. It's not as streamlined of a process, but it works.

I'll give a slight edge to other CMSs here.

### Internationalization / Localization

This one is tricky. If a CMS has support for internationalization (translation), then it has the edge in this category, hands down. Not all CMSs support it, but those that do generally handle it well.

Like content modeling, you can do whatever you want with file-based content. But you have to write custom code to make it work.

While this depends on the CMS provider, I'd give the edge to the CMSs, as I've seen more and more coming out with support for translations.

### Content Previews

Almost no (headless) CMSs out there today let you preview content _within the context of your site_ unless you make a significant effort to make it happen.

I find GitHub to have the edge here because file-based content is a great fit for a publishing working using pull requests. Coupled with webhooks wired up to the deploy/hosting solution (Netlify, Vercel, etc.), and you have automatic previews before deploying.

File-based content has better previewability today.

## Okay. So is GitHub _Really_ the Best CMS?

I'm going to do what I usually do in these situations and say ... _It depends_.

I (strongly) believe that the best CMS can only be decided within the confines and context of the project(s) it is serving. To choose the best CMS is to [choose the right tool for the job](/posts/choose-the-right-tool-for-the-job/). And that tool is not the same for every job.

For a great many sites out there — hobby projects, personal sites, (most) blogs, medium-sized marketing sites — using local content is a fantastic option when those editing content can understand how to work with structured files.

Then pair the solution with a service like S3, [Cloudinary](https://cloudinary.com/), or Imgix for hosting and delivering visual assets, and you yourself an amazing tool for very little cost.

But file-based content (GitHub as a CMS) falls down at scale. At some point, reading content from files is not as efficient as reading content from an optimized database, or retrieving it from an API. It also lacks features necessary to most teams operating websites at scale. Large-scale and enterprise-type sites require leaning on industry leaders, like Contentful, Agility, and Sanity. Cost will rise, but that's unavoidable with a site at scale.

[Choose the right tool for the job](/posts/choose-the-right-tool-for-the-job/), but don't discount GitHub as your go-to CMS for smaller sites.
