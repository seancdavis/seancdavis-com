---
title: Handle Content Outside Site Framework
description: >-
  Learn how to process your content separately so you can write the minimal
  amount of framework code and easily switch to a new framework in the future,
  with the added benefit of easier maintainability.
tags:
  - developer-advice
tweet: >-
  I’ve found that separating content from framework code makes it easier to
  switch to something else in the future and improve your workflow.
image: /posts/230504/handle-content-outside-site-framework-jmQG2qOo.png
seo:
  image: /posts/230504/handle-content-outside-site-framework-mgpENUKJ--meta.png
---

Open-source developer tools and the communities surrounding them are the backbone of what makes life great as a web developer.

It's often super motivating to jump into start using an open-source tool. Doing so benefits the community. But, it's still important to make decisions on open-source tooling as you would in working with any other product.

If you intertwine your project too tightly within some tool, it can be more difficult to move away from it. And if your project is successful, your tooling _will_ evolve.

## Challenges with Framework Opinions

One area in which I've noticed how easy it is to get locked-in is in working with site frameworks.

Some site frameworks have a strong opinion about how you should handle your content. This is great when you're starting out and trying to learn the framework, but the more you rely on it, the harder it becomes to move away from it. You end up writing more and more code that's specific to that framework, making it harder to switch to something else in the future.

### Be Prepared to Move

It's not that you should always be ready to move. It's generally not wise to regularly change tooling. Then you're constantly reinventing, and it's distracting from what you're trying to accomplish.

However, if your project is successful, it will evolve over time. And that evolution will typically require reconsidering tooling at some point. When that time comes, you want to be able to choose the tooling that is best for the project and organization, and not because a move is inconvenient.

Expecting to evolve is a great way to set yourself up for success when it's time to make a major change. This is a helpful filter to use when choosing tooling or designing your architecture.

## Processing Content Separately

One way to avoid getting locked into a particular framework or tool is to process your content separately.

Many frameworks have the ability to accept ready-to-go content that's been processed in some other way. By processing your content separately, you can write the minimal amount of framework code possible and only have to move your templates if you decide to adopt a new framework.

### How to Get Started

Getting started with processing your content separately can seem daunting, but it's not as hard as it sounds.

First, you'd choose where to _store_ your content. This can be a headless CMS or any database-like service that can be accessed via an API.

Then you have to _process_ (retrieve and transform) that content. There may be a tool for this. Or, you can write a script that retrieves content from the source, transforms it (more on this below), and caches it in some way that the framework code can use directly.

This way, if you move to a new framework, you can bring your content script and only have to rewrite the framework code.

### Transforming Content

A major part of this process is _transforming_ content. In many cases, your front-end code may need to perform some logic on content before displaying it. Some examples of this include:

- Building URL paths from some field
- Converting markdown to HTML
- Adding syntax highlighting to code blocks

All of this is work that your content script can do, leaving very little logical code to the framework.

### The Benefit of Maintainability

This process doesn't just make it easier to evolve. It also forces the code to be more modular. It puts all your content-processing logic in one place, rather than spreading it throughout the application.

## Worth the Effort

While it's not the end of the world to embrace all the features of a given open-source framework, if you can make life easier for yourself in the future without adding much effort, it's worth the work.
