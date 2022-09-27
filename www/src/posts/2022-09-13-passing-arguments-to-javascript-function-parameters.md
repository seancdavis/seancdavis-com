---
title: Passing Arguments to JavaScript Function Parameters
description: >-
  Things can be tricky when you want to use a function (with required
  parameters) as an argument within another function.
tags:
  - javascript
tweet: Back to the basics as I build up some foundation for a few upcoming articles.
image: /posts/220913/passing-arguments-to-javascript-function-parameters-uJ-Z-b4_.png
seo:
  image: >-
    /posts/220913/passing-arguments-to-javascript-function-parameters-MzzdEyCP--meta.png
---

The title to this point makes my brain hurt, so let's begin with an example. Say you have a basic JavaScript function that is a simple alias for `console.log`:

```js
function log(text) {
  console.log(text);
}
```

And you have another function called `runFunc` that lets you execute some function, which gets passed to `runFunc` as the only argument.

```js
function runFunc(fn) {
  fn();
}
```

The question is: **How can use** **`log()`** **as the argument passed to** **`runFunc()`\*\***, given that\*\* **`log`** **has a required parameter (\*\***`text`\***\*)?**

## Calling Functions as Arguments Doesn't Work

JavaScript beginners often start with this pattern, calling `log()` within `runFunc()`.

```js
runFunc(log("Hello World"));
```

That's a logical first step, but unfortunately, **it doesn't work.**

When you use parentheses with a function name, you are _calling_ the function — you're telling the JavaScript runtime to _execute_ the function. What you want to do is _define_ a function to be used with `runFunc`, so that `runFunc` simply has a reference to the `log` function, which it can run at the appropriate time within its code.

### Additional Debugging to Uncover the Problem

This problem becomes more elusive to solve because it's not always immediately obvious that there is a problem.

In our case, "Hello World" will still be logged — everything appears to work fine.

But if we also log inside the `runFunc` method, we can see that `log` is executed _before_ `runFunc`.

```js
function log(text) {
  console.log(text);
}

function runFunc(fn) {
  console.log("Executing runFunc ...");
  fn();
}

runFunc(log("Hello World"));

// => "Hello World"
// => "Executing runFunc ..."
```

## Defining Functions as Arguments

Instead, we can define an _anonymous function_ as an argument, and then run `log` inside that function.

```js
function log(text) {
  console.log(text);
}

function runFunc(fn) {
  console.log("Executing runFunc ...");
  fn();
}

runFunc(function () {
  log("Hello World");
});

// => "Executing runFunc ..."
// => "Hello World"
```

And now we see the results in the correct order!

### It's Not the Anonymity

The reason this works is not that the function is anonymous. It's because we didn't _run_ the function, we just _defined_ it.

You could definitely still cause a problem by _running_ the anonymous function, like this:

```js
runFunc(
  (function () {
    log("Hello World");
  })()
); // Notice the extra ()
```

Likewise, you could also use a named function that they calls the `log` function.

```js
function logHello() {
  log("Hello World");
}

runFunc(logHello);
```

I don't like this pattern because `logHello` is _so specific_ that we're unlikely to reuse it elsewhere in the application, which devalues abstracting it into its own function.

### A Real-World Example

As a real-world example, see this practice in action when working with `addEventListener`.

## Using Additional Parameters

Although it may not always be an option, when you have control over `runFunc`, another approach is to add additional parameters to represent arguments that you can pass onto the function within `runFunc`.

```js
function log(text) {
  console.log(text);
}

function runFunc(fn, arg) {
  fn(arg);
}

runFunc(log, "Hello World");
```

### Accounting for Multiple Parameters

And you could even use the spread operator to account for multiple arguments being passed to the interior function.

```js
function log(a, b) {
  console.log(a, b);
}

function runFunc(fn, ...args) {
  fn(...args);
}

runFunc(log, "Hello", "World");

// => "Hello"
// => "World"
```
