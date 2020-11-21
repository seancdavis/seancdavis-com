---
title: Export ES6 Class Globally with Webpack
description: "Webpack creates its own scope for your bundle, but you can make it globally available."
tags:
  - javascript
  - webpack
---

In [a previous article on distributing JavaScript libraries](/use-netlify-host-js-libraries.html) I used [an example](https://github.com/seancdavis/hello-world-js) that uses [Webpack](https://webpack.js.org/) to build (and Babel to transpile) an ES6 class and expose it as a global variable.

Most of this process came from [an article on this very subject](http://siawyoung.com/coding/javascript/exporting-es6-modules-as-single-scripts-with-webpack.html).

That articles states that there are only a few steps. I'll demonstrate those steps quickly with [my `HelloWorld` example](https://github.com/seancdavis/hello-world-js):

## The Process

Let's say my main file is `src/index.js`, which looks like this:

`src/index.js` {.filename}

```js
import { HelloWorld } from "./components/hello-world"
module.exports = HelloWorld
```

And my component looks like this:

`src/components/hello-world.js` {.filename}

```js
export class HelloWorld {
  static log() {
    console.log("Hello world!")
  }

  static write() {
    document.body.append("Hello World!")
  }
}
```

To make this class globally available I have to adjust my webpack config slightly:

`webpack.config.js` {.filename}

```js
const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "hello-world.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "HelloWorld"
  }
}
```

I add two extra lines:

- `libraryTarget: 'var'` tells webpack to make the library available as a global variable.
- `library: 'HelloWorld'` names that global variable (in this case, it's `HelloWorld`).

## The Problem

That's where the article got me, but there's a problem with it today. It causes this error:

    Cannot assign to read only property 'exports' of object '#<Object>'

Essentially what that means is [you can't mix ES6 imports with CommonJS exports](https://github.com/webpack/webpack/issues/4039#issuecomment-273804003).

## The Fix

The thing is we need the CommonJS export for this to work. So, what do we do? [Change the `import` to `require`](https://stackoverflow.com/a/37812619/2241124) so both use CommonJS. The most important piece, though, is that we append `.default` to the require so that we attach the ES6 module directly to the variable (as opposed to nested within its `default` object).

So, `index.js` changes to:

`src/index.js` {.filename}

```js
const HelloWorld = require("./components/hello-world").default
module.exports = HelloWorld
```

And the component's class name isn't necessary, so we can do this:

`src/components/hello-world.js` {.filename}

```js
export default class {
  // ...
}
```

Now you can build and see the bundle available globally as `HelloWorld`, effectively exposing the two static methods in my example (`log()` and `write()`) direct on the `HelloWorld` object.

In other words, if you were to load the resulting bundle on a website, you'd have access to run both static methods like so:

```js
HelloWorld.log() // Logs "Hello World!" to the console.
HelloWorld.write() // Appends "Hello World!" to the DOM's body.
```
