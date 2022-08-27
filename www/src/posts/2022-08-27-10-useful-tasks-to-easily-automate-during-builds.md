---
title: 10 Useful Tasks to Easily Automate During Builds
description: >-
  Common automation approaches to build up your confidence in deploying to
  production.
tags:
  - testing
  - seo
  - performance
tweet: >-
  When I step back and look at how everything is orchestrated for my simple
  site, it’s amazing how it all fits together. 🤩


  Here is a list of tasks I’m running during builds today.
image: /posts/220827/10-useful-tasks-to-easily-automate-during-builds-jJ8w56Kg.png
seo:
  image: >-
    /posts/220827/10-useful-tasks-to-easily-automate-during-builds-bvV7GF2Z--meta.png
---

Build tooling has become powerful and flexible enough that you can essentially do _anything_ you want during the process. I've worked many functions, checks, and other fun ideas into builds over the years, and wanted to collect them all here for your inspiration.

## List Clarifications

Before we get into the list, there are a few clarifications I should make.

### Considering the Intensity

Almost every example in the list could be taken to an extreme. This list is really just getting you started. You have to decide the extreme to use for your site.

### Omitting Typical Actions

There are a number of actions that are core to the continuous integration, delivery, and deployment that has been around for years, including:

- Running tests
- Bundling and compressing code
- Generating and deploying supporting CSS and JS assets
- Deploying code to production
- Releasing a new version
- Sending status notifications

What I've included in the list below is aimed more at tasks you may not commonly associate with automation or your build process. But automating these tasks can save you a ton of time, reduce friction in your publishing process, and make you more productive.

## Tasks You Should Automate

Here are a number of tasks that I've automated over the years, many of which I continue to use for the time and hassle they save me. (This list is is no particular order.)

{% callout type="note" %}
In most of these cases, I have not prescribed a specific method for achieving the result. This is dependent on the service and/or languages that you're using.
{% endcallout %}

### 1. Checking for Broken Links

When I discovered that you could automate broken links, it changed my life. I can now publish with the confidence that I am not deploying content with broken internal links that would result in a 404 not found error.

Note that many of the tools that can help you achieve this will support the ability to determine whether to check both internal and external links. Personally, I tend to not test external links. They slow down the build _significantly_ and aren't as crucial to the continuity of the reading experience on this site.

Alternatively, I've considered running a period check for all links to catch broken external links as well.

### 2. Catching Accessibility Errors

There are a wide range of a11y tests you can run against your site. But even if you aren't comprehensive, a few small tests — e.g. finding missing `alt` attributes on images — can go a long way in helping more people access your content.

### 3. Properly Formatting Code

You can _check_ if code is formatted according to some set of rules ([Prettier](https://prettier.io/), [ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/), etc.) and choose to fail the build if it is not.

Some of the tools (like Prettier) also allow for automatically formatting code and saving the result. If you do this, you probably also want to ensure you've run the appropriate checks after that automated commit, to ensure nothing was broken in the process.

### 4. Generating a Sitemap

A fairly common case is to generate a sitemap from the pages in your site at build time. It's nice to set this up once, forget about it, and have confidence that search engines can find your content.

### 5. Validating SEO Values

On a similar note, you can check all your content to ensure that every page contains the appropriate SEO fields — title, image, description, and anything else you'd like to include.

### 6. Generating Meta Images

This is one that [I built myself](https://github.com/seancdavis/seancdavis-com/tree/0497567d750b8feae8dd09358268935c28bd29ae/packages/generate-post-images) that I totally love. It automatically [generates meta images](/posts/generate-meta-images-for-blog-posts-with-node/) for every piece of content that doesn't already have one. It then uploads them to S3 and adds the appropriate image URL to the content object.

### 7. Posting to Social Media

Many services will let you run tasks _after_ the build has completed. You may want to send a notification, commit changes to your repository, or do a number of other tasks. One thing I've done is [automatically publish tweets](/posts/automated-tweets-after-successful-netlify-build/) after successfully completing builds with new blog posts.

### 8. Checking for Bad or Misspelled Words

Although it may be less likely that your users are sensitive to colorful language, what is absolutely more useful is checking for misspelled words.

The really nice thing about this type of check is that you can run it without building the code. The downside is that you generally have to feed the system a lot of words to skip because it'll check the code (depending on how you've configured it).

### 9. Performance Testing

It takes a _long_ time to test page speed performance. But you can run a performance check on your home page on every build. And you could choose to run a more comprehensive test on a less regular basis, similar to the suggestion on checking for bad external links.

### 10. Inlining Critical CSS

Depending how your CSS is bundled, you may benefit from inlining [critical CSS](/posts/a-brief-introduction-to-inlining-critical-css/). Again, this is time-consuming and may best benefit your highest-trafficked pages, as it can speed up initial page load significantly.

## Start Automating Your Site

This list is certainly just the beginning. I'm sure there are many more tasks you could automate during your build.

I'd love to learn what they are. If you have any ideas for this list, [send me a message](https://twitter.com/messages/compose?recipient_id=23583938).
