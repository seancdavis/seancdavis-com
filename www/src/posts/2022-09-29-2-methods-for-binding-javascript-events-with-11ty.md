---
title: 2 Methods for Binding JavaScript Events with 11ty
description: >-
  When using raw JavaScript with 11ty, there are multiple approaches you can
  take for binding events, all without complicating the JavaScript you’re using.
tags:
  - eleventy
  - javascript
image: /posts/220929/2-methods-for-binding-javascript-events-with-11ty-0NcA1UNj.png
seo:
  image: >-
    /posts/220929/2-methods-for-binding-javascript-events-with-11ty-9Cy9a-Yw--meta.png
---

11ty is a classic static site generator in the sense that the code gets executed on the server during build time, producing static assets that get deployed to production. And one of [the reasons I love 11ty](/posts/6-reasons-i-still-love-11ty/) is that it encourages minimizing the amount of JavaScript used.

Often, JavaScript becomes necessary at some point — e.g. for real-time data, interactive elements, etc. When that happens, there isn't a clear path to the best approach with 11ty. Here are two approaches you can take.

The approaches below both assume a simple example of a button with a click counter.

## Call JavaScript Inline

The first is to call JavaScript inline using HTML attributes. This is the old-school approach. One that was largely frowned upon until React came around and now makes it feel natural again.

```html
<button onclick="incrementCount('#btn-01-count')">Click Me</button>
<span id="btn-01-count">0</span> clicks

<script>
  function incrementCount(counterSelector) {
    const counterEl = document.querySelector(counterSelector);
    const count = parseInt(counterEl.innerText);
    counterEl.innerText = count + 1;
  }
</script>
```

One thing I _really_ like about this approach is that it's declarative from the markup. Your JavaScript is defined, but the JS code doesn't need to initiate any action. It just needs to be ready when the click happens.

### Avoid Naming Conflicts

An issue I've always had with this approach is that it's _very_ easy to run into naming conflicts. As your project grows, it's difficult to keep a handle on all the function names you've used throughout the application.

Therefore, I tend to wrap everything (or at least _parts_) of my JavaScript code into a global object, from which I can then call these methods.

In my JavaScript file, I have the function, defined as a property on a global object:

```js
window.App = {
  incrementCount: function (counterSelector) {
    const counterEl = document.querySelector(counterSelector);
    const count = parseInt(counterEl.innerText);
    counterEl.innerText = count + 1;
  },
};
```

And then I call `App.incrementCount` rather than `incrementCount` being available on the global `window` object.

```html
<button onclick="App.incrementCount('#btn-01-count')">Click Me</button>
<span id="btn-01-count">0</span> clicks
```

## Look for Data Attributes

Another approach is to bind events in the JS code directly to elements. I usually like to use data attributes to do this.

Consider this markup:

```html
<button data-click-increment="#btn-02-count">Click Me</button>
<p><span id="btn-02-count">0</span> clicks</p>
```

When JavaScript is loaded and the DOM is ready, we can target and loop through all elements with the appropriate data attribute (`data-click-increment`) and bind the `incrementCount` function.

```js
function incrementCount(counterSelector) {
  const counterEl = document.querySelector(counterSelector);
  const count = parseInt(counterEl.innerText);
  counterEl.innerText = count + 1;
}

const clickableEls = document.querySelectorAll("[data-click-increment]");
for (const el of clickableEls) {
  el.addEventListener("click", function () {
    incrementCount(el.dataset.clickIncrement);
  });
}
```

What I don't like about this approach is that it runs automatically on every page load, even when you may not need it.

I also don't love that the event binding is in the JavaScript and not the HTML, which I've found makes issues more difficult to debug.

## JavaScript Event Playground

See these examples in action.

{% code_playground url="https://stackblitz.com/edit/11ty-ode177?ctl=1&embed=1&file=js/app.js" %}
