---
title: WTF is a Regression?
description: "Learn the fundamental concept of a regression, along with a couple best practices for avoiding them."
image: "/blog/210817/wtf--regression.png"
tags:
  - testing
  - wtf
---

A regression is a specific type of bug that worked at one time, but no longer works as expected.

Regressions are typically caused by adjusting some other part of the system which you didn't expect to have an effect on the piece that regression.

These types of bugs are often difficult to avoid in entirety, simply because it is impractical to be able to test 100% of your code, and it is not financially valuable to manually test the pieces that aren't automated.

## Using Software to Help

But there is software that can help automate this process! The software available varies widely depending on the languages and frameworks you're working with.

## Best Practice

I often recommend that developers spend the time to write programmatic tests for the features of their site or application that are most valuable and vulnerable. These are the features and functions that are:

1. Critical to the function and success of the site.
2. The most unstable or variable.
