---
title: Keep Stylesheets Organized With Continuous Abstraction
description: "Stylesheets can get out of control really quickly. Here's the approach I use to stay organized."
tags:
  - css
  - sass
---

I've been writing a lot of [CSS](/blog/wtf-is-css/) (well, [SCSS](http://sass-lang.com/)) lately. One thing I've noticed is that as you get faster at writing CSS, stylesheets actually get messier faster.

It requires discipline, backed by a solid system, to keep everything organized. And organized doesn't just mean _you_ know where it is. It means any of your peers can navigate the maze of code efficiently as long as they understand your approach.

Sass, out of the box, provides us one giant benefit over plain CSS -- the ability to concatenate multiple files into one manifest file. Using that benefit, along with _continuous abstraction_ (I'll explain that in a second), we can be sure our stylesheets stay organized. Of course, there are a few other tools we can use that can facilitate this process.

## Continuous Abstraction

[Continuous abstraction](/blog/introducing-continuous-abstraction) is a term I coined to explain how to find balance in the abstraction process -- to know _when_ and _how much to_ abstract.

The article I wrote to explain it (linked above), is ... long. So let's do this cool thing:

**TL;DR** Continuous abstraction says that during your first encounter with a solution to a challenge, it's difficult to guarantee the circumstances under which you will have to solve that problem again. So, you just solve the problem and don't consider future problems (within reason). But, the second time a related challenge occurs, you can safely say it's likely to happen again. Therefore, at that time you _abstract_ the core components of **only what is consistent between the two solutions** into an _engine_ that powers future solutions.

## Getting Organized

Continuous abstraction is like a backwards funnel. It's precise until it can be shared. But, how does that apply to stylesheets.

This actually works really well in this case because that _C_ in CSS is for cascading. So let's start with how we setup a project.

### Directory Structure: A Funnel

We want our stylesheets to _cascade_ naturally, even after they are all pulled into the manifest file.

So, I use a directory structure like this:

- Vendor
- Base
- Components
- Partials
- Views

Yeah, it's a lot. I have a reason for it.

#### Vendor

Vendor files are anything you would _never write directly into_. [Normalize](https://necolas.github.io/normalize.css/), [Bourbon](http://bourbon.io/), [jQuery UI](http://jqueryui.com/themeroller/), and so on, come from outside sources and _support_ your code.

#### Base

The base directory is a new one I've adopted since integrating [Bitters](https://github.com/thoughtbot/bitters) into my projects. Here are all the base styles. It's essentially anything you want to add on top of Normalize that the rest of the app will inherit. Simple typography rules, Sass variables, generic mixins, all go in here.

#### Components

Components are _specific items that can be used anywhere in the app_. Buttons, notices, icons, all belong here.

#### Partials

Partials, unlike components, typically support a larger area on a page, and they are typically rendered in the same general area. But they are agnostic to views, which means they may or may not be included on a particular view. So, header, footer, and sidebar styles are all good examples.

#### View

Last, we have views. Views are specific to a page, or a specific set of pages. I usually begin these stylesheets using a class selector on the body, which then means everything below is specific to views with that body class.

On smaller apps, views and partials tend to be the same, and I just call them views. Usually the styles you need for the header are enough to make you want to put them in their own file. But some simple sites may not have enough code to warrant that.

I hope you can see how these (at least the last four) serve as a funnel. They go from being broad and able to be overwritten, to specific to a page.

This is a ton of stuff. So how do we write code without getting lost?

## Writing Code

When we combine continuous abstraction with the funnel structure, we see that we should work in opposition to the funnel.

I begin by getting everything setup. I add the vendor files I know I need. I add the Bitters collection to my base directory.

From there I, when it makes sense, add styles to a view. Now, to clarify, I tend to operate with a _base_ view (it doesn't have a body class). This is a place for me to setup my wireframe and add any components that are specific to a page, but don't necessarily belong in any of the other directories.

Okay, so everything is setup. When you go to style an element, you go through a series of questions to know where to put it.

- Is it specific to the view you're working on? If so, it goes in a view-specific stylesheet.
- Is it specific to a page, but shared by other pages? If so, it goes in the views/base sheet.
- Have you written something very similar to this in another view file? Then it's time to abstract (see below).
- Or, can you be sure that this is going to be reused? Then it belongs elsewhere.

Okay, some examples. If you need an icon, don't even mess with it going in a view. You know, right away, icons should be shared by all.

If you're styling the header and you know there's a lot to it, just start with a partial.

### Abstracting

If you come across a scenario that's repeatable, it's time to abstract. For example you added a two-column layout to a view-specific sheet, but now there is another view that needs different styles, but shares the two-column layout.

This is where you use your heart to figure out where to put these things. If it's specific to a page, just go up to views/base and add two-column layout support there.

But, there could be other scenarios where two styles are very close, but somewhat different. With Sass, that's where [mixins](http://sass-lang.com/guide#topic-6) come in handy.

## Helping Yourself

I created this approach because I hate stylesheets that go on forever. I find them hard to read. And with the nesting capabilities of Sass, it can be really, really, difficult to debug funky styles.

So I searched for a _balance_. I know I shouldn't spend all day writing mixins, because that's a waste of energy. But I need a predictable set of files to help me reduce the number of lines of CSS code, to make it more legible.

But it takes more than file organization. There are other tools out there that can help drastically reduce the number of lines you need to write.

That's why I love [Bourbon](http://bourbon.io/). Bourbon is awesome.

I secretly like to look through projects with Bourbon that aren't optimizing Bourbon and reduce the code substantially. For example, Bourbon let's you take this:

```scss
div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

And do this:

```scss
div {
  @include position(absolute, 0 null null 0);
  @include size(100%);
}
```

There are plenty of other libraries built to help you write cleaner Sass code. Do some research and find the one that suits you.

---

_Note: I'm interested to know if you found any benefit in this approach. Or if you have a different approach that's worked well for you. If so, [hit me up](https://twitter.com/seancdavis29)_.
