---
title: "WTF is Continuous Integration?"
description: "Continuous integration was coined as an extreme programming practice, but is used more loosely today."
image: /posts/210615/wtf--continuous-integration.png
tags:
  - testing
---

Continuous integration was originally coined as an [extreme programming practice](http://www.extremeprogramming.org/rules/integrateoften.html), which states that code should be merged into the primary codebase every few hours.

It tends to be used a little more loosely today to reflect a DevOps practice of _automating_ the process of integrating code into the main codebase.

This automation often includes checks to ensure the code can be safely merged. This includes programmatic tests, like unit tests or acceptance tests. But checks go far beyond running tests. Here are a few more examples:

- Formatting code
- Generating files automatically (e.g. a sitemap)
- Identifying potential curse words in the code
- Testing the performance of a front end applcation
- Validating SEO values

The primary goal is to ensure that the code is ready to be merged into the main branch of the code, and to be consumed by other developers working on the project.
