---
title: Simple JavaScript Pipeline with webpack
description: "webpack has a reputation for being super complex and difficult to implement. But as its most basic, it can do a lot with little development effort. Let's walk through a simple example together."
image: /blog/210528/orange--webpack-pipeline.png
tags:
  - javascript
  - webpack
---

## webpack Introduction

[webpack](/blog/wtf-is-webpack) has a reputation for being pretty gnarly. If you've dug through the code of an established project using webpack, it's likely mind-boggling at best. Shoot, take a look at the source code for [Next.js](https://nextjs.org/) — they have [an entire directory to manage webpack configuration](https://github.com/vercel/next.js/tree/5f3351dbb8de71bcdbc91d869c04bc862a25da5f/packages/next/bundles/webpack).

That complexity is due, in large part, to its power. webpack can do _a lot_.

Fortunately, the fine folks building this free and open source tool have been working hard to make each version a little easier to use than the previous. And now, you can start very simply, with very little config. Thus, you can justify the power of webpack in the smallest and simplest of projects.

## What We're Going to Build

Let's do that. Let's build a super simple build pipeline to bundle multiple [JavaScript](/blog/wtf-is-javascript/) modules together into a single file that we can load from any HTML page.

You can take a look at [the full code example](https://github.com/seancdavis/seancdavis-com/tree/0cc19cb/examples/webpack-es6-pipeline) at any point if you get stuck.

### Gotcha!

There's one big gotcha we'll have to overcome along the way. The output bundle is obfuscated and anonymous. That means we can't access it by default. And even if we could, we likely wouldn't know how to navigate it.

In our case, we want to access our bundled code from external places (like an HTML file), so we're going to load our main exports into an `App` object that we can then access from that main HTML file.

Specifically in this example, we want to be able to call `App.Logger.sayHi()` and see it print `"Hi!"` to the console.

Let's go!

## Step 1: Setup

If you have a project ready to go, great! If not, feel free to [follow my steps to get started](/blog/new-javascript-project-setup/), with the following notes:

These are the dependencies we're going to use:

- `http-server`
- `webpack`
- `webpack-cli`

And here are the scripts to add to `package.json`:

`package.json` {.filename}

```json
{
  // ...
  "scripts": {
    "build": "WEBPACK_ENV=production webpack",
    "dev": "webpack",
    "serve": "http-server dist -p 8000"
  }
}
```

## Step 2: Add JavaScript Files

Now let's add a couple JavaScript files. First, our Logger at `src/modules/logger.js`:

`src/modules/logger.js` {.filename}

```js
const sayHi = () => {
  console.log("Hi!")
}

export { sayHi }
```

And our main file (`src/main.js`), which will be responsible for exporting the `Logger` object.

`src/main.js` {.filename}

```js
import * as Logger from "./modules/logger"

export { Logger }
```

{% callout type="note" %}
If this were a bigger web project where you have more files in your `src` directory, you'd probably want to put these files in some other nested place, like a `js` directory.
{% endcallout %}

## Step 3: Add webpack Config

Next, let's add our webpack config. This code example is commented so you can see what's going on:

`webpack.config.js` {.filename}

```js
const path = require("path")
// Used to determine whether to watch the files or build.
const env = process.env.WEBPACK_ENV || "development"

module.exports = {
  // The main file for the bundle.
  entry: "./src/main.js",
  output: {
    // Name of the bundle file.
    filename: "bundle.js",
    // Directory in which the bundle should be placed.
    // Here we're saying `dist/js/bundle.js` will be our bundled file.
    path: path.resolve(__dirname, "dist/js"),
    // These two library items tells webpack to make the code exported by main.js available as a variable called `App`.
    libraryTarget: "var",
    library: "App"
  },
  mode: env,
  // If we're in development mode, then watch for changes, otherwise just do a single build.
  watch: env !== "production"
}
```

{% callout type="note" %}
To summarize:

- `main.js` is the primary targeted file, which will be bundled to `dist/js/bundle.js`.
- The exports from `main.js` will be available globally in an `App` variable.
- When the `WEBPACK_ENV` is set to something other than `production`, webpack will watch for changes. When `WEBPACK_ENV` is set to `production`, it will build the bundle and then stop running. We're setting this variable automatically in the scripts added to `package.json`.
  {% endcallout %}

## Step 4: Add HTML

Now let's add a simple `index.html` file to the `dist` directory, which is where the bundled JS file is going to be placed.

`dist/index.html` {.filename}

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple Webpack ES6 Pipeline</title>
  </head>
  <body>
    <p>Hello there.</p>

    <script src="/js/bundle.js"></script>
    <script>
      App.Logger.sayHi()
    </script>
  </body>
</html>
```

{% callout type="note" %}
In most real-world cases, you're probably going to have some sort of a build step that would place the file here, likely provided by the static site generator or other framework you're using.

In this case, we're placing the file in here as though it was already built so we can stay focused and not worry about all that setup.
{% endcallout %}

## Step 5: Run it!

We actually have two commands we have to run to get this to work. First, build the JavaScript bundle:

    $ npm run build

Then you can run the web server:

    $ npm run serve

Now visit localhost:8000, open your browser's console, and you should see the message `"Hi!"` printed!

If you want to to make changes to JavaScript and see them reflected without reloading your web server, you can use two terminal tabs. Run `npm run serve` in one to run the web server, and `npm run dev` in the other, which will watch for JavaScript changes and rebuild.

## References

- [Full code example](https://github.com/seancdavis/seancdavis-com/tree/0cc19cb/examples/webpack-es6-pipeline)

---

That's all it really takes to get up and running with webpack. Starting with a simple foundation is the key to understanding and working with webpack. Now you can build on this base and create something truly awesome and unique to you.
