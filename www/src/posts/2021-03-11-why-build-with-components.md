---
title: "The Good and the Bad of Component-Driven Development"
description: "Why would you build a website with components? Because it can be great! But you should know what you're getting yourself into first."
image: /posts/210311/lime--component-bricks.png
tags:
  - components
---

Why design or build a website or application with components? Why not just pages? The web is made up of pages, after all, isn't it?

## Components: The Good Parts

For designers and developers, the primary benefit of components lies in their _reusability_. Each component represents an element that can be reused throughout a site (often with minor customizations based on some input). That means you can design and build it once and use it everywhere. Need to make a change? Make it in one spot and it gets updated everywhere!

When working with only pages, it's more tedious to be consistent and to make changes down the line.

### The Classic Example

My favorite example is a button. Buttons are used in lots of places on almost every website.

If a designer designs and developer develops by building pages, then each button that appears on the site is unique in some way, even if it doesn't _appear_ to be.

When a designer begins a new page, they'd copy and paste from other places they've used the button. A developer would work similarly. But the pain doesn't _really_ set in until a change is required or requested. Even if it's just the color of a button that is to change, **it could require updating every button across the site!** Or, at the very least, it would require that every button be _tested_ to ensure it was updated properly.

When working with components, there is a single source of truth. A single element (i.e. _component_) that dictates how buttons work across a design or in the code. Want to add an option to support a new color? Great! Add support to the button component and designers and developers can both have confidence it's being used consistently everywhere.

### Other Benefits of Working with Components

Reusability leads to other benefits in working with components. Here are a few more:

- Components simplify testing, as each component can be tested in isolation, rather than on every page in which it is used.
- For that same reason, debugging is often easier, especially if a component's functionality is self-contained. (Think: _Why does nothing happen when I click on this button?_ Well, you know right where to start, and that's a very good thing.)
- Because of that, and if organized and built well, a component-driven website will require less design and development time _over time_.
- For content editors, a component-driven CMS offers the ability to be super flexible while working within a structured system. IOW more freedom to build custom pages without the need to know HTML.

## Components: The Hard Parts

But that doesn't mean it's always cupcakes and rainbows and dance parties. While working with components can benefit a project, they don't come without challenge. In my experience, two challenges stand above all:

First, although components often require less design and dev time over the course of a project, **they often require more effort at the beginning**. Building a solid system in which you can work productively takes time.

When building a new website for someone else, this can be challenging for the customer. When building in pages, you're able to share your work _in context_ after you finish the first page. When building with components, it takes longer to get to a complete page, as all the supporting and foundational components for that page must be completed first, with consideration for the entire system.

It's still totally worth it, but it takes some convincing for folks who are used to seeing results faster.

Second, _component_ is a generic term. Even frameworks like [React](/posts/wtf-is-react/) and [Vue](https://vuejs.org/) that exist to help you build components tend to leave a number of important decisions up to the developer. That's totally okay, but it means you're going to spend more time making low-level decisions (like how to name and organize files).

It also means it's up to you to design a component. Knowing the right time to break up a component into smaller components will help you stay organized, but there's no perfect formula for it.

---

Components are an essential tool when it comes to building a website today. Getting started is (relatively) easy. Building a solid system on which you can work (enjoyably) for years to come is difficult to get right.

If you're willing to put in the effort, it will totally pay off!
