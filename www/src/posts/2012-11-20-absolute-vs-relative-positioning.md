---
title: Absolute vs. Relative Positioning
tags:
  - css
description: The golden rule of absolute positioning.
image: /posts/121120/absolute-vs-relative-positioning-nv9uuKEi.png
seo:
  image: /posts/121120/absolute-vs-relative-positioning-zkEm4tHk--meta.png
---

If you've ever tried to lay out an HTML page with a second column or sidebar, I'd bet you ran into an issue with the [_position property_](https://developer.mozilla.org/en-US/docs/Web/CSS/position) at one point or another.

I was struggling with this until I came across advice I will now never forget. This is the golden rule of absolute positioning:

> An absolutely positioned element is positioned relative to the closest ancestor that is positioned relatively.

In other words, if you want to absolutely position an element in relation to its parent, the parent MUST be relatively positioned.

As usual, Chris Coyier has [some good examples.](http://css-tricks.com/absolute-positioning-inside-relative-positioning/)
