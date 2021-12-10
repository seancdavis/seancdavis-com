---
title: WTF is Lodash?
description: Explore an introduction to Lodash and what it can do to support
  your JavaScript code.
tags:
  - javascript
image: /posts/default/default-yellow-03.png
---

[Lodash](https://lodash.com/) is a JavaScript library that brings a set of utilities on top of _vanilla_ JavaScript (i.e. JS without any extras). It's a funny play on [Underscore.js](https://underscorejs.org/), and has since [become a superset of Underscore](https://stackoverflow.com/a/13898916/2241124).

Both of these libraries use their moniker as a representation of the object that accesses all their utility methods — the _underscore_ (i.e. `_`).

## A Lodash Example

Whenever I find myself [doing something stupid with JavaScript](/posts/dont-do-stupid-shit-with-javascript/), I usually take a step back and realize that someone has probably solved the problem I'm solving before, and there's a better way to do what I'm doing.

When that involves manipulating an object, array, or string, Lodash often comes to my rescue. Let's look at a couple examples.

Let's say I have a deeply nested object, `obj`:

```js
const obj = {
  a: [
    {
      b: {
        c: "Hi there!",
      },
    },
  ],
};
```

I would be able to get to `c` with `obj.a[0].b.c`. But what if I didn't know that path, but I had to set it? Perhaps the structure of this object can vary. All I have is a string that represents the path at which I want to set.

```js
const propPath = "a[0].b.c";
```

I could use [`eval`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval), but that's generally a very bad idea. MDN's page leads with:

> **Warning:** Executing JavaScript from a string is an enormous security risk. It is far too easy for a bad actor to run arbitrary code when you use eval(). See [Never use eval()!](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Never_use_eval!) , below.

I've found myself in a situation where I couldn't figure another clean way to achieve this. But, _lo_ and behold, Lodash had the answer in [`_.set`](https://lodash.com/docs#set).

That's just one of many scenarios in which I've found myself where Lodash has come to the rescue.

## Underscore Not Necessary Today

I'll also point out that the underscore is not necessary today. In fact, I prefer _not_ to use it. It's too generic of a character when the word `lodash` works fine. Instead, with [ES6 imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), we can give the object representing Lodash any name we want, as that object is the library's default export.

```js
import lodash from "lodash";

lodash.set(obj, "a[0].b.c");
```

## Bundle Size

While it's decreased over the years, Lodash is a large package to bring into a project when you may only need one or two of its features. Fortunately, there's a means to install functions independently.

For example, installing the entire library looks like this:

    $ npm install lodash

But, you could install a single function like this:

    $ npm install lodash.set

Because I'm typically only using a few functions here and there, I tend to bring in the individual libraries until I'm using enough that it seems more practical to have the entire object at my disposal. It's a balance between bundle size and the productivity of writing code.

## Reference Links

- [Website](https://lodash.com/)
- [GitHub](https://github.com/lodash/lodash)
- [NPM](https://www.npmjs.com/package/lodash)
- [jsDelivr](https://www.jsdelivr.com/package/npm/lodash)
