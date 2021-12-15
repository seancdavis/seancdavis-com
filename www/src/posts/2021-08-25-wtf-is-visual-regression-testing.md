---
title: WTF is Visual Regression Testing?
description: Learn the basics of visual regression testing, along with resources for implementing the practice in your projects.
image: /posts/210825/wtf--visual-regression.png
tags:
  - testing
  - wtf
---

_Visual regression testing_ is ... a lot of funny words. Let's break it out and the build back up to best understand it, starting with the middle word: _regression_.

## What is a Regression?

A [regression](/posts/wtf-is-regression/) is a specific type of bug that worked in the past, but no longer works as expected.

## Adding the "Visual" to Visual Regression

Regressions don't just have to be in functional features. They can also exist as visual elements. You may have made a change that shifted elements around on a page in an unwanted way. Or maybe you made a change to global CSS rule and it affected some element on some page you weren't expecting.

## Testing for Visual Regressions

Testing for visual regressions (visual regression testing) is supremely valuable. If you are running an active site or application it's simply impractical to be able to check every page after every style change you make.

And yet, CSS can be an elusive beast. As your site grows, it's becomes more and more difficult to have a handle on how the changes you make in one context may affect elements in another context.

## Automating Visual Regressions

It is super valuable to automate visual regressions testing because it can capture changes you made that you weren't expecting. It provides you with the confidence that you can make stylistic changes in one context and know that they will still look good everywhere else.

Here's an example that shows how visual regression testing can come in handy even in the most nuanced situations. This shows how a small change shifted just a few elements on the page. The left image was the original page in production, and the right is the new. The middle shows the difference.

{% post_image
    src="/posts/210825/visual-regression-example.png",
    alt="Visual Regression Example" %}

## Making Smart Decisions

One aspect of visual regression testing that I love is that it puts the power in the hands of the team building the product. Instead of responding to visual bugs when users catch them, now you know what you've done before shipping it, and you can choose to pursue it or not.

In fact, I tend to ignore the majority of the visual regressions I introduce because they are so minor I'm not worried about them. But when the big ones pop up — that's when it's worth it.

## Visual Regression Software

There are a lot of options out there today. One of the more popular choices is [Percy](https://www.browserstack.com/percy). I didn't have the budget for this on this blog, so I've crafted my own together with [Jest](/posts/wtf-is-jest/) and [Jest-Image-Snapshot](https://github.com/americanexpress/jest-image-snapshot).
