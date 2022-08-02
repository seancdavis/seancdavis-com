---
title: Custom XML Sitemap from a Catch All Route in Next.js
description: >-
  Building an XML sitemap in Next.js is a bit of an odd process. Here’s how I’ve
  done it by leveraging getStaticPaths methods from page components.
tags:
  - nextjs
tweet: >-
  Building a sitemaps with Next.js can be a tricky process. Recently I was able
  to take advantage of getStaticPaths to DRY up the code and make the process a
  little simpler.
image: /posts/220802/custom-xml-sitemap-from-a-catch-all-route-in-nextjs-O4PtZMB7.png
seo:
  image: >-
    /posts/220802/custom-xml-sitemap-from-a-catch-all-route-in-nextjs-i0Ptrovt--meta.png
---

I wrote previously about a pattern for [building XML pages with Next.js](/posts/render-xml-page-with-nextjs/). Let's use that approach to see how we can generate a `sitemap.xml` file using the pages generated from a prerendered [catch all route](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes).

If your site has a `pages/[...slug].jsx` page that prerenders dynamic content, it likely has a `getStaticPaths()` exported function. This is the function responsible for telling Next.js all the routes that should be fed through that page component.

We can take advantage of that function by calling it directly, and using the output to generate a sitemap.

Here's how I've done this for a recent site I built:

```ts
import React from "react";
import { GetServerSideProps } from "next";

import { getStaticPaths } from "pages/[...slug]";

const baseUrl = "https://www.mysite.com/";

const Sitemap: React.FC = () => null;

export default Sitemap;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { paths: pagePaths } = await getStaticPaths({});
  const updatedAt = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pagePaths
        .map((pagePath) => {
          return `
              <url>
                <loc>${baseUrl.replace(/\/$/, "")}${pagePath}</loc>
                <lastmod>${updatedAt}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
```

Building on the previous [XML example](/posts/render-xml-page-with-nextjs/), there are a few new things to note:

- `getServerSideProps()` has to be an async function **if the** **`getStaticPaths()`** **function it is using (from** **`[...slug].jsx`\*\***) is an async function.\*\*
- I set the `baseUrl` explicitly here. You probably want to store that in some place that's easier to maintain and can be shared among other files in your project.
- `updatedAt` gets updated to the current date and time. If you want to be more accurate, you'll have to find a better way to track when each page was last updated.
- All change frequency and priority fields are hard-coded. Again, you may want to be more elaborate here.

I hope that helps you! I went through a number of tutorials before I found that the solution for building a sitemap with Next.js can actually be fairly straightforward in many cases, even if it's not a great experience.
