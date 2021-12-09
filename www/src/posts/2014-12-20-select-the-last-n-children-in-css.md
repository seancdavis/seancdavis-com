---
title: Select the Last n Children in CSS
tags:
  - css
description: Sometimes you need to target more than just the last child in a
  series of HTML elements. Learn how to target the last n number of elements
  here.
image: /blog/default/default-orange-01.png
---

In CSS, [`:nth-child`](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) refers to the child referenced from the beginning of the parent. Take an example:

```html
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
  <li>four</li>
</ul>
```

If you were to select `:nth-child(2)`, then the second `<li>` is selected. So this:

```css
ul:nth-child(2) {
  color: red;
}
```

Would make `two` red.

Moving in the other direction is [`:nth-last-child`](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-last-child), which moves backwards. So, this:

```css
ul:nth-last-child(2) {
  color: red;
}
```

Would make `three` red.

Now, let's say we wanted to make the _last two_ elements red. We can use `-n` and move backwards from the end. So:

```css
ul:nth-last-child(-n + 2) {
  color: red;
}
```

Affects both `three` and `four`.

The iterator follows the pattern of `an+b`. If you want to learn more about how this iteration logic works, [Chris Coyier has a great explanation](http://css-tricks.com/how-nth-child-works).
