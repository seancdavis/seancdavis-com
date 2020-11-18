---
title: "Build Jamstack Sites Faster with Conventional Tooling"
description: "The Jamstack presents the opportunity to fly through the process of building a website, but it helps if you build a foundation on which you can do work consistently."
tags:
  - jamstack
image: /blog/200805/jamstack-project-without-convention.jpg
twitter_card: summary_large_image
---

While these days I mostly work with the [Jamstack](/wtf-is-jamstack) when building products for the web, I came from building _everything_ with [Ruby on Rails](https://rubyonrails.org/).

By the time I began working with Rails, the community had formed and followed a [seasoned doctrine](https://rubyonrails.org/doctrine), a manifesto of sorts. One of the many pillars of this doctrine was (and is still today) [_convention over configuration_](https://rubyonrails.org/doctrine/#convention-over-configuration).

The idea behind _convention over configuration_ is that by reducing the number of decisions a developer has to make, they can move faster. They can focus on the business logic, not whether or not to use camelCase for helper method names. Those decisions should be made once and be used consistently across all projects.

If you (the developer, consumer of the framework), don't have to make those decisions the first time, that's a bonus! You can first spend time learning the convention, and then focus your time on solving the problems that get you closer to delivery.

## Convention in the Jamstack

In the world of the Jamstack, there is little convention. In fact, that's the point. The Jamstack isn't a stack at all. It's not a _prescription_. It's a _methodology_. It's an _approach_ to take and principles to follow when building a website, not a set of tools to use. As a result, it delegates low-level decision-making to the developers in its community.

And with the Jamstack being new and shiny, there's a ton of development happening around it. There's something new to distract your attention on an almost weekly basis.

## Conventions in Ruby on Rails

Rails is different. It's a _framework_ that sets forth a way to work, which often includes the tools and conventions to use when doing that work. It pulls away the trivial decisions to keep developers focused on the end goal.

When the Rails community makes a decision that will become a first-class feature in its framework, they do so with the community and their doctrine in mind, considering the array of project types the framework would have to serve as a consequence of that decision.

In other words, developers can ultimately move more efficiently if they can follow a convention that eliminates unimportant decisions while remaining flexible enough to solve the problem(s) at hand.

## Forming Convention in the Jamstack

As developers of Jamstack projects, we're faced with building most of those conventions ourselves. And they begin before the first line of code.

_What tools will you use to build and power your site?_ Will it be [Gatsby](https://www.gatsbyjs.org/) as the [static site](/why-build-static-sites) generator, [Contentful](https://www.contentful.com/) as the content management system, and [Netlify](https://www.netlify.com/) as the build tooling and host? Or maybe you prefer something more like [Eleventy](https://www.11ty.dev/) (SSG), [Forestry](https://www.forestry.io/) (CMS), and [Vercel](https://vercel.com/) (build/host)? Those are just two examples that don't have any overlap in tooling. And they're two of _hundreds_ of combinations you could create.

Perhaps the best and worst part of the Jamstack is that none of those decisions are inherently wrong.

### Standardizing the Toolbox

So, how do you build those conventions with the Jamstack? It begins with standardizing on a set of tools, _limiting_ what you're going to work with, at least for a some period of time while you get comfortable.

This marks the beginning of [_settling down_](https://www.helloample.com/blog/settling-down-in-a-jamstack-world).

There are numerous decisions to make along the way. Choosing the stack is only the start. Even if you went with Gatsby, Contentful, and Netlify — some seriously well-baked tools — there are still an abundance of low-level decisions to be made. Consider the following:

- Naming components and their directories. [React has no standard](https://stackoverflow.com/a/43979817/2241124) on this, while [Gatsby has a few conventions](https://www.gatsbyjs.org/docs/gatsby-project-structure/), but nothing overarching.
- Modeling content types, like pages and posts. What names will you use? Which fields will they have? How will those fields map to what users see on the screen?
- How will you handle a staging site? Is it a separate Netlify project? Will you consider [branch deploys](https://docs.netlify.com/site-deploys/overview/#branches-and-deploys)?

That's just one question for each of the tools we created. There are plenty more where that came from! In the end it boils down to _a lot_ of decisions to make.

A lot.

If you're changing the tools you use on any given project — the freedom that comes with the Jamstack — then you have to answer those questions on every project. That's a lot of time spent on low-level decision-making that could have been spent on something unique to that project.

{% post_image
    src="/blog/200805/jamstack-project-without-convention.jpg",
    alt="Jamstack Project Without Convention" %}

### Adding Supporting Tools to the Toolbox

It would be ideal if you could answer those foundational questions once then work under those answers until it makes sense to question them again.

{% post_image
    src="/blog/200805/jamstack-project-with-convention.jpg",
    alt="Jamstack Project With Convention" %}

Enter: _Internal tooling_.

An effectively means of driving consistency looks like this:

1. Make a decision on a way to work.
2. Build tooling to support that decision.
3. Adjust (slowly) until it feels optimized.

For instance, if you're going to structure the content of your headless CMS similarly on _most_ projects, then maybe you have a script that sets up those models automatically. And when you find that projects are deviating from the norm in some consistent manner, or when the core models don't work, you adjust the script and try again. Then repeat and repeat and repeat.

## It's on You!

With the Jamstack it's on you to create almost all of the conventions you will follow. Do it! Do it well. Change as little as you can for the next project. Over time, your projects will begin to look and behave similarly and you'll have a solid convention under your belt.

As a bonus, your projects will then have the benefit of being easier for new developers to join, as they'd only have to learn your approach once and then they're all set to work on any project that follows similar conventions.

What Jamstack conventions have you formed? [Let's discuss](https://twitter.com/seancdavis29).
