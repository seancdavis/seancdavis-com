---
title: Introducing Component-Driven CSS (CDCSS)
description: "Yes, it's yet another CSS methodology. CDCSS combines inspiration from other methodologies to help your system stay focused on being a system, while also being simple, consistent, and flexible."
tags:
  - components
  - css
---

Writing clean [CSS](/wtf-is-css) code that is easy to maintain over the life of a growing and changing project is a challenging task. The only way to overcome such a challenge is to have a solid and consistent system that all developers understand and follow closely.

And there are plenty of systems out there that aim to solve just that challenge, such as:

- [OOCSS: Object-Oriented CSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)
- [BEM: Block Element Modifier](http://getbem.com/introduction/)
- [SMACSS: Scalable and Modular Architecture for CSS](https://smacss.com/)
- [ACSS: Atomic CSS](https://acss.io/)

Each of these approaches has value in its own way, but I've never been able to keep to one of these over the life of project. They were either too broad (OOCSS, ACSS) in that they require some other set of rules in order to be implemented consistently, or they were too constraining (BEM, SMACSS) and thus, too complicated.

So, using the [three principles of good CSS design](/three-principles-good-css-design.html) -- consistency, succinctness, and separation -- I used inspiration from each of these approaches to create a unified component-Driven CSS methodology.

## Component-Driven CSS

The goals of this approach are simple because they must follow the three principles:

1. **Be simple.** Any developer should be able to look at the CSS code and know how to edit or extend it. There should be a minimal learning curve for the approach.
2. **Be consistent.** The integral part of the system is that it should be consistent, such that it's immediately obvious when a developer deviates from it.
3. **Be flexible.** The details of the system should be flexible without jeopardizing the solidity and consistency of its core.
4. **Be system-first.** All players (including designers) should think system-first in that a change to any given page or component is a change to the entire system.

With these goals in mind, I created _Component-Driven CSS_ (CDCSS). With CDCSS there's one guiding rule:

**Everything is a component.**

But one idea isn't enough to build an entire system that supports the four goals of the project, so there are four guidelines that serve to accomplish the goals:

1. Directory Structure
2. CSS Structure & Specificity
3. Naming Conventions
4. Subcomponents

Let's dig in deeper to understand each one of these rules.

## 01: Directory Structure

The assumption with most new projects is that we can use [Sass](https://sass-lang.com/) when writing CSS, which provides the opportunity to **break files up into smaller, more consumable code**. Having multiple, relatively small files is the crux of being able to efficiently write and organize your CSS code. If Sass isn't available, hopefully you can use a task runner like [Gulp](https://gulpjs.com/) or [Grunt](https://gruntjs.com/) to concatenate the files. (For these examples, I'm assuming you're using Sass -- you'll have to make the necessary adjustments if not.)

To keep the this as simple as possible, the most complicated directory structure should look like this:

```
css/
| -- vendor/
| -- base/
| -- components/
|
-- main.scss
```

That should be pretty easy to understand:

- `vendor` files are styles you didn't write.
- `base` contains all styles and utilities for use by all components.
- `components` are ... well, components.
- `main.scss` is the main manifest file that imports all other files.

I like this because the majority of your CSS code goes into one directory (components). Base styles (those that support components) are put away in their own space so you don't have to see them throughout the project (when you're rarely working with them). And vendor files provide a place to stuff all the code you didn't write into their own directory.

I've seen some approaches in which the main manifest file includes manifest files within the subdirectories. Don't overcomplicate it. You only need a single manifest file and that can house every import you will need.

And FWIW, these names are just suggestions. If you want it to be dependencies, helpers, and modules instead of vendor, base, and components, it's your prerogative to change them.

### Variations

There are some scenarios in which I could see your directory structure change:

- Depending on your framework or build pipeline, you may be able to bring all third-party libraries (`vendor` files) in directly, in which case you could do away with the `vendor` directory.
- If there are only a couple files in the base directory, you might consider removing it and keeping those files outside any subdirectory or placing them in the components directory and adjusting the filenames so they stand out. I usually keep it even if I only have a couple files in there because I like the semantic separation.
- If you're able to remove the vendor directory _and_ don't have many base styles, perhaps you have no subdirectories and place all components directly in your css directory. In this case `main.scss` still stands out because it's the only file not prepended with an underscore.

### Stuff Is Missing!

If this makes you a little uncomfortable and doesn't seem like enough stuff, I understand. Just remember, _everything is a component_.

Where do header styles go? In the header component.

Where do page-specific styles go? That's easy. Nowhere. Delete them and refactor the styles into a component to support the overall system. (More on this later.)

### Theming and Other Complexities

I will admit some projects require some additional complexity. For example, what if you want to introduce theming so you can easily swap variable values in and out? Or what if you actually are limited by markup implementation and must use page-specific styles?

You'll know when you're in a unique situation because it will feel unique. But it should absolutely be a rarity. If you feel like you're in one of these rare scenarios and need another directory, step back and think about it again. Chances are you can refactor your code to fit within the system.

Know that every time you alter the core of the system, you put its stability in jeopardy. For example, if you feel like you need a `layouts` directory and just can't get around it, you've now introduced another directory in which developers can write styles. How do they know if a style is a layout or a component? You probably need a new rule to keep the system's stability in tact, thus you've made the system more complicated.

## 02: CSS Structure & Specificity

Specificity is often the cause of CSS getting bloated and complicated. Take the situation where you have a card component with a title, where you want the component modified slightly with extra margin. You may have some markup like this:

```html
<div class="card">
  <h2 class="card-title has-margin-bottom">
  <!-- ... -->
</div>
```

One of the great benefits of Sass is its ability to next CSS selectors. Often, I'll see this:

```scss
.card {
  // base card styles

  .card-title {
    // styles for ".card .card-title"
  }
}
```

Now, _if_ `.card-title` has a `margin` rule, the only way to override that rule with a utility class is by using an `!important` flag:

```scss
.card {
  // ...
  .card-title {
    margin-bottom: 0;
  }
}

.has-margin-bottom {
  margin-bottom: 1rem !important;
}
```

Using `!important` rules is an immediate red flag. Once you open the door to importants, determining specificity quickly becomes a nightmare.

The other problem I frequently run into when nesting Sass selectors is that the context of current scope gets lost when the ancestral selectors leave your screen.

Consider if there are 200 lines of code between the first nested card rule and the title.

```scss
.card {
  // Imagine 200 lines of CSS here

  .card-title {
  }
}
```

That doesn't do it justice, but when you inject so much space between a selector and its ancestors, it's difficult for developers to just jump in and make changes because they really have to hunt for scope and context. And when that happens, you're often going to see patchy CSS written and the mess will snowball from there.

To resolve these issues, think about structure and specificity following these rules:

1. Use a single file for a component and its subcomponents. (If a file feels too big, it probably could be broken into multiple components.)
2. Every component (and its subcomponents) are _flat_, meaning they are accessible at the root level.
3. Modifiers are placed directly within the component to which they apply and are not accessible at the root level.
4. With the exception of base styles (i.e. _resets_), rules must always target a class, not an element.

In other words, don't do this:

`card.scss` {.filename}

```scss
.card {
  .card-title {
  }
}
```

`utils/margin.scss` {.filename}

```scss
.has-margin-bottom {
}
```

Do this:

`card.scss` {.filename}

```scss
.card {
}

.card-title {
  &.has-margin-bottom {
  }
}
```

There are two concerns I hear about this approach:

1. It doesn't necessarily solve the contextual distance problem. (i.e. if there are enough modifiers, the parent scope may drift away).
2. Subcomponents are available at the root level.

Those are valid concerns, but remember we're always thinking system- and component-first. So:

1. If there are so many modifiers that you can't see the parent when you've scrolled a modifier class into view, it's time to refactor into multiple components.
2. If a developer decides to use `.card-title` without a `.card` parent:
   a) Okay, that's technically harmless (i.e. _who cares?_)
   b) Rewrite (or ask the developer to rewrite) the code such that a root-level `title` becomes its own component

## 03: Naming Conventions

Naming conventions are a hot topic in CSS systems, aren't they? Well, how about this -- I don't care how you name your components. Be it BEM, OOCSS, or your own homegrown naming system, use whatever you're comfortable with.

All that matters in naming is that you **stay consistent with the chosen convention**. Consistency is important not just for the _structure_, but also for the names themselves. For example, call an image and image everywhere you can. There's no need to call it an avatar because it's probably going to show a user's picture. Or, if some text is the main heading call it a heading or call it a title, but try not to switch back and forth.

### CDCSS Recommendation

While you are welcome to do whatever you'd like in the naming department, I recommend a combo of OOCSS and SMACSS for naming. It goes like this:

- The component of interest receives its generic component class (e.g. `.card`).
- Subcomponents within that component share the component's name and append their own subcomponent name, separated by hyphens (e.g. `.card-title`).
- Modifiers that should adjust the main component's style (more on this later) use semantic `is-` and `has-` prefixes as separate classes (e.g. `.card.has-image`, `.card.is-active`)

I've found this approach to be clean and predictable. There's only one hyphen at a time and you know when a class is representing a base component style or modifying that style in some way.

## 04: Subcomponents

In this system we know everything is a component. But that means components are going to be made up of other components, or _subcomponents_. Brad Frost has a [great article](http://bradfrost.com/blog/post/atomic-web-design/) (and [a book](https://shop.bradfrost.com/)) on the concept of _atomic design_ (not to be confused with [_Atomic CSS_](https://acss.io/)), which provides context to each type of subcomponent. Once again, an approach like that is just to limiting. We don't need to worry about specifics here -- a component has subcomopnents and that's as complicated as it needs to be.

We already know a component's subcomponents go in the same file as that component, but how do we structure the styles for subcomponents to inherit their base styles? Let me explain with an example:

You will inevitably have buttons all over your site. Let's say there is a button component (i.e. `.button`) that you use at the root level. And when you use a button with a card (i.e. `.card-button`), it is fixed to the bottom and spans full-width, unlike the root-level button. `.card-button` would use the base `.button` styles and add or override a few select styles for its use as a subcomponent within a card. And in both cases you want to be able to modify the button with an `.is-blue` class to change its color.

Ideally, you accomplish this without duplicating code. It's up to you how you'd like to approach it, but here are three ways of accomplishing it with the help of Sass:

### Option 1: Extending with Placeholders

One way to approach this is to create base component styles with a placeholder and then extend that placeholder and overwrite as needed:

`components/\_button.scss` {.filename}

```scss
%button {
  // all base button styles
  &.is-blue {
    // modifications to make it blue
  }
}

.button {
  @extend %button;
}
```

`components/\_card.scss` {.filename}

```scss
.card {
}

.card-button {
  @extend %button;
  // override default default styles
}
```

There are three primary benefits to this approach:

1. Shared CSS is compacted, which is what happens when using `@extend` in Sass. ([More here.](https://sass-lang.com/guide))
2. All modifications on the base component automatically come along when used as a subcomponent.
3. You only need a single class on a base subcomponent (i.e. `.card-button` would bring _all_ necessary styles for the base card button.)

There is one somewhat negative effect that comes of this, which is that component import order matters, because all base components must be importer prior to being used within subcomponents. It's not a big deal, but it requires discipline and manual organization of your manifest file.

You can overcome the import order issue _if_ you pull out placeholders so all placeholders are imported before any components. I don't like that -- I'd rather manage import order than have component styles detached from the component.

I've also heard complaints that it can be difficult to debug placeholders and extends because you can chain them together and have to go hunting for the original code. I don't buy it. If you stay disciplined to the component approach you should be able to follow the code trail and debug or adjust styles across the board by only changing them in one place.

### Options 2: Including Mixins

Another approach is to include mixins rather than extending placeholders. That would look like this:

```scss
@mixin button {
  // all base button styles
  &.is-blue {
    // modifications to make it blue
  }
}

.button {
  @include button;
}
```

`components/\_card.scss` {.filename}

```scss
.card {
}

.card-button {
  @include button;
  // override default default styles
}
```

There is only one main difference between this approach and the previous, which is that styles do not get compacted. For that reason, I tend to not use mixins much in a component-driven environment.

### Option 3: The Class Train

There is one more approach that changes up the result a bit. In the class train approach, subcomponents don't bring in base styles, they only override them. This is how that looks:

```scss
.button {
  // all base button styles
  &.is-blue {
    // modifications to make it blue
  }
}
```

`components/\_card.scss` {.filename}

```scss
.card-button {
  // override default default styles
}
```

The benefit of this is that all styles for a given component live directly in that file -- there's no messing with extends or includes.

But there are two consequences to this approach:

1. Again, import order matters. Because there is a lack of specificity, overrides (subcomponents) must be loaded _after_ their base component.
2. Developers must include the base component whenever marking up a subcomponent (i.e. `<button class="button card-button"></button>` inside a `.card` element).

The class train of base and subcomponent isn't a big deal, but it's one more thing for developers to remember. But it's not _a lot_ to remember, so this is an approach that can work well with discipline.

---

This has been my first pass at getting the thoughts around Component-Driven CSS down. I'm sure this will evolve over time, but these are the basics I've been working with and it's extremely simplified the way I write CSS and think about design systems. Now when there's a question on where something should go, there's usually a straightforward answer, and that answer typically begins with, "You're probably overthinking it ..."

**Don't overthink it.**

CSS and design systems don't have to be complicated. Give them a set of basic rules to follow, be consistent and stay within the system and -- _voila!_ -- CSS is easy once again.
