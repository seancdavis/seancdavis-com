---
title: Open External next/link Links in a New Tab
description: >-
  Add a component that dynamically swaps between next/link and a native anchor
  tag, and decides how to write the target attribute, all based on the href
  property.
tags:
  - javascript
  - nextjs
  - react
tweet: >-
  There are some utility components I find myself adding to every project. The
  auto-resolving internal/external link component is a common one.
image: /posts/220630/open-external-nextlink-links-in-a-new-tab-xSi60sD-.png
seo:
  image: /posts/220630/open-external-nextlink-links-in-a-new-tab-MpbHt5xd--meta.png
---

I like when links to external pages open in a new tab, while internal pages stay in the same tab. It is especially beneficial to keep internal links using the [next/link](https://nextjs.org/docs/api-reference/next/link) component, since it enables you to take advantage of the router and speed up subsequent page loads.

## 1. Add Link Control Component

The first step is to add a custom link component that controls the rendering of the link. The basic logic would look something like this:

```js
import NextLink from "next/link";
import { ExternalLink } from "path/to/external/link";

export const Link = ({ children, ...props }) => {
  if (props.href.toString().startsWith("/")) {
    return <NextLink {...props}>{children}</NextLink>;
  } else {
    return <ExternalLink child={children} href={props.href.toString()} />;
  }
};
```

This logic is at the most basic level. If the `href` property passed to the `next/link` component begins with a slash (`/`), consider it an internal link and pass it on to `next/link`. Otherwise, render some external link component.

## 2. Add ExternalLink Component

Now let’s add the external link component:

```js
import { cloneElement, isValidElement } from "react";

export const ExternalLink = ({ child, href }) => {
  if (!isValidElement(child)) {
    throw new Error("Child must be a valid React element");
  }
  if (child.type !== "a") {
    throw new Error("Child must be an <a> element");
  }
  return cloneElement(child, {
    href,
    target: "_blank",
    rel: "noopener noreferrer",
  });
};
```

This may look a little different to you, as it’s not immediately apparent that it’s rendering JSX code.

First, we do some runtime checking to ensure the child is a single `<a>` component. After validation, we clone that element, adding the appropriate props (`target` and `rel`) in the process.

## 3. Change Link Imports

The beauty of this approach is that you don’t have to change anything with your code other than the import statements.

Wherever you have this in your code:

```js
import Link from "next/link";
```

Change it to this:

```js
import { Link } from "path/to/link/component";
```

{% callout type="warning" %}
Notice two things here:

1. The default import (`Link`) changed to a named import (`{ Link }`). While the React community still readily uses default imports, I like named imports for better clarity of what you’re importing. [Here’s a take I generally align with](https://mindsers.blog/post/javascript-named-imports-vs-default-imports/).
1. The `path/to/link/component` should be switched for wherever you put these components.
   {% endcallout %}

That’s it! You should now have a working example of automatically opening external links in a new tab.

## Playground

In the example below, I combined the components into a single component. Play around with it to make it work for you.

[https://stackblitz.com/edit/nextjs-ehvtnq?file=components%2FLink.jsx,pages%2Findex.js,pages%2Fpage-2.js](https://stackblitz.com/edit/nextjs-ehvtnq?file=components%2FLink.jsx,pages%2Findex.js,pages%2Fpage-2.js)

## Next Steps

This was just a simple example and a starting point. Where you go from here is up to you.

But now you have this dynamic feature which is super powerful. You could do something like automatically added an icon to indicate that a link is going to open in a new window.

The possibilities are endless!
