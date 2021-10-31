---
title: The 3 Principles of Good CSS Design
description: CSS is hard, but we make it that way. Keep to the basics and you'll
  be empower yourself to build and scale products quickly.
tags:
  - css
image: /blog/default/default-blue-03.png
---

I hear this classic phrase regularly:

> CSS is hard.

[CSS](/blog/wtf-is-css/) itself, though, is super simple at its core. It applies a given set of styles to a given set of elements following [a few simple rules of specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity/). Take the following example:

```css
.element {
  background-color: red;
}
```

It sets the background color to red for the set of elements with the `element` class. This exmaple, on the other hand, is a different story:

```scss
.element ul > li:not(.active) span.is-focused a:focus:first-child {
  background-color: red;
}
```

Okay, sure, it's still _semantic_ and relatively easy to understand from the CSS perspective. But it's an odd combination of specific and generic selectors that will eventually lead to a tangled mess of wondering why one particular element in one particular location and state has a red background.

So, maybe instead of saying, "CSS is hard," we should be saying:

> Good CSS design is hard.

And that's true. Design systems are notoriously complex. There are a lot of moving pieces, and often components' appearance changes based on the context in which they are presented. Consistency is difficult within design systems because we're asking their creators to develop components in such a way that they can be applied in several scenarios, many of which may be unknown during the period in which they are being created.

And when you have a design system for a web project (and you should), the CSS within that project is really just a reflection of that system. If creating a good design system is difficult, building a solid code-based system (CSS) to reflect it is even more difficult.

Building a solid CSS system for yourself is difficult enough. Add other developers to the project and it can quickly become an entangled nightmare of CSS code. I've done this a hundred times or more. Projects get going and developers want to move fast. Continued support of a good CSS architecture can really slow a project down. So we cut a few corners here and there to be able to move quickly and, voila!, we've broken our system.

So, how do you overcome that tendency to let CSS get out of control? How do you maintain a solid CSS architecture throughout the lifespan of a project?

With the right amount of discipline, attention to detail, and by staying focused on three guiding principles, you can build a CSS architecture at scale that other developers can understand, maintain, and quickly iterate upon.

The three principles I use to build and maintain my CSS are **consistency, succinctness, and separation** (or _CSS_).

These principles are philosophically agnostic, meaning they can be practiced regardless of the methodology and/or framework you choose to adopt. You can use [BEM](http://getbem.com/introduction/), [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/), [SMACSS](https://vanseodesign.com/css/smacss-introduction/), [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/), [Atomic/Functional CSS](https://acss.io/), or you can roll your own methodology. And you can use [Bootstrap](http://getbootstrap.com/) or [Foundation](https://foundation.zurb.com/) or your own framework (or no framework). These principles are about guiding you _after_ you've adopted your approach.

## Consistency

So, there's no right answer for the methodology or framework you choose to use. But, regardless of your choice, it's absolutely imperative that you **stay consistent with your rules**. Any poorly-designed system will break down almost immediately. But even the best-designed systems won't work if you don't follow them exclusively and consistently.

Pick (or design) your methodology, decide upon any variation to that approach, then choose a framework (or a lack of one). When you're confident in your choices, put your head down, get to work, and be **predictable and consistent**.

## Succinctness

Being _succinct_ means being _brief **and** clear_, and both are imperative to writing good CSS.

Developers are inherently lazy, and that's a good thing because there's no need to do more work (i.e. write more code) than we have to. So if you design some complicated CSS system, you can't expect your developers to follow it consistently and unanimously.

And this doesn't just apply to you rolling your own solutions. Say you're going to adopt BEM. It's a solid and consistent system that holds up when implemented well. But that means you have to implement it well! In simple scenarios you may end up with classes like `modal__button--primary`. That's not terrible. But what if you start nesting components within components? What if you wind up with a class like `modal__header__menu__item--primary--active`. That's going to make it difficult to convince others to follow in your footsteps. With BEM, you have the clarity, but can severely lack brevity if you're not careful.

On the other hand, consider the implications of [Aomtic CSS](https://css-tricks.com/lets-define-exactly-atomic-css/), where we have brevity without the clarity. A simple element may have three simple classes -- `m-a0 bg-p f-l`. It's short. Cool. What does it do? You could probably guess -- the background color is purple, right? Or is it the primary color? Of course, if you blow these out to be more clear, you're going to have a _long, long_ string of classes on even the simplest of elements.

I try to keep three questions in mind when implementing CSS:

- How many classes are needed to achieve the style?
- How long and complex are each of the classes?
- Are the class names easily understandable without context?

These questions keep me in check for focusing on brevity and clarity when creating CSS class names.

## Separation

CSS is guided by inheritance and specificity. And it becomes complex when you try to use either of them to your advantage.

If I have the following markup:

```html
<div class="header">
  <h1 class="header-title">Title</h1>
</div>
```

And then following CSS:

```css
.header > h1 {
  color: red;
}

.header-title {
  color: green;
}

.header .header-title {
  color: blue;
}
```

What color is "Title"?

It's blue, but it doesn't matter. The point is you have to think about it. You have a `.header .header-title` selector that provides you no benefit if you build the system more generically.

Consider that no element knows who its ancestors are and that every explicitly styled element has a class. If you build your system completely flat and class-based, then you won't have to worry about inheritance or specificity. Every style rule **is applied to a single class selector**.

If you follow this, you will have no inheritance and consistent specificity, essentially removing the ability for CSS's inherent qualities to make your system more complex.

## Final Thoughts

When the principles break down in the middle of your project (and they will), it's important to check-in and perform any necessary refactoring. The reality is you can't predict all the obstacles you're going to run into. So when you find your classes are getting too long or styles are conflicting with one another, or some jackass developer is using underscores when you clearly asked for hyphens, then it's time to stop and recalibrate. Was there a reason for the shift? Does the system need to be adjusted to account for the change? Or do you just need to get better about maintaining the state of the system?

And I'll say it again. It truly doesn't matter [what CSS system you choose to follow](https://www.optasy.com/blog/5-ways-build-out-well-organized-css-architecture), or even if you choose to design your own. That should be a project-by-project decision. But, regardless of the project's CSS methodology or framework, apply these three basic principles (CSS) to your system, and your CSS will be extendible and scalable, and the other developers will have no reason to say, "CSS is hard," because you made it easy.
