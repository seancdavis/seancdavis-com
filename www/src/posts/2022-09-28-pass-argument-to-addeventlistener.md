---
title: Pass Argument to addEventListener
description: >-
  When using the native addEventListener function, you may often want to pass
  arguments to the callback function. Anonymous functions are here to help.
tags:
  - javascript
tweet: >-
  I’ve known the answer to this problem for more than a decade, and it still
  occasionally trips me up.


  When this happens, I write it down, and the chance I remember in the future
  increases (significantly).
image: /posts/220928/pass-argument-to-addeventlistener-IBMyPi38.png
seo:
  image: /posts/220928/pass-argument-to-addeventlistener-eOjya_2B--meta.png
---

Say you have a shared function called `log` that is just a simplified alias to `console.log`:

```js
function log(text) {
  console.log(text);
}
```

And **you want to call this function after some event occurs, like a click on a particular button.**

## Calling Function with Arguments Fires Once

This won't work:

```js
const button = document.getElementById("my-btn");
button.addEventListener("click", log("Hello!"));
```

When you use `log("Hello!")` as an argument, it gets executed when the code is parsed, _not_ when the `addEventListener` function is executed (i.e. when the button is clicked).

## Using an Anonymous Function

Instead, you can _define_ an anonymous function, and inside it call the `log` function.

```js
const button = document.getElementById("my-btn");
button.addEventListener("click", function () {
  log("Hello!");
});
```

This pattern is a result of the API for this particular method (`addEventListener`). But it's also a common pattern in JavaScript. See here for a broader example and deeper explanation.
