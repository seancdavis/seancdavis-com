---
title: Simplify CSS Measurements using REMs
description: Using REMs exclusively for measurements in CSS is a handy tool for
  enforcing a stronger design system.
tags:
  - css
image: /blog/default/default-pink-03.png
---

Design systems are inherently difficult to manage as projects grow. The higher the number of scenarios, the more complex the nuance of maintaining consistent components across the ecosystem becomes. In other words, as projects grow, it can quickly become a challenge to maintain a consistent sizing approach throughout the system.

## Complicating the Problem

There are many approaches out there that work to solve this challenge, but often they only serve to complicate the problem.

Take [Bootstrap 4.1's sizing utilties](https://getbootstrap.com/docs/4.1/utilities/spacing/) for example. Bootstrap uses a set of size factors ranging from zero to five, but they don't really mean anything other than being relative to one another. And what if you really want a size larger than the largest, or in between one of the sizes? The solution immediately breaks down.

## A Built-in Solution

What we often overlook when solving these system-wide challenges is that **we have the tooling for it right out of the box with [CSS](/blog/wtf-is-css/).** CSS has a unit of measure, [`em`](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Values_and_units/) and another related unit, `rem`. `em` [is defined by MDN as follows](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Values_and_units/):

> 1em is the same as the font-size of the current element (more specifically, the width of a capital letter M.)

And `rem`:

> The rem (root em) works in exactly the same way as the em, except that it will always equal the size of the default base font-size; inherited font sizes will have no effect

So we have a scaling tool always at our disposal in `em` and `rem`. Personally, I use `rem` exclusively unless I come across a scenario in which sizing needs to be relative to a component (or module) within the system and not the system as a whole. This rarely occurs -- for me, the sizing can almost always be built atop the entire system.

In other words, if we set our root element (or body) to have a font-size of `16px` (which tends to be the standard), then all `rem` units are relative to that. For example:

```css
:root {
  font-size: 16px;
}

p {
  margin-bottom: 1rem; /* Equivalent to 16px */
}
```

Therefore, if you use `px` as the measurement for the base size (`font-size` of `:root` or `html` or `body`), all `rem` units are automatically relative. No need for a sizing factor system because you have one just by using `rem` units along with some discretion.

## Defining the Base and Balance

Now, you can quickly complicate your system depending how fine-grained you allow yourself to be when using `rem` units. You can use decimal units in `rem`, so if you want font size to be `15px` instead of `16px` you could, theoretically use `.9375rem` as your measurement.

Don't do that.

If for some reason you need an specific pixel size, do one of the following:

- Use the size in pixels. It won't scale automatically like `rem` (you'll want a media query for that, if necessary), but it will be a lot easier to understand your intention when reading your code.
- Round to `.1rem`. If you changed the measurement to `.9rem`, that resolves to `14.4px`, which can often be good enough when you really need to be just a touch different.

But, where possible, build a stronger system by using a larger fraction of the `rem` unit as the smallest amount by which you can change a measurement. For example, on most projects I try not to use `rem` any finer than `.25` (`4px` in the `16px`-base system). So if the `1rem` measurement needs to be _just a little_ smaller, it goes to `.75rem` first. And I only use `.1rem` increments where absolutely necessary.

By taking this minimum fraction approach, you've done away with the fine-grained pixel-based system and are left with a more generic unit-based system. The benefits of this are grand! When you use larger measurements as the smallest unit, it becomes immediately clear when something is out of place. (e.g. It's easier to see when something is `4px` off compared to being `1px` off.)

## `rem` is not `px`

Of course, there are ways to be clever with `rem` units. Take [Jonathan Snook's clever trick of using `62.5%` as the base size of a `16px`-based system](https://snook.ca/archives/html_and_css/font-size-with-rem). That effectively makes `.1rem` equivalent to `1px`. Cool, except then you're enticed to use `rem` units just like you'd use pixels. That can be nice for understanding pixel translations, but then you have the nuance of a pixel-based system to solve for and you're right back at the beginning.

If you're going to use `rem` to help control your design system, use it against the base measurement of the system. Forget about pixels when you can, and think of your smallest unit (e.g. `.25rem`) as a generic amount by which elements can move on the page.
