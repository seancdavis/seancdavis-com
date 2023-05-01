---
title: The Most Compelling Argument for Using an SSG
description: >-
  SSGs were revolutionary when they entered the scene around 2008. But they are
  still relevant. And they are still great. And for many of the same reasons
  they were compelling in 2008.
tags:
  - jamstack
tweet: >-
  SSGs were revolutionary when they entered the scene around 2008. But they are
  still relevant. And they are still great. And for many of the same reasons
  they were compelling in 2008.
image: /posts/230501/the-most-compelling-argument-for-using-an-ssg-j1UZ7zgX.png
seo:
  image: >-
    /posts/230501/the-most-compelling-argument-for-using-an-ssg-3FCYwLpz--meta.png
---

{% youtube_embed id="Lwqpbckg3fY" %}

There are a lot of reasons to love static site generators (SSG) more than 15 years after they hit the scene.

## Start Simple

One of the reasons I love static site generators is that they _tend_ to be simpler than the alternatives. I always recommend new developers learn the basics first — HTML, CSS, JavaScript. And then, very quickly after that, jump to SSG.

This is because SSGs often provide a framework for working more efficiently and DRYing up code without obfuscating the code presented to the user. You can see exactly what's being generated and have control over it.

It's more comforting for me to loosen up that control after I know enough about what's going on to have confidence in the process.

## Challenges with SSGs

As much as I love SSGs, they aren't right for every situation. The truth is that they don't scale _well_. And I've tried. At the enterprise level, with thousands of pages and an increasingly complex architecture, we trie to make an SSG work, and it just didn't do well.

Generally speaking, SSGs are not built to serve large or complex websites. They can, but it's usually more challenging than choosing a framework built for more complexity.

## The Most Compelling SSG Argument

Without going into the details of the benefits and challenges (which I'd be happy to do if you ask, because I love talking about these things), there's one thing about SSGs that keeps me coming back and at least _considering_ them for any project: _you can't break production_.

There are fewer moving pieces. What you get after a build is (or _should be_) plain HTML containing the content on your page, with some CSS and JavaScript to enhance it as needed.

When users interact with that code, all the content is (or _should be_) already there. No need to go fetch content.

Fewer moving pieces. Fewer opportunities for things to go wrong.
