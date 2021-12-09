---
title: A Beginner's Guide to Z-Index
description: "The z-index is a powerful yet confusing concept of CSS. Let's make it easy!"
image: /blog/210604/z-index--main.png
author: pratham
seo:
  image: /blog/210604/z-index--meta.png
tags:
  - css
  - contributor:pratham
---

`z-index` is a [CSS](/blog/wtf-is-css/) property that controls stacking order of elements along a z-axis. Let's first take a look at what the z-axis is, and then get you started with a few tips to help you solve situations that tend to trip up developers.

## The Z-Axis

Imagine a hypothetical line starting from your eye to screen. That is z-axis. It works like this:

{% post_image
    src="/blog/210604/z-index--sketch.jpeg",
    alt="Z-Index: Z-Axis Sketch" %}

## ⭐ Tip #1: Position Rule Required

The biggest thing that confuses developers is that z-index only works on positioned elements. You must specify the `position` rule (`relative`, `absolute`, `sticky`, or `fixed`) if you want to arrange an element using z-index.

```css
/* bad - z-index will not work without position */
.element {
  z-index: 1;
}

/* good - z-index works when position is applied */
.element {
  position: relative;
  z-index: 1;
}
```

## ⭐ Tip #2: Understanding Default Behavior

By default, all elements have a z-index of 0. When z-index rules are the same and two elements collide, an element written father down your HTML code will be stacked on top.

Take two sibling elements, `a` and `b`, where `b` is written after `a`:

```html
<!-- #b will have stacking precedence if no z-index is specified -->
<div id="a">...</div>
<div id="b">...</div>
```

By default, if both of these elements are positioned in such a way that they overlap, but neither has a z-index, `b` will be stacked on top of `a`.

## ⭐ Tip #3: Working with Nested Elements

Using the example with `a` and `b` above, let's say `b` is intentionally stacked on `a`. And let's say `a` has a child, `c`, which we give a z-index of `100`. The HTML might look like this:

```html
<div id="a">
  <div id="c"></div>
</div>
<div id="b">...</div>
```

And the corresponding CSS:

```css
#a {
  position: absolute;
  z-index: 1;
}

#b {
  position: absolute;
  z-index: 2;
}

#c {
  position: absolute;
  z-index: 100;
}
```

In this case, the child(ren) of `a` (`c`) can never be stacked above `b`. This is how it plays out on the screen:

{% post_image
    src="/blog/210604/z-index--nested.jpeg",
    alt="Z-Index: Working with Nested Elements" %}

## Test Drive

[Here is some test code](https://codepen.io/prathkum/pen/WNoOvYr) you can play around with for better understanding.

---

_This content was originally sourced from [this tweet](https://twitter.com/Prathkum/status/1362686461544439809) by [@Prathkum](https://twitter.com/Prathkum). Feel free to add to the Twitter thread with question or comments._
