---
title: "Add Netlify Redirects and Headers to an Eleventy Project"
description: "What seems like a simple task can be a little tricky to get right with Eleventy. Learn how to add a _redirects file to Eleventy projects deployed with Netlify."
tags:
  - eleventy
  - netlify
---

On the surface, this seems like such a simple task: Create a [`_redirects`](https://docs.netlify.com/routing/redirects/) or [`_headers`](https://docs.netlify.com/routing/headers/) file and drop them into the build directory.

The difficulty is that Eleventy is configured to not copy over any files that begin with an underscore.

Instead, we can [use the concept of a static directory](/blog/add-static-directory-to-eleventy/). Eleventy can be configured to copy all files within a directory into the build directory using the [custom output directory](https://www.11ty.dev/docs/copy/#change-the-output-directory/) flavor of the [manual passthrough file copy option](<https://www.11ty.dev/docs/copy/#manual-passthrough-file-copy-(faster/)>).

The configuration looks like this:

`.eleventy.js` {.filename}

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: "/" })
}
```

That tells us every file in the `static` directory (including files with a preceding underscore) will be copied into the root of the build directory.

After adding that option, you can place your `_redirects` or `_headers` file into a `static` directory (e.g. `static/_redirects`) and it will be copied to your build directory (e.g. `_site/_redirects`).
