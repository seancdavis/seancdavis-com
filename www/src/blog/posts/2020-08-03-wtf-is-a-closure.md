---
title: WTF is a Closure?
description: A brief explanation of JavaScript closures, along with a few
  examples and references to other in-depth explorations on the topic.
tags:
  - javascript
  - wtf
image: /blog/default/default-orange-01.png
---

There are tons and tons of articles out there on closures. This is a brief explanation that ends with references to more in-depth explorations of the topic.

At its core, a closure is a [JavaScript](/blog/wtf-is-javascript/) feature in which **a function accesses variables outside its interior scope**.

Consider the following:

```js
var a = 1

function foo() {
  var b = 2

  function bar() {
    var c = 3
    return a + b + c
  }

  return bar()
}

console.log(foo()) // => 6
```

In this case, the function `bar()` has access to three variables, `a`, `b`, and `c`, even though `c` is the only variable it defines.

In JavaScript, functions have access to their surrounding scope, which can be pretty powerful. And that's a fairly high-level concept that doesn't always take the shape of the example above. Consider this:

```js
function double(num) {
  return num * 2
}

console.log([1, 2, 3].map(double)) // => [2, 4, 6]
```

In this case, the argument passed to `map` is a function with access to each node in the array. But it's still a function with its own scope. And it's accessing another function outside its scope.

## Why use Closures in JavaScript?

I've found that the two most frequent reasons I use closures are for:

1. Privacy
2. Organization

### Closures Promote Privacy

In the first example, code at the global level (where `a` is defined) doesn't have access to the `bar()` function. That means anything we define within `foo()` (or `bar()`) isn't going to bleed out into the global scope.

This gives us more freedom to be semantic with naming, as we know the scope we're dealing with when looking at little snippets of code.

### Closures Help Keep Code Clean

And that also means it's easier to keep our code clean. Breaking up programs into smaller, right-sized chunks can make it easier to understand, test, and refactor. When each part of the program [has one job and does that job well](/blog/wtf-is-single-responsibility-principle/), the whole system benefits.

## Other Closure References

That's a brushstroke on the surface of _closures_. There are _so many_ more articles out there on the topic. And that's great, because closures are a foundational JavaScript concept that JS developer should understand.

While a quick google search will yield an abundance of options, here are a few of my favorites:

- [Closures - JavaScript (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures). It's boring, official documentation, but I really like MDN references.
- [What the fork is a closure?](https://whatthefork.is/closure) (Dan’s JavaScript Glossary)
- [A simple guide to help you understand closures in JavaScript](https://medium.com/@prashantramnyc/javascript-closures-simplified-d0d23fa06ba4) (Prashant Ram)
- [Master the JavaScript Interview: What is a Closure?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36) (JavaScript Scene)
