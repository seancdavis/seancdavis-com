---
title: Render XML Page with Next.js
description: Learn how to generate an XML page with Next.js.
tags:
  - nextjs
image: /posts/220723/render-xml-page-with-nextjs-IwegTnLI.png
seo:
  image: /posts/220723/render-xml-page-with-nextjs-9eeTk0UN--meta.png
---

To render a page in Next.js as XML (or really any other non-HTML format), here’s a pattern that I’ve found works well:

```js
const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  // Fetch data and build page content ...
  const content = "...";

  res.setHeader("Content-Type", "text/xml");
  res.write(content);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
```

This pattern may look a little odd, so let’s break it down:

- Nothing is rendered from the component. The page component is just an empty component that renders `null`.
- `getServerSideProps` hijacks the Node.js response by 1) setting the appropriate content type header, and 2) returning with the content (as a string) to be rendered on the page.

Note that we still want to return the `props` object or Next gets mad.
