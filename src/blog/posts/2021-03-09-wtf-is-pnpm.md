---
title: "WTF is PNPM?"
description: "Is PNPM just NPM with another P? Yes. But also, no."
image: /blog/210309/wtf--pnpm.png
tags:
  - pnpm
  - wtf
---

[PNPM](https://pnpm.js.org/) stands for [_Performant NPM_](https://pnpm.js.org/faq/#what-does-pnpm-stand-for), which means it stands for _performant node package manager_.

That may lead you to the question I asked when I first heard about PNPM: _Is it just another [NPM](/blog/wtf-is-npm) alternate?_

In a way, _yes_. It's like [Yarn](https://yarnpkg.com/) in that it is a command-line tool that helps you manage JavaScript project dependencies using the [NPM registry](https://www.npmjs.com/). And, like Yarn, it's much much faster than plain old NPM.

## Why not just use NPM?

_Is it really a good idea to use an NPM alternative when the default (NPM) actually works fine, but is maybe a bit slow?_

Generally speaking, I'd say _no_, not necessarily! There's a ton of value in using the ubiquitous option — which, unlike the word _ubiquitous_, is the one people best understand and are most comfortable using.

But there are two scenarios in which I'd welcome a change:

**When NPM's performance becomes an issue**, I'd likely first switch to Yarn. Yarn has significant performance improvements over NPM, and it's a more popular and accepted option when compared to PNPM.

And **if your project is a [monorepo](/blog/wtf-is-monorepo)**, PNPM and Yarn are both good options.

## PNPM vs Yarn Workspaces

Yarn has a feature called [Workspaces](https://yarnpkg.com/features/workspaces) that is geared toward making Yarn work well for monorepos. PNPM, on the other hand, seems very much focused on monorepo support. Its approach to structuring the `node_modules` directory is of great benefit when managing several projects with `package.json` files in the same repository.

That said, I don't feel like I can fairly evaluate the two because I don't have enough experience with Yarn Workspaces. I came across PNPM and it was instantly beneficial to me, so I stuck with it.

---

To sum it all up, if you have a monorepo or performance issues with NPM, consider using an alternative option like PNPM or Yarn. Otherwise, stick with the thing everyone is comfortable using.
