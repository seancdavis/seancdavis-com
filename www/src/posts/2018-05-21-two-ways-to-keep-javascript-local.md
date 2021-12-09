---
title: 2 Ways to Keep JavaScript Local
description: It's far too easy to let your JS code pollute the global namespace.
  Here are two methods for keeping your code local.
tags:
  - javascript
image: /blog/default/default-green-01.png
---

One of the most common problems I see with novice programmers writing JavaScript is that they pollute the global namespace.

In small projects, this isn't necessarily going to cause a problem. But it's not a good practice because it _can_ lead to problems.

It's not great to let JS code run free in the global space simply because it's difficult to keep track of what's there. The bigger your codebase gets, the more shared JS libraries you use and the more custom code you have, the harder it is to maintain that space.

So it's best to stay local when you can.

There are three fairly standard approaches to keeping JavaScript code local:

1. An anonymous functions
2. A single object

Let's look at the pattern for each.

## Anonymous Functions

In JavaScript, the `function` keyword _can_ lock down scope. Consider the following example:

```js
function myFunc() {
  var a = 1
  return a
}

var b = 2

function myOtherFunc() {
  b = 3
  return b
}
```

Using this, if I run `myFunc()` and then look for the value of `a`, it's `undefined` because it was scoped to its function.

On the other hand, if I access `b` without running any functions, I'll get `2` as its value. Then if I run `myOtherFun()` and check for `b` again, it'll be `3` because the function was referencing the global object.

What we're after here is the first example -- where we can't get to anything inside `myFun` from the outside because it keeps its scope local.

Combine that idea with knowing that **JS functions can live inside functions** and we have a powerful idiom to keep code local. Consider this:

```js
;(function () {
  function myFunc() {
    // Do some crazy stuff!
  }
})()
```

Now `myFunc` is wrapped inside an anonymous function, so we can't call it from the outside.

The trick to this approach is the set of parenthesis trailing the anonymous function, because that tells the browser to run the code at runtime.

So, if we add some sort of [_constructor_](<https://en.wikipedia.org/wiki/Constructor_(object-oriented_programming)>) to start executing the code we have our own little ecosystem that we can't access from the outside.

Let's say `myFunc` was the constructor, so to speak. We'd simple call it after we've defined it.

```js
;(function () {
  function myFunc() {}

  myFunc()
})()
```

Now when the page loads, `myFunc` will be executed but you still won't be able to access `myFunc` from outside this anonymous function.

## Single Object

Another option is instead of being anonymous, we can choose only one name to pollute the global namespace. (I'd suggest you make it specific so it doesn't get in the way of other libraries.)

This is especially helpful if you don't want to run the code immediately at runtime.

Let's say you are going to place everything with the `myNamespace` object. You can attach it to the `window` object and then define your processes inside.

```js
window.myNamespace = function () {
  function myFunc() {}

  myFunc()
}
```

Now, whenever you're ready to run the code you can simply run `myNamespace()` and its function will be executed.

This approach also enables you to set options within that scope by passing variables to the function. For example:

```js
window.myNamespace = function (options = {}) {
  function myFunc() {
    // Do something with `options` here ...
  }

  myFunc()
}
```

I tend to favor the anonymous function when I can run the code immediately after the page is loaded. If I have to wait, though, the single object approach is sufficient because the pollution is minimal.

And that's all there is too it. Now go clean up your code!
