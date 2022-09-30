---
title: JavaScript for 11ty with esbuild
description: >-
  As your 11ty application evolves, you’ll want more organization with your
  JavaScript. Here’s a method for bundling together using esbuild.
tags:
  - eleventy
  - javascript
tweet: >-
  This is the first time I’ve really played around with esbuild and it is
  amazing! It’s super fast and the API is easy to navigate.


  Here’s an example that uses esbuild for an 11ty JavaScript bundle.
image: /posts/220930/javascript-for-11ty-with-esbuild-iv1YeFMX.png
seo:
  image: /posts/220930/javascript-for-11ty-with-esbuild-J6wkbpgg--meta.png
---

As your 11ty application grows in size and complexity, it's very likely that:

1. You're going to need JavaScript at some point, and ...
1. You'll want to stay organized.

Otherwise, you'll end up with unmanageable spaghetti code and slow pages. No one wants that, _right?_

## Bundling JavaScript

To help stay organized, you can use tooling to take all the JavaScript in your application and bundle it into a single file that can be loaded from the pages that require it.

For this post, we're going to use [esbuild](https://esbuild.github.io/), a JS bundler that is known for its speed.

## Bundling JavaScript for 11ty with esbuild

Let's walk through the process of establishing a JS build pipeline for Eleventy using esbuild.

### Install esbuild

First, add esbuild to your project.

```txt
npm install -D esbuild
```

### Example JavaScript File

Next, make sure you have a main JavaScript file. For this example, I'll consider that file to be `js/index.js`. It be whatever you like, but be sure to have an entry point.

`js/index.js` {.filename}

```js
// Your main JavaScript content here ...
```

Find more information on what you might include and how you may structure this file farther down in the post.

### Add Build Hooks

Next, we want to run the build whenever the 11ty build runs.

`.eleventy.js` {.filename}

```js
const esbuild = require("esbuild");

module.exports = function (eleventyConfig) {
  eleventyConfig.on("eleventy.before", async () => {
    await esbuild.build({
      entryPoints: ["js/index.js"],
      bundle: true,
      outfile: "_site/js/bundle.js",
      sourcemap: true,
      target: ["chrome58", "firefox57", "safari11", "edge16"],
    });
  });
};
```

Notice that this targets our `js/index.js` file, but bundles it into a file in the site output at `_site/js/bundle.js`. Change the values here to fit your preferences.

### Load Bundle File

And last, make sure that you're loading your bundle file from your layout or page(s) needing to use the bundle.

```html
<!DOCTYPE html>
<html lang="en">
  <!-- ... -->
  <body>
    <!-- ... -->

    <script src="/js/bundle.js"></script>
  </body>
</html>
```

That should be enough to get it working for a super simple site. See below for tips, tricks, and a demo.

## Best Practices when Bundling for 11ty

Here are a collection of tips that I have found helpful while building out a similar approach for my sites.

### Watch Directory with JavaScript Files

You can [configure your own watch targets](https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets) that will tell 11ty when to rebuild the site. This is super helpful because it will tell 11ty to rebuild when you've edited a JavaScript file, thus giving you live reloading in the browser while developing.

`.eleventy.js` {.filename}

```js
module.exports = function (eleventyConfig) {
  // ...

  eleventyConfig.addWatchTarget("./js/");
};
```

### Importing to Stay Organized

Your main JavaScript file can import and export content as needed. That's the beauty of working with a JS bundler. This can help keep your JS files small and focused. Be sure to take advantage of this.

```js
import something from "some-lib";

something;
```

But note that you're not going to get much out of your main export because it will be scoped within the bundle. More on this in the next tip.

{% callout type="warning" %}
esbuild works to minimize the size of your bundle. If you want something included in the bundle, it has to be _used_ in the main file. It can't _just_ be imported. Otherwise, it may be ignored.

The example above does this by simply listing the variable `something` in the main body of the file.
{% endcallout %}

### Use Global Objects for Interactive Elements

You may want access to items within the bundle from pages in your application. The way I've handled this is to make them accessible through the `globalThis` object (equivalent to `window` in the browser).

I tend to import everything I want in my application into my main manifest file (`js/index.js`), and then load those imports into a global `App` object that is available on the `window`.

```js
import { Button } from "./components/button";
import { Slider } from "./components/Slider";

globalThis.App = {
  components: { Button, Slider },
};
```

This pattern has two benefits:

1. Ensures that everything being imported into the main file is also used in the bundle.
1. Provides access to all of these methods (through `window.App`) on any page that loads the bundle.

### Attach Libraries to Global Variables

Likewise, if you need access to global libraries directly in your pages, you also want to attach those to `globalThis` in your main file.

```js
import _ from "lodash";

globalThis._ = _;
```

This is not something I've needed to do, as I only use third-party libraries within other JavaScript files. Thus, I can import and use them directly without exposing them globally.

### Consider Loading Context and Page Speed

While bundling is convenient and a great way to stay organized, it also means that you may be requiring users to download code on pages that don't use it.

This is okay in small quantities. But as you include more third-party libraries and capabilities throughout your application, it's important to be cognizant of what you're adding to the page load as your JavaScript grows.

Here are a couple strategies for keeping a pulse on performance:

- Run regular performance tests to ensure your pages stay fast.
- Don't load JavaScript on pages that don't need it.
- If your bundle becomes bloated, consider building multiple bundles and loading them contextually.

In short, 11ty provides you the flexibility to load whatever you want on any page. There's a lot of responsibility with that control. Use it wisely.

## esbuild + 11ty Playground

Here's a super simple example that sets up an esbuild pipeline and shows some content being replaced on screen.

{% code_playground url="https://stackblitz.com/edit/11ty-pv5spq?ctl=1&embed=1&file=.eleventy.js" %}
