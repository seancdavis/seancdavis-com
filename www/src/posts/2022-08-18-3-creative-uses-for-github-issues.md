---
title: 3 Creative Uses for GitHub Issues
description: >-
  While GitHub’s primary offering is to host remote Git repositories, the
  features it has provided to support this offering open the door for
  non-traditional uses that can boost your productivity and perhaps save you
  from using additional services.
tags:
  - api
  - github
  - Inspiration
tweet: >-
  I love finding ways to use tools already in my arsenal for atypical solutions,
  like using GitHub as a CMS, image host, or commenting system.
image: /posts/220818/3-creative-uses-for-github-issues-eIhX8fZ9.png
seo:
  image: /posts/220818/3-creative-uses-for-github-issues-RLD78PDV--meta.png
---

As most products mature, they hone in on a particular audience and a core set of features. How we use those products tends to narrow to that product offering.

But there are also a handful of tools out there whose use is more open-ended and can be interpreted and repurposed in many different ways. And I love to take advantage of these situations.

## GitHub is Super Flexible

GitHub is one of those tools. Its primary purpose is to host remote Git repositories, which are typically collections of plain text files.

But the real power of GitHub is in the tooling surrounding these repositories. There are features like issues, pull requests, discussions, and projects. But there is also a super powerful API for manipulating repository files and the repo's supporting features.

## Creative Uses for GitHub Issues

While there are _many_ creative uses for various GitHub features, I wanted to focus on three very cool interpretations of stretching how issues can be used:

- Website CMS (Blog Posts)
- Comments
- Image Host

### Using GitHub Issues for Blog Post Content

It's kind of wild idea, but you could actually use GitHub issues as a CMS! swyx explains how he moved to a GitHub CMS [in this post](https://www.swyx.io/github-cms) (which is [a GitHub issue](https://github.com/sw-yx/swyxkit/issues/10)).

swyx calls attention to GitHub API's rate limiting, which is an important consideration if you're going to seriously consider this. But prerendering can help in this case.

### Building a Comment System with GitHub Issues

You may have noticed that the swyx issue also [has comments](https://github.com/sw-yx/swyxkit/issues/10#issuecomment-1008486860) that appear as comments about that particular post. That's because they are!

{% post_image alt="", src="/uploads/220818/swyx-comments.png" %}

GitHub issues can also be used as a commenting system. In fact, I'd be much more likely to use them as comments on posts, as they are already designed to be a commenting thread, with built-in reactions.

[utterances](https://github.com/utterance/utterances) is a widget that is built to help you employ this solution for your site. Check it out!

### GitHub as Your Site's Image Host

Perhaps the oddest of the bunch, you can also host images using GitHub issues. In Method #3 of my [3 Ways to Add an Image to a GitHub README](/posts/three-ways-to-add-image-to-github-readme/), I demonstrate that uploading an image to an issue results in a URL from GitHub's CDN that can be safely used on your site.

{% post_image alt="", src="/uploads/220818/Untitled.png" %}

Note that this may not be the most optimal solution, given that you would be loading images at full size. And I haven't yet implemented this. But, in theory, it _could_ work. It's something to consider, for sure.

---

I'm sure there are many more creative uses for various GitHub features (including issues), but I hope this opens the door to dream bigger. And if you can realize some of these uses, you may even be able to eliminate the need for some specific tool or service you're using today.
