---
title: Resetting State on Next.js Route Change
description: >-
  Component state doesn't change when navigating between dynamic routes in
  Next.js that use the same component. useEffect can help.
tags:
  - nextjs
tweet: >-
  Ended up down a rabbit hole trying to figure out why navigating between pages
  sharing a component doesn't reset state with @nextjs.


  Making the route change a dependency to useEffect solved the issue, but it's
  not pretty.
image: /posts/220521/resetting-state-on-nextjs-route-change-dOtL5oVA.png
seo:
  image: /posts/220521/resetting-state-on-nextjs-route-change-EvKFQqZr--meta.png
---

One of Next.js's most powerful features, [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes), can be challenging when it comes to managing the state of components that are used on multiple pages.

Consider a dynamic route (`pages/[[...slug]].js`) that tells Next we have two routes for that page: `/` and `/other-page`.

`pages/[[...slug]].js` {.filename}

{% raw %}

```tsx
export default function DynamicPage(props) {
  return (
    <div style={{ margin: "2rem" }}>
      <h1>{props.title}</h1>
    </div>
  );
}

export async function getStaticProps(context) {
  const title = context.params?.slug ? "Page 2" : "Page 1";
  return { props: { title } };
}

export async function getStaticPaths() {
  return {
    paths: ["/", "/other-page"],
    fallback: false,
  };
}
```

{% endraw %}

On both pages we're going to load a button component that has a count clicker, along with a header that uses `next/router` to help us quickly navigate between pages without performing a full reload.

`pages/[[...slug]].js` {.filename}

{% raw %}

```tsx
import { Button } from "../components/Button.jsx";
import { Header } from "../components/Header.jsx";

export default function DynamicPage(props) {
  return (
    <div style={{ margin: "2rem" }}>
      <Header />
      <h1>{props.title}</h1>
      <Button />
    </div>
  );
}

// ...
```

{% endraw %}

The header looks like this:

`comopnents/Header.jsx` {.filename}

{% raw %}

```tsx
import Link from "next/link";

export const Header = () => {
  return (
    <nav>
      <Link href="/">
        <a style={{ marginRight: "0.5rem" }}>Page 1</a>
      </Link>
      <Link href="/other-page">Page 2</Link>
    </nav>
  );
};
```

{% endraw %}

And the button:

`comopnents/Button.jsx` {.filename}

```tsx
import { useState } from "react";

export const Button = () => {
  const [clickedCount, setClickCount] = useState(0);

  return (
    <div>
      <p>Click Count: {clickedCount}</p>
      <button onClick={() => setClickCount(clickedCount + 1)}>Increment</button>
    </div>
  );
};
```

## State is Not Reset when Changing Pages

The state is not reset when navigating between _dynamic_ pages using this button. The behavior looks like this:

{% post_image alt="", src="/uploads/220521/Untitled.gif" %}

## Handing State Reset

To reset the state between page loads, a component can make use of the `useEffect` hook, where the route change is a dependency.

To do so, we bring in `next/router` and use the `asPath` property as the `useEffect` dependency. Like this:

`comopnents/Button.jsx` {.filename}

```tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const Button = () => {
  const [clickedCount, setClickCount] = useState(0);
  const dynamicRoute = useRouter().asPath;

  // Reset count to 0 on dynamic route change.
  useEffect(() => setClickCount(0), [dynamicRoute]);

  // ...
};
```

This gives us the reset behavior:

{% post_image alt="", src="/uploads/220521/Untitled.gif" %}

## More Complex Scenarios

In some cases, you may be using `useEffect` for other purposes and with other dependencies. In these cases, you can either add additional logic and checks into your existing `useEffect` call, or you call simply add another call with different dependencies. That's the beauty of hooks in React.

```tsx
useEffect(() => setClickCount(0), [dynamicRoute]);
useEffect(() => {
  // do other stuff ...
}, [otherDeps]);
```

## Resources

See the [example project](https://stackblitz.com/edit/nextjs-uvxayz?file=components/Button.jsx) for a demo and to understand how it all fits together.

This [StackOverflow answer](https://stackoverflow.com/a/68533711/2241124) helped me solve my particular issue, which was slightly more complex than this simple example.
