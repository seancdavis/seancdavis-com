---
title: "Develop Long-Term Efficiency by Creating Conventions"
description: "It's fun to chase after the new and shiny tool you just found. But it's productive to stay establish a preferred way of working."
image: /blog/210330/blue--checklist.png
tags:
  - productivity
---

These days I mostly work with the [Jamstack](/blog/wtf-is-jamstack) when building websites. But I came from building both websites and applications using [Ruby on Rails](https://rubyonrails.org/).

By the time I began working with Rails, the community already had a [seasoned doctrine](https://rubyonrails.org/doctrine) it was working with, one pillar of which was (and still is) [_Convention over Configuration_](https://rubyonrails.org/doctrine/#convention-over-configuration).

## Convention over Configuration

The idea is that by reducing the number of decisions a developer has to make, they can move faster. They can focus on the business logic, not whether or not to use camel case for helper method names. Those decisions should be made once and be used consistently. And if _you_, the developer, don't have to make those decisions, great! You can simply learn the convention and stay focused on solving the real problem.

## The Jamstack: Bring Your Own Stack

But in the world of the Jamstack, there is little convention. In fact, it's just the opposite. The Jamstack isn't a stack at all. It's not a prescription. It's a methodology. It's the _approach_ to take and principles to follow when building a website, not which tools to use. It therefore makes very few decisions on behalf of the developers in its community.

And with it still being new and shiny, there's a ton of development happening around it. So there's always something new and shiny to chase.

From my experience with Rails, however, I've learned that convention is efficient. It pulls away the decisions that don't really matter and keep developers focused on the end goal.

In other words, working within an established convention should be the goal.

## A Lot of Little Decisions

But we have to establish those conventions for ourselves with the Jamstack. And there are a lot of questions to answer. How are you going to build your next site? Will it be [Gatsby](https://www.gatsbyjs.org/) as the [static site](/blog/why-build-static-sites) generator, [Contentful](https://www.contentful.com/) as the content management system, and [Netlify](/blog/wtf-is-netlify/) as the build tooling and host? Or maybe you'd prefer something more like [Eleventy](https://www.11ty.dev/) (SSG), [Forestry](https://www.forestry.io/) (CMS), and [Vercel](https://vercel.com/) (build/host)? Those are just two examples that don't have any overlap. There are countless more combinations you could conjure.

And none of them are wrong.

But, once you have a _decent_ handle on a few of the tools out there, it's time to fall into a groove. It's time to [pick your poison and stick with it](https://www.helloample.com/blog/settling-down-in-a-jamstack-world), at least for awhile, while it's the best tool for solving your problems.

There are a lot of decisions to make along the way. Choosing the stack is only the beginning. Even if you went with Gatsby, Contentful, and Netlify — some seriously well-baked tools — there are still an abundance of low-level decisions to make. Consider the following:

- Naming components and their directories. [React](https://stackoverflow.com/a/43979817/2241124) has no standard on this, while [Gatsby has a few conventions](https://www.gatsbyjs.org/docs/gatsby-project-structure/), but none that drive components.
- Modeling content types, like pages and posts. What names will you use? Which fields will they have? How will those fields map to what I see on the front-end?
- How will I handle a staging site? Is it a separate Netlify project? Or do I use [branch deploys](https://docs.netlify.com/site-deploys/overview/#branches-and-deploys)?

And that's just one question for three (of many) tools you might use in a project.

That adds up to a large number of decisions. So, if you're changing the tools you use on any given project (which is the freedom presented by Jamstack), then you'd have to answer (and re-answer) those questions on every project. Very quickly you will feel like you're wasting time.

## Finding a Groove

What would feel more productive would be answering those questions once (or a _minimal_ number of times), and then working that way for awhile. eventually you may hit a point when it makes sense to question your answer again. And that's okay. But you should stay with your answer long enough to feel what it's like to work within a groove.

Establishing that groove is also a great space for internal tooling to develop. For instance, if you're going to structure the content of each projects similarly, then maybe you have a script that sets up the base models in the CMS for each project.

With the Jamstack it's on you to create almost all of the conventions you will follow.

So do it!

Do it well. Do it once. Change as little as you have to for the next project. Over time, your projects will begin to look and behave similarly and you'll have a solid convention under your belt. Then new developers popping into each project have to learn your approach once and then they'll be all set to work on any project that follows those conventions.
