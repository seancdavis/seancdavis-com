---
title: Get user's Previous Path with NextJS Router
date: 2021-02-17
description: How to find the previous page a user visited before landing on the current page.
image: /blog/210217/210217--next-prev-path.png
tags:
  - repost-grouparoo
  - nextjs
canonical_url: https://www.grouparoo.com/blog/getting-previous-path-nextjs
---

We have a form [on our meet page](https://www.grouparoo.com/meet) (which, BTW, we'd love you to fill out because we like meeting new people). In addition to the data input from the user, we also wanted to capture how that user got to the page. That helps us determine which of our content is most effective in getting website visitors to take action.

## The `document.referrer` Attempt

My gut was to start with [`document.referrer`](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer). I've used it in the past with some success and it seemed like a simple solution.

The [official spec](https://html.spec.whatwg.org/multipage/dom.html#dom-document-referrer-dev) says `document.referrer` should do this:

> Returns the URL of the Document from which the user navigated to this one, unless it was blocked or there was no such document, in which case it returns the empty string.

We have two problems with this approach:

1. If the user came from a different site, we won't have a referrer. I'm okay with this, because we really just wanted to measure the effectiveness of the content we're creating (for now).
2. If the user navigated using a Next.js `<Link />` component, or the [Next router](https://nextjs.org/docs/api-reference/next/router), it will also be an empty string (i.e. no referrer).

The latter issue was a deal-breaker because a good portion of the links within the site made use of Next's router, which provides a more performant experience for the user.

## Tracking the Current and Previous Page with sessionStorage

Although it feels a little hacky, we figured that we could do a little current-previous-current dance on every page load, using either `localStorage` or `sessionStorage` to store the values. It would work like this:

We decided on `sessionStorage` over `localStorage` because the session storage is cleared when the window or tab is closed. So if we have a previous page, then we can _reasonably_ assume that's where the user came from. And we don't have to worry about clearing it when the page is unloaded.

To accomplish this, we used a React's `useEffect` to adjust these values [in our `_app.tsx` file](https://github.com/grouparoo/www.grouparoo.com/blob/master/pages/_app.tsx) when the router's path changed. It looks like this:

```tsx
// File: pages/_app.tsx

import { useRouter } from "next/router"
import { useEffect } from "react"

export default function GrouparooWWW(props) {
  const router = useRouter()

  useEffect(() => storePathValues, [router.asPath])

  function storePathValues() {
    const storage = globalThis?.sessionStorage
    if (!storage) return
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem("currentPath")
    storage.setItem("prevPath", prevPath)
    // Set the current path value by looking at the browser's location object.
    storage.setItem("currentPath", globalThis.location.pathname)
  }

  // ...
}
```

Every time the `router.asPath` value changes, `storePathValues` fires, which adjusts our `prevPath` and `currentPath` values.

With this approach we are only capturing local traffic. But we don't have to worry about any special way of linking to the `/meet` page. It just does its thing behind the scenes, regardless of whether the link to the page used Next's router or not.

If you're still super curious, [here is the PR](https://github.com/grouparoo/www.grouparoo.com/pull/223) to our website that introduced this change.
