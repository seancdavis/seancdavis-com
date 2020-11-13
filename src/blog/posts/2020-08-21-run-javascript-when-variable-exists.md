---
title: "Run JavaScript when Variable Exists"
snippet: "It's super frustrating to have a race condition in which some JavaScript code may be run before a variable it needs exists, causing an error. Here's one approach to getting around that."
tagnames: ["JavaScript"]
---

One method for increasing page performance is to defer the loading of [JavaScript](/wtf-is-javascript). But a big caveat that comes along with that approach is that you may have JS elsewhere in your page that wants to run before the deferred script has loaded.

To overcome that, you can add a script in the `<head>` of your page that waits for the presence of an object (for a maximum amount of time), and runs your code only if (or when) that object exists.

Let's say we want that function to be called `onInit()`. We also want it to be available globally, and it should check for the presence of an `App` object. If the `App` object exists, it will run the callback function passed to it, otherwise it will wait, up to a specified period of time, for that object to exist.

The code for `onInit` may look something like this:

```js
window.onInit = (callback, interval = 250, maxWaitDuration = 5000) => {
  const appInterval = setInterval(() => {
    // Don't do anything during this interval if App doesn't exist.
    if (!window.App) return
    // If App does exist, clear the interval, and run the callback function.
    clearInterval(appInterval)
    callback()
  }, interval)

  // Timeout the checking process after the specified max time.
  setTimeout(() => clearInterval(appInterval), maxWaitDuration)
}
```

By default, this function checks every 0.25 seconds to see if the `App` object exists. If it does, it runs the `callback` function immediately. Otherwise, it waits another 0.25 seconds, and checks again, maxing out and automatically stopping after 5 seconds.

The usage of this function looks like this:

```js
onInit(() => {
  console.log("App is ready!")
})
```

Now you can safely write code that is executed at any point in the page-loading process and be confident that it's not going to be passed over or cause an error.
