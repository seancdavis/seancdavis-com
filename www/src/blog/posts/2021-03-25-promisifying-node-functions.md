---
title: Promisifying Your Node Callback Functions
date: 2021-03-25
description: Learn how to convert old Node.js callback-based function to new and shiny promised-based functions.
image: /blog/210325/210325-callback-hell.png
tags:
  - repost-grouparoo
  - node
canonical_url: https://www.grouparoo.com/blog/promisifying-node-functions
---

The Grouparoo application is written in JavaScript (Node). It uses the modern promise-based pattern (`async`/`await`) for reading and writing data asynchronously. And we do this _a lot_ — we are a data sync tool!

Every once in awhile we'll come across a JavaScript library that is written around the old callback-based pattern, where the error object is the first parameter in the callback function, followed by the result.

The old way looked something like this:

```js
doThing('theThing', function(error, result) {
  // Catch the error or do something with result ...
}
```

This pattern isn't compatible with the new approach where I want to wait for each asynchronous function to resolve so I can predict the order in which my code is executed.

Every once in awhile we'll come across a library that follows this old pattern. We'll have to figure out a way to make it work with our code. There are three approaches you can take in many cases:

## Option #1: Find an Existing Wrapper

It's possible there is a promise-based version of the library you're looking to use.

For example, I was looking to work with the [Node-based `sqlite3` library](https://github.com/mapbox/node-sqlite3) and I found [a package called `sqlite-async`](https://github.com/fhellwig/sqlite-async).

Personally I don't love this option for two reasons:

1. It's another layer of dependencies that you have to worry about someone keeping up (and that someone is very likely not the author of the thing you _really_ want).
2. It's not that difficult to do yourself (without an additional dependency).

## Option #2: Wrap it Yourself

The [JavaScript Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is well-built for you to manually wrap the callback-based functions in promises. To _promisify_ those functions.

Take our example:

```js
doThing('theThing', function(error, result) {
  // Catch the error or do something with result ...
}
```

You could wrap this in a promise-based function called `doThingAsync` like so:

```js
doThingAsync(param1) {
  return new Promise((resolve, reject) => {
    doThing(param1, (error, result) => {
      if (error) return reject(error)
      return resolve(result)
    })
  })
}
```

Now you can run the original example like so:

```js
const result = await doThingAsync("theThing")
```

This is a great method when you only need to wrap a few functions or when you want fine-grained control on the output of specific functions. For example, if you want more control over the error messages returned.

If there are a lot of functions to wrap or customize, it might be worth it to go back and look for an existing wrapper (Option #1). But don't go yet — there's a magical third option!

## Option #3: Node's `util.promisify()`

Node has [a built-in promisify utility](https://nodejs.org/dist/latest/docs/api/util.html#util_util_promisify_original) that does this work for you.

Using this approach, we can rewrite our original example like so:

```js
import { promisify } from "util"

const doThingAsync = promisify(doThing)
const result = await doThingAsync("theThing")
```

That's super simple! And that's why this is my preferred approach when it can be implemented cleanly.

Part of the reason this is so simple is also because it is opinionated. There are two gotchas that you should lookout for when using this utility:

### Gotcha #1: Callback Pattern

For this to work right, the callbacks must follow a strict parameter structure. The callback functions must pass an `error` argument first (which is `null` or `undefined` if there is no error), and the `result` object second.

This is the structure I've shown in the examples here. But if the library you're dealing with has a different callback structure, you won't be able to use `util.promisify()` with it.

### Gotcha #2: Binding Instances

When we're dealing with an instance of a class or object, we have to bind that object to `promisify`. Here's an example:

```js
const instance = new Thing()
const doThingAsync = promisify(instance.doThing).bind(instance)
const result = await doThingAsync("theThing")
```
