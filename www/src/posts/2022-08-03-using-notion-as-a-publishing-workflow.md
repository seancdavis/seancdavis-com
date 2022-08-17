---
title: Using Notion as a Publishing Workflow
description: >-
  To minimize friction in publishing new blog content, I went through an
  experiment that used Notion as a publishing engine. After three months, I’m
  posting at a rate faster than ever before.
tags:
  - productivity
  - notion
image: /posts/220803/using-notion-as-a-publishing-workflow-Qh5A2YYE.png
seo:
  image: /posts/220803/using-notion-as-a-publishing-workflow-Sh0UJGhN--meta.png
---

I really like having my own space for my content — a place where I have full control. But, as nice as that is, it's a lot of work to maintain.

All of the text content on this site is stored in markdown files in the repository, while the assets live in S3. Publishing a new post meant opening up the project locally, running the development server, writing, previewing, and committing. Then I'd have to create a meta image, upload it to S3, and adjust the frontmatter in the post.

The simplest of articles would take _at least_ 30 minutes to put together. That's not sustainable.

## Minimizing Friction in the Publishing Process

There are two really nice benefits with publishing on a platform like [dev.to](https://dev.to/):

- The site is maintained for you — all the "plumbing" (including SEO capability) is in place.
- There is minimal friction in the publishing process. You write in their editor, click publish, and then the post is live!

I didn't want to lose the unique identity of my site. Instead, I set out on an experiment to **minimize the friction of my publishing process**.

## The Experiment: Notion as a Publishing Engine

I decided to try to make Notion my publishing vehicle. For this experiment to be successful work, I'd have to be able to do the following:

- Never (or _rarely_) have to run the project locally to publish new content.
- Allow me to add rich components to the post — callouts, videos, playgrounds, etc.
- Provide a preview before publishing.
- Automatically generate meta images.
- Automatically share a link to the post on social media.

### Why Not Use Notion as a CMS?

You may be thinking (as I did): _Why not use Notion as your CMS?_ If it's going to handle all the content, isn't it just a CMS?

No. I specifically wanted _a publishing engine._ Storing text content in markdown files is a pattern I love. Until outgrowing file-based content (Git CMS), it's tough to beat.

To make Notion a CMS would mean _many_ more considerations, including versioning, previewing, uptime, asset management, etc. Perhaps more than anything, I need offline access, which Notion does not provide. While it may work for some, I didn't want Notion to be a source of truth, but rather a means to minimize friction.

## Building the Experiment

In the end, the MVP (minimal viable product) version took two weeks to prove as a proof-of-concept, and another two weeks to build. Three months later, I'm actively using the process and publishing at a rate faster than ever before.

## The Publishing Workflow

{% post_image alt="", src="/uploads/220803/notion-content-hub.png" %}

Here's how it works:

1. **Write content in Notion:** I am already managing all my posts as tasks on a Notion board. Now I use the tasks to write drafts for new articles. _See below for details on how I add components to posts._
1. **Set publishable status:** When I'm ready for a post to be published, I set its status (move it into a specific column on the board).
1. **Run the script:** [A GitHub action](https://github.com/seancdavis/seancdavis-com/blob/c671337f275fd057842ddcf2fda3ae9bf258fd1d/.github/workflows/notion-post-publisher.yml) runs [hourly during my workday](https://github.com/seancdavis/seancdavis-com/blob/c671337f275fd057842ddcf2fda3ae9bf258fd1d/.github/workflows/notion-post-publisher.yml#L4-L5), or can be [triggered manually](https://github.com/seancdavis/seancdavis-com/blob/c671337f275fd057842ddcf2fda3ae9bf258fd1d/.github/workflows/notion-post-publisher.yml#L3). It is responsible for [calling the script that handles the transformation](https://github.com/seancdavis/seancdavis-com/blob/c671337f275fd057842ddcf2fda3ae9bf258fd1d/.github/workflows/notion-post-publisher.yml#L22-L31).
1. **Transform Notion page into markdown file(s):** [The script](https://github.com/seancdavis/seancdavis-com/blob/c671337f275fd057842ddcf2fda3ae9bf258fd1d/packages/notion-post-publisher/src/index.ts) transforms all Notion pages with the appropriate status into markdown files. This includes mapping properties to frontmatter, mapping content to components, uploading images, transforming rich text, and more. _See sections below for more details_. At the end of this process, the script adjusts the status of the Notion page noting that the transformation has occurred.
1. **Generate meta image:** When the Notion publisher script has completed, the GitHub action [calls another script](https://github.com/seancdavis/seancdavis-com/blob/c671337f275fd057842ddcf2fda3ae9bf258fd1d/.github/workflows/notion-post-publisher.yml#L32-L39) that generates a meta image, uploads it to S3, and then adds the reference to the frontmatter of the post.
1. **Commit, push, and open a PR:** The GitHub action also does all this work to [commit, push, and open a PR](https://github.com/seancdavis/seancdavis-com/blob/c671337f275fd057842ddcf2fda3ae9bf258fd1d/.github/workflows/notion-post-publisher.yml#L40-L48) (with the help of [this action](https://github.com/peter-evans/create-pull-request)).
1. **Preview content:** The pull request kicks off a preview build on Netlify, which lets me preview the content before it is published.
1. **Publish post:** I look at the preview, adjust if necessary, and then publish. If I need to make edits, the [GitHub Web Editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor) is a handy tool that helps me avoid running the project locally to make minor changes.
1. **Share to Twitter:** After publishing, a Netlify plugin triggers a separate GitHub action, which triggers another script responsible for scanning the repo for new posts and [automatically tweeting links to them](/posts/automated-tweets-after-successful-netlify-build/).

### Mapping Blocks to Components

One of the crucial features of this project was the ability to map _blocks_ in a Notion page to _components_ within my site. A couple of examples:

- My site includes the ability to add filenames to code blocks.
- I have a few specific types of callouts.

What I had to do was simply create some type of rule for each transformation.

For the filenames, there wasn't much else to do other than to write the content directly. So I add what is essentially [Nunjucks code](https://www.11ty.dev/docs/languages/nunjucks/) in the Notion page, and it gets transformed directly. This was one of the uglier solutions, but it works.

For the callouts, Notion has callout components. But only one type. So I built a map. If a callout [has a certain emoji](https://github.com/seancdavis/seancdavis-com/blob/c671337f275fd057842ddcf2fda3ae9bf258fd1d/packages/notion-post-publisher/src/lib/blocks/CalloutBlock.ts#L6-L11), it gets mapped to a specific type of callout on the site.

All the magic gets kicked off in [this function](https://github.com/seancdavis/seancdavis-com/blob/c671337f275fd057842ddcf2fda3ae9bf258fd1d/packages/notion-post-publisher/src/lib/Block.ts#L87-L100).

### Mapping Properties to Frontmatter

My posts all have frontmatter content that drives how and where they are rendered on the site. It also includes useful properties like pointing to the meta image.

Some of this content had to come in the publishing process. For example, the excerpt (which also feeds into the SEO description) had to be set in Notion.

To solve this problem, I made properties in my Notion pages and then had the script [transform these properties into frontmatter](https://github.com/seancdavis/seancdavis-com/blob/c671337f275fd057842ddcf2fda3ae9bf258fd1d/packages/notion-post-publisher/src/lib/Post.ts#L56-L66).

## Next Steps

After three months, this is working really well for me. I can publish with minimal friction without losing all the benefits I get from using markdown-driven content in my 11ty site.

At some point in the near future, I plan to take another pass over this tool and make it even more robust. Using it for three months has helped me identify rough edges and improvement opportunities.

I may also look to build some cohesion around Notion, meta images, and social sharing, as they are all separate processes today.

### Sharing Workflow as a Package

What I'm unsure about is how much others would use a tool like this if I took the time to make it more generic and publicly consumable. Would you use this if it were configurable to your needs?

If you'd use something like this in your project, [send me a message](https://twitter.com/messages/compose?recipient_id=23583938). I would love to work against specific use cases as I build the solution.
