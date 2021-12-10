---
title: "3 Rules for Keeping Components Organized"
description: "Components may reduce the total volume of code you have to write, but keeping them organized can be a nightmare. Here are three simple rules to keep you organized, consistent, and productive."
image: /posts/210203/component-organization--meta.png
tags:
  - components
  - organization
---

Building out a front-end website or application using [a component-driven approach](/posts/wtf-is-component-driven-development) can do wonders for long-term productivity, but only if you have a consistent approach that keeps you organized.

I keep myself organized by following these three rules:

## Rule #1: Separate Source Files into Logical Buckets

The ubiquitous example tends to show all components living inside a `components` source directory. Something like this:

```
my-project/
└── src/
    └── components/
        └── ...
```

That approach gets unwieldy almost immediately. Instead, I prefer to separate components by _the role they play within the larger application_.

For example, let's say that I've built my pages such that layout elements wrap template-level customizations, which then include various other components that we call _blocks_.

{% post_image
    src="/posts/210203/component-organization--comp-types.png",
    alt="Component Organization by Type",
    flatten=true %}

Even though layouts, templates, and blocks are (or _could be_) all _technically_ a type of component, I like keeping them separate from one another. Something like this:

```
my-project/
└── src/
    ├── blocks/
    ├── layout/
    └── templates/
```

Depending on the complexity of your project (i.e. the number of source files and directories you have), you may find it more appealing to nest these inside a generic `components` directory:

```
my-project/
└── src/
    └── components/
        ├── blocks/
        ├── layout/
        └── templates/
```

It's worth noting that some frameworks — [Jekyll](https://jekyllrb.com/) is one example — are more opinionated about where you place your components without some custom configuration. (With Jekyll, components are more like partial templates, which they call _includes_). In cases like this, it's usually a good idea to use the framework's defaults.

## Rule #2: The Top Level is for Shared Components Only

Even given the structure of the first rule, there's still a very good likelihood that a directory like `src/blocks` will get messy quickly. Even small- and medium-sized sites tend to have a fairly large number of components, especially if they are making those components [small enough to do one thing and do that thing well](/posts/wtf-is-single-responsibility-principle).

Therefore, I use some additional logic to decide how to further structure a potentially gigantic directory of components.

Many times a component is only used in one place, by one other component. In that case, it isn't necessary for that component to be exposed right in the primary components directory. Instead, it could be nested within the directory of the component that uses it.

In other words, **the top-level of a directory of components should be in use _either_ by more than one other component _or_ by some other _type_ of component**.

Consider a case where we have a card component of type _block_. Let's say the card is only used inside a grid component, also of type _block_. The card, in turn, uses a button. We also have a header component of type _layout_ which uses the button block.

Visually that comes together like this:

{% post_image
    src="/posts/210203/component-organization--shared-comps.png",
    alt="Sharing Components",
    flatten=true %}

In that case, my directory structure might look like this:

```
my-project/
└── src/
    ├── blocks/
    |   ├── button/
    |   ├── ...
    |   └── grid/
    |       ├── ...
    |       └── card/
    └── layout/
        ├── ...
        └── header/
```

## Rule #3: Supporting Files Live Alongside their Component(s)

This may or may not be a good idea, depending on how the rest of your project is set up, which is often influences by the framework you're using. It's often better to go with a framework/library's recommendation, rather than creating a whole system that may work against it.

I've found that when a framework can easily support this approach, it's been a huge time-saver. Knowing that all supporting files are in a directory along with a component saves me a lot of digging around.

Supporting files include stylesheets, client-side scripts (for server-side components), or utility files (like [adapters](/posts/simplify-components-by-separating-logic-from-presentation-using-adapters) and transformers).

I have found it much more efficient to group a component with all its supporting files rather than grouping _types of files_ together. You often see scripts and styles all shoved in the same place. While that makes sense in many cases (especially for global styles and scripts), I've found it easier to locate pesky issues by keeping styles and scripts decentralized and closer to the thing they are affecting.

That said, this requires some additional diligence on your part to ensure you're scoping those supporting files in such a way that they're only affecting the necessary component(s).

---

Together, these three rules help me stay organized and run efficiently through component-focused sites. That said, one or more of these may not be a great idea for your situation. But [I'd love to learn more](https://twitter.com/seancdavis29). What are you using to stay organized? Where do any of these rules not work for you?
