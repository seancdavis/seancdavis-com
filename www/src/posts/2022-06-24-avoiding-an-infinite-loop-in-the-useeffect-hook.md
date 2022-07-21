---
title: Avoiding an Infinite Loop in the useEffect Hook
description: It’s surprisingly easy to create infinite loops in React.
tags:
  - react
tweet: >-
  Although there is an eslint plugin to help avoid it, it’s still frustrating
  how easy it is to end up in an effect hook infinite loop.


  This must trip up every React dev at some point. Why is the default not to
  have no dependencies?
image: /posts/220624/avoiding-an-infinite-loop-in-the-useeffect-hook-Vh3kaMtp.png
seo:
  image: >-
    /posts/220624/avoiding-an-infinite-loop-in-the-useeffect-hook-ohudqkbh--meta.png
---

If you’ve encountered an infinite loop in React, it’s almost certain that you’ve added code inside an effect hook without specifying a dependency. Unfortunately, React doesn’t tell you that you’re doing anything wrong.

Here’s a simple example in which you update and render a counter.

```jsx
import { useEffect, useState } from "react";

export const MyInfiniteLoop = () => {
  const [count, setCount] = useState(0);

  useEffect(() => setCount(count + 1));

  return <div>Count: {count}</div>;
};
```

In this case, here’s what happens:

1. Component renders.
1. `useEffect()` runs.
1. `count` is incremented by `1`. This triggers a re-render. (Go to #1.)

## Avoiding the Hook

The way to get around this is to specify an array of dependencies to the effect hook. By default, there are no dependencies, which means it will run every time the component renders.

You can instead tell the hook that it has no dependencies, and so it will only render a single time.

```jsx
import { useEffect, useState } from "react";

export const MyInfiniteLoop = () => {
  const [count, setCount] = useState(0);
  // Use an empty array as the second arg to specify no dependencies
  useEffect(() => setCount(count + 1), []);
  return <div>Count: {count}</div>;
};
```

## Catching Infinite Loops Earlier

If you’re using [eslint](https://eslint.org/), as is a common practice in modern JavaScript projects, then you can make use of the [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)[ plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks), which will throw warnings when there is a risk for more renders than intended.
