---
title: CSS Animations Quick Start Guide
description: "Learn the basics of CSS animations to catch the attention of your website visitors."
image: /blog/210624/yellow--css-animations.png
author: pratham
seo:
  image: /blog/210624/meta--css-animations.png
tags:
  - css
  - contributor:pratham
---

Animations on your website can help catch the attention of visitors landing on your web pages.

You can create some amazing animation using just CSS. In this post, we will explore some animation basics so you can start adding animations to your site today!

## Understanding Keyframes

Animation is all about changing one or more CSS rules over some interval or length of time. To understand how this works we must first take a look at the `@keyframes` rule.

{% post_image
    src="/blog/210624/keyframes-diagram.jpg",
    alt="CSS Keyframes Diagram" %}

The `@keyframes` rule has four main components:

- `@keyframes` at-rule keyword, which tells CSS that we are defining styles for keyframes. [Learn more here](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes).
- The animation name, which is a unique name to describe one particular set of keyframes.
- A series of defined rule sets. These are percentages (of `100%`) that describe a set of rules at that point in the animation. `from` and `to` (in the image above) are built-in aliases to represent `0%` and `100%`, respectively.

Confusing? Don't worry! Let's move further everything will be crystal clear.

## Implementing an Animation

You can implement an animation using [the `animation` property](https://developer.mozilla.org/en-US/docs/Web/CSS/animation). Here's a super simple example:

```css
.element {
  animation: move 4s;
}
```

This is specifying that elements with the class `element` should apply the keyframe rules called `move`, and that the animation should take `4s`.

`animation` is a _shorthand_ property, meaning that it combines several properties together. In other words, we just specified [`animation-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name) and [`animation-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration) in the same line. The long way of writing this would be this:

```css
.element {
  animation-name: move;
  animation-duration: 4s;
}
```

Here's a more complex example:

{% post_image
    src="/blog/210624/animation-shorthand.jpg",
    alt="CSS Animation Shorthand Property" %}

The `animation` property is nice and concise, but takes a little time to become familiar with it. It's worth the effort, though. It'll save you time in the long run.

## A Simple Animation

The `animation` property is used to bind keyframes with a particular element.

For example, suppose I want to move my element `500px` from left to right in four seconds. The CSS would look something like this:

```css
@keyframes move {
  from {
    left: 0;
  }
  to {
    left: 500px;
  }
}

.element {
  animation: move 4s;
}
```

That results in this behavior:

{% post_image
    src="/blog/210624/simple-animation.gif",
    alt="Simple Animation" %}

## Adding Custom Percentages

Suppose that I wanted to change the background-color of an element, and that I wanted to do that five times throughout the animation. The keyframes animation might look like this:

```css
@keyframes move {
  0% {
    background-color: black;
  }
  25% {
    background-color: red;
  }
  50% {
    background-color: yellow;
  }
  75% {
    background-color: green;
  }
  100% {
    background-color: blue;
  }
}

.element {
  animation: move 4s;
}
```

This is the result:

{% post_image
    src="/blog/210624/custom-percentages.gif",
    alt="Animation with Custom Percentages" %}

## Adding a Delay

You can also specify the delay in your animation with [`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay). This describes an amount of time to wait before starting the animation.

Say you wanted to wait two seconds before beginning the animation. The shorthand property looks like this:

```css
.element {
  animation: move 4s 2s;
}
```

The longer one looks like this:

```css
.element {
  animation-name: move;
  animation-duration: 4s;
  animation-delay: 2s;
}
```

## Repeating Animations

Our animation currently only runs once. This is because we haven't applied the [`animation-iteration-count`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count) property, which specifies the number of times an animation should run.

If you wanted to run the animation twice, you could use `2` at the end of your shorthand rule:

```css
.element {
  animation: move 4s 2s 2;
}
```

Which translates to this:

```css
.element {
  animation-name: move;
  animation-duration: 4s;
  animation-delay: 2s;
  animation-iteration-count: 2;
}
```

Note: You can also pass `infinite` to `animation-iteration-count` to continuously run the animation in a loop.

Also note that the delay only takes effect _before_ the loop begins. The delay will not occur on each animation.

Take a look here:

{% post_image
    src="/blog/210624/repeating-animation.gif",
    alt="Repeating CSS Animation" %}

## Smoothing out Animations

Creating a smooth animation can really clean up the experience. [`animation-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function) property for that.

This property specifies the speed curve of an animation. There are many functions that you can use:

- `ease` (slow start, then fast, then slow)
- `linear` (same speed)
- `ease-in` (slow start)
- `ease-out` (slow end)
- `ease-in-out` (slow start and slow end)
- `cubic-bezier` (customizable)

[Check out this code](https://t.co/K258MvOtoF?amp=1) for a better understanding. And here's a quick preview:

{% post_image
    src="/blog/210624/timing-functions.gif",
    alt="CSS Animation Timing Function" %}

## Applying Styles Before and After Animations

Animations do not affect the styling of the element before or after the keyframes are executed. In order to persist the styling based on last or first keyframe, we have [`animation-fill-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode).

It accepts following values:

- `forwards` (element will retain last keyframe styling)
- `backwards` (element will get the first keyframe value even in `animation-delay` period)
- `both` (both of the above)

Take a look at this example:

{% post_image
    src="/blog/210624/fill-mode.gif",
    alt="CSS Animation Fill Mode" %}

As you can see, the blue box stopped at `left: 500px` because `forwards` is begin applied on it. And the orange box has a black background even when it's in a delay period of `2s`.

---

That rounds out an introduction to CSS animations. I hope you increased your knowledge of animations and are now ready to go create a great, interactive experience with your website visitors.

This content was originally sourced from [@Prathkum's](https://twitter.com/Prathkum) [Twitter thread on the subject](https://twitter.com/Prathkum/status/1366278875467153413). Follow [@Prathkum](https://twitter.com/Prathkum) for more great CSS teachings.
