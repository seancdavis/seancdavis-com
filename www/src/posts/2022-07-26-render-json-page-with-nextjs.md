---
title: Render JSON Page with Next.js
description: Build a JSON page component with Next.js.
tags:
  - nextjs
tweet: >-
  Here’s how I’ve rendered JSON pages with Next.js. It’s a bit of an odd
  pattern, but it gets the job done.
image: /posts/220726/render-json-page-with-nextjs-7lXN52b4.png
seo:
  image: /posts/220726/render-json-page-with-nextjs-HDrsSrmj--meta.png
---

Say you have some JSON (e.g. `{ "hello": "world" }`) that you want to return as some page in your Next.js site. Here’s what you can do:

```js
const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  const content = { hello: "World" };

  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(content));
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
```

This is essentially the same as the post I wrote on building an XML page with Next.js. We do the following:

- Render `null` (or nothing) from the page component.
- Use `getServerSideProps` to build a JavaScript object, convert it to a JSON string, and hijack the Next.js response to set the appropriate headers and render the content.

Note that we still want to return the `props` object or Next gets mad.

[Here’s an example](https://stackblitz.com/edit/nextjs-7en4fh?file=pages%2Ftest.json.jsx) of this process in action.
