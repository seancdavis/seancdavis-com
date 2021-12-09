---
title: WTF is Hoisting?
description: Sometimes JavaScript code appears to behave oddly. Hoisting is one
  of the reasons why. Here's an introduction to the concept, with references to
  more in-depth explorations.
tags:
  - javascript
  - wtf
image: /blog/default/default-orange-03.png
---

_Hoisting_ is a JavaScript concept in which variable, function, and class definitions are _hoisted_ (lifted) to the top of their lexical environment (their scope) before execution.

Consider the following:

```js
console.log(foo) // => undefined

var foo = "bar"
```

In many other programming languages, this code would result in an error because we're trying to use `foo` before we've defined it. JavaScript works a little differently, as the code isn't executed _strictly_ like it is written. Instead, under the hood, it works more like this:

```js
var foo

console.log(foo) // => undefined

foo = "bar"
```

Variables declared with `var` are hoisted to the top of their scope (the global scope in this example). This results in the variable being _initialized_ but not _assigned_.

ES6 introduced `let` and `const`, which behave differently. While they are _technically_ hoisted, an error will be thrown if they are used before they are declared.

```js
console.log(foo) // => Cannot accesss 'foo' before initialization

let foo = "bar"
```

That's hoisting in nutshell, although there are plenty of additional nuances to explore. [This article](https://scotch.io/tutorials/understanding-hoisting-in-javascript) does a fantastic job of breaking them down. I highly recommend the read if you want to explore the topic further. And, though a little more technical, the [MDN reference](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) is always a great resource.
