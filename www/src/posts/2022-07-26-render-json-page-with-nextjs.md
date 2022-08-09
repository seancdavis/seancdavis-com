---
title: Render JSON Page with Next.js
description: Build a JSON page component with Next.js.
tags:
  - nextjs
image: /posts/220726/render-json-page-with-nextjs-7lXN52b4.png
seo:
  image: /posts/220726/render-json-page-with-nextjs-HDrsSrmj--meta.png
---

Say you have some JSON code — e.g. `{ "hello": "world" }` — that you want to return as some page in your Next.js site. Here’s what you can do:

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

This is essentially the same as the post I wrote on [building an XML page with Next.js](/posts/render-xml-page-with-nextjs/). Here's how this code works:

- Render `null` (or nothing) from the page component.
- Use `getServerSideProps` to build a JavaScript object, convert it to a JSON string, and hijack the Next.js response to set the appropriate headers and render the content.

Note that we still want to return the `props` object or Next gets mad.

A playground with this example is shown below ([source](https://stackblitz.com/edit/nextjs-7en4fh?file=pages/test.json.jsx)):

{% code_playground url="https://stackblitz.com/edit/nextjs-7en4fh?ctl=1&embed=1&file=pages/test.json.jsx&hideExplorer=1" %}
