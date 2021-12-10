---
title: Are You Overthinking CSS?
description: CSS is inherently simple. Maybe you're overthinking it. Maybe you
  don't need some crazy system guiding your CSS. Maybe you just need a few
  simple rules.
tags:
  - css
image: /posts/default/default-green-03.png
---

[CSS](/posts/wtf-is-css/) is inherently simple, right? You have a selector and a set of rules for that selector, most of which are relatively semantic. And yet, any sizeable project requires so much CSS to look presentable that it's really easy for CSS code to get out of hand. Without a system in place it can become difficult to maintain the stylesheets for any given project.

The problem is many of these systems further complicate the issue. Take [BEM](http://getbem.com), for instance. The example used on their site is how you'd mark up a form with a theme variation:

```html
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input class="form__submit form__submit--disabled" type="submit" />
</form>
```

That's rough. That's a lot of typing and a lot of hyphens and underscores you're expecting developers (many of whom don't care about CSS or markup) to remember.

With any system there is a learning curve, but your job as a CSS author should be to minimize that curve. Developers should be able to look at your [HTML](/posts/wtf-is-html/) and CSS code and understand what's going on with them. They should be able to debug easily without hurting the system as a whole, and they should be able to easily add new styles in the same vein in which you've authored them.

While I [have my own system](/posts/component-driven-css-cdcss/) -- based on [my three princples of good CSS design](/posts/three-principles-good-css-design/) -- that I'd recommend trying, really it's up to you to find or create the CSS system you want to use for your project. And as you develop what will become your methodology, there's only one practice you need to do regularly.

When you have a question about CSS or an idea to improve your system, begin by [asking yourself why](/posts/most-important-developer-question/).

Use that question and its answers to prevent yourself from designing a system more complicated than it needs to be. Consider some of the following examples I've asked myself while working to build out what would eventually be [CDCSS](/posts/component-driven-css-cdcss/):

- Why am I using hyphens _and_ underscores?
- Why do I need two hyphens to separate a component from its modifier?
- Why am I separating layouts and components?
- Why am I nesting components within each other?
- Why am I using important flags?

Questions like that led me to strip away all the noise and the extra [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) nuances required to learn a new system. What I'm left with is what I believe to be a simple system with just a few key rules.

Regardless of the system you choose to use, regularly checking in with yourself and challenging yourself to make it all simpler will help you get to code with more clarity and simplicity.

CSS isn't hard, it just needs some parameters. Keep those parameters simple and be consistent. Then you'll find CSS to be as easy as it should be.
