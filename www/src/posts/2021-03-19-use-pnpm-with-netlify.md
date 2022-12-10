---
title: "How to Use PNPM in Netlify Build"
description: "PNPM is now natively supported by Netlify."
image: /posts/210319/yellow--pnpm-netlify.png
tags:
  - jamstack
  - netlify
  - pnpm
---

[PNPM](/posts/wtf-is-pnpm) is a great, performance-focused option for [monorepos](/posts/wtf-is-monorepo). It serves as an alternative to [NPM](/posts/wtf-is-npm) or Yarn.

When originally writing this article, I had run into a problem after switching to PNPM and trying to deploy this site to Netlify. PNPM was not fully supported by Netlify and required workarounds that effectively disabled NPM.

Fortunately, things have changed, and [PNPM now works seamlessly with Netlify](https://www.netlify.com/blog/how-to-use-pnpm-with-netlify-build/).

`netlify.toml` {.filename}

```toml
[build]
  command = "pnpm run build"
```
