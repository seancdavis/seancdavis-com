---
title: Demystifying jQuery’s Syntax
description: >-
  Although jQuery has long since faded out of style, it is style widely used.
  For those that encounter it for the first time, here’s a quick breakdown of
  the syntax to better understand how it works.
tags:
  - jquery
image: /posts/220723/demystifying-jquerys-syntax-8a0brSsR.png
seo:
  image: /posts/220723/demystifying-jquerys-syntax-OSuBIgBw--meta.png
---

While [I don’t think it’s worth the time to proactively learn jQuery today](/posts/should-you-learn-jquery-in-2022), I can tell you this: it seems a lot scarier than it is.

Why?

Because of the pesky dollar symbol (`$`).

## Why jQuery is Mysterious

Consider this code:

```js
$("body").addClass("bg-dark");
```

This actually reads somewhat semantically, doesn’t it? We want to add a class of `bg-dark` to the `<body>`. Of course, examples get much more complicated, but why the fancy notation?

From my experience, there are two things with jQuery that make it seem intimidating:

- `$` feels like a special JavaScript notation.
- Actions are frequently chained to one another.

Let's break it down to see if we can make jQuery more approachable.

## `$` is an Alias for `jQuery`

Writing `$('body')` is the same as writing `jQuery('body')`. In other words, `$` is just an alias for `jQuery`.

## `jQuery` is Just a Function

`$` (or `jQuery`) is just a function. When you run the code `$('body')`, it is the same as running any other function in JavaScript.

For example, suppose I had the following code:

```js
function _(num) {
  return num + 1;
}
```

Now if I run `_(1)` I get `2` as the response. In this case `_` is the name of the function. `$` works the same way. It just looks a bit obscure.

## Functions can Return Objects

Functions can return more than simple values like numbers and strings. We can return an object from a function, too. Consider the following:

```js
function foo() {
  return {
    bar: "HI!",
  };
}
```

Now if I ran `foo()` I would be returned `{ bar: 'HI!' }`.

I can chain this together in a single line and call `foo().bar`, which would give me `'HI!'`.

## Objects can be Functions

The objects returned from a function can also be functions. I could amend the previous example to this:

```js
function foo() {
  return {
    bar: function () {
      return "HI!";
    },
  };
}
```

Now, `bar` is a function, so if I want to get to `'HI!'`, I have to call `foo().bar()`.

## Summing it All Up

Pulling these things together, we can see that jQuery is using some fancy patterns, but it’s really just the same old JavaScript you’re already used to.

Let’s go back to that initial example.

```js
$("body").addClass("bg-dark");
```

And we can break it down like this:

- `$('body')` is a function call that returns an object.
- The returned object has an `addClass` property, which is a function.
- That function will add a class to the DOM element referenced in the initial function call (`body`).

Hopefully this helps jQuery seem a little less mysterious.
