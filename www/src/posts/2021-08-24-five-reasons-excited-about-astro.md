---
title: 5 Reasons I'm Excited about Astro
description: "Astro is the new static site generator on the scene. This is why I'm so excited about it."
image: /posts/210824/yellow--astro.png
tags:
  - jamstack
  - javascript
---

When [Astro](https://astro.build/) first appeared on the scene, I rolled my eyes.

_Another static site generator. Really? Don't we already have enough to choose from?_

## Astro Fills in the Gaps

At first, it felt like it could have been an [Eleventy](https://www.11ty.dev/) plugin (similar to what [Slinkity](https://slinkity.dev/) is doing). I was frustrated that the Astro team felt like they needed to add a whole new thing to the ecosystem.

But then I started tinkering with it and realized that Astro fills in the gaps that I've found in the other tools I've been working with recently. And that's when I got super excited!

## The Right Amount of Opinion

For me, what it boils down to is that I feel like Astro brings the right degree of opinion to its framework. It knows that there are widespread preferences for lower-level tooling, and so it leaves options. But it provides a solid framework for implementing those options.

Now, granted, I've only built a few proofs of concept, but these are the five reasons I'm so excited about Astro:

1. Static-first, with progressive enhancement
2. Supporting multiple component frameworks
3. Native markdown support
4. A foundation for styling
5. Reduced boilerplate code

Let's take a quick look at each of these ideas.

## 1. Progressive Enhancement / Partial Hydration

Astro lets you build your website with modern front-end component frameworks, like React and Vue, but it doesn't assume you want to run JavaScript in the browser.

That's my struggle with frameworks like Gatsby and Next.js. They are super powerful, but they assume interactivity and always include JavaScript files in your built site.

Astro assumes the opposite. It makes you, the developer, tell it when you _need_ interactivity. Otherwise it renders static HTML. That means that even though there is _some_ magic that happens during the build, you are still in control of your HTML code _for the most part_.

## 2. Bring Your Own Framework (BYOF)

It's unlikely we're going to see one component framework to rule them all. React is hugely popular, yes, but Vue and Svelte have a major following that isn't going away.

Astro doesn't just say you can choose one of these frameworks, but that you can use any of them at any point. Meaning you could have a Vue component _and_ a React component in the same project. That's not necessarily a great idea, but it leaves the developer to make that decision. Astro just provides the foundation.

## 3. Native Markdown Support

Pages can be [`.astro` components](https://docs.astro.build/core-concepts/astro-components) or [`.md` (markdown) files](https://docs.astro.build/guides/markdown-content). It also provides [a markdown component](https://docs.astro.build/guides/markdown-content#astros-markdown-component) for use in Astro components, when you only need a little markdown in a larger component.

This feels like an inspiration from Eleventy — which will render markdown pages right out of the box, with the option to inject plugins as necessary.

I like this in comparison to Gatsby, which requires a clunky GraphQL query and custom JavaScript code to be able to render markdown pages. Or Next.js, which intentionally takes no opinion on data fetching or page content and requires that you do all the work.

## 4. A Foundation for CSS

Like BYOF, Astro provides an array of options for [implementing styles in the project](https://docs.astro.build/guides/styling), including directly in a component, using CSS modules, PostCSS, Tailwind, Sass, and more.

This is great because, well, CSS is hard. And everyone has their own way of staying organized. And yet, in comparison to Eleventy, which makes no opinion on styling, a foundation of the popular options today is available for you in Astro.

## 5. Reduced Boilerplate Code

I love that all the logic for Astro components lives in the component. I'm not a Vue guy, and I've only tinkered with Svelte, so the concept was a bit odd to me at first.

But after playing around with it, I'm in love. With support for [top-level await](https://docs.astro.build/guides/data-fetching#top-level-await), you can write only the JavaScript you need within a component.

## A Place for Eleventy

While it originally felt to me like Astro used Eleventy as a basis and then built something else on top of it, I'm looking at the relationship of the two differently after working with both.

Eleventy is very much about reducing the amount of code you have to write in general. It supports a number of [server-side templating languages](https://www.11ty.dev/docs/languages/), and does not go after front-end component frameworks. There's a lot of power in this simplicity. It makes it a little easier to focus on the content.

But the big remaining benefit of Eleventy is that you have 100% control over the HTML that is rendered to the page. You, the developer, are in absolute control of the performance of your site. And that can't be understated. You'll have to do a bit of work to maintain that and to stay organized as your site grows, but you have the control.

Will I settle on one over the other? Maybe. But I think both have their place for now.

## Power in Developers' Hands

So that's it. Astro provides a foundation that combines popular opinions today. It shows developers what those options are, and then asks the developer to pick one, or more. It says, "Here are three different hammers. You can pick the one that feels right, or you can use all three at different times. You just have to tell me what you want to do."

And that is really exciting!
