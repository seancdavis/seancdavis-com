---
title: WTF is webpack?
description: "webpack has been helping us write modular front-end JavaScript for many years. Learn the basics of module bundling and why webpack is so powerful."
image: /posts/210525/wtf--webpack.png
tags:
  - webpack
  - wtf
---

[webpack](https://webpack.js.org/) is a module bundler.

_Cool, but WTF is a module bundler?_

[JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) have been around for a long time. They provide a nice clean way to break up code into individual pieces (modules), so each file can focus on doing one thing and doing that thing effectively (i.e. the [single responsibility principle](/posts/wtf-is-single-responsibility-principle)).

This ability has been around in [Node.js](/posts/wtf-is-node) for many years. You probably recognize this pattern if you've written any Node code:

```js
const lodash = require("lodash");
```

For client-side [JavaScript](/posts/wtf-is-javascript), we've needed frameworks to help us achieve similar functionality because browsers did support module loading. That has changed and [browser support is improving](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#browser_support), but there is often still a need to do some work on your own.

webpack is one of those tools that helps in this regard. It allows you to write your code in _modules_ and then provides a mechanism to _bundle_ that code together.

The example [on their homepage](https://webpack.js.org/) is a nice simple one. You can have a `src/index.js` file like this:

`src/index.js` {.filename}

```js
import bar from "./bar.js";

bar();
```

And `src/bar.js` that looks like this:

`src/bar.js` {.filename}

```js
export default function bar() {
  // ...
}
```

Using [webpack's CLI](https://webpack.js.org/api/cli/), you can add a little config:

`webpack.config.js` {.filename}

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
```

And then bundle by running the following command on the command line:

    $ webpack

Doing so would take your two JS files in `src` and combine them into a single file `dist/bundle.js`, which you could then safely load from a webpage with confidence that you have compatibility with browsers used across the web.

While the landscape will change over the coming years, webpack is an essential tool in many front-end projects' arsenal today.
