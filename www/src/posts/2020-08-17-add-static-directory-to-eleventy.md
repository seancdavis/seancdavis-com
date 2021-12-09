---
title: Add a Static Directory to an Eleventy Project
description: Copy static files from a directory into the root of the build
  directory with Eleventy.
tags:
  - eleventy
image: /blog/default/default-yellow-02.png
---

Some static site generators, like [Gatsby](https://www.gatsbyjs.org/), have the concept of a [static folder](https://www.gatsbyjs.com/docs/static-folder/), in which anything you drop into that folder makes its way (unprocessed) to the build directory during the build process.

With Eleventy, a similar feature is trivial to achieve, but not so straightforward out of the box.

The simplest way to setup a static folder is to use the [manual passthrough file copy](<https://www.11ty.dev/docs/copy/#manual-passthrough-file-copy-(faster)>). After reading the docs, it _seems_ like it would be as simple as adding this code to your Eleventy config file:

`.eleventy.js` {.filename}

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("static")
}
```

But that would actually nest everything in `static/` under `_site/static/`, assuming your output directory is `_site` (which is the default).

But what we really want is to copy everything in `static` directly to `_site`. To do that we can use an option in which we [change the output directory](https://www.11ty.dev/docs/copy/#change-the-output-directory). That code looks like this:

`.eleventy.js` {.filename}

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: "/" })
}
```

This tells Eleventy to take everything in the `static/` directory and copy it to the root of your build directory (e.g. `static/sitemap.xml` to `_site/sitemap.xml`).
