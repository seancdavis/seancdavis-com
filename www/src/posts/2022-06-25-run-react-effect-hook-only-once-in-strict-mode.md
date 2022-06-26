---
title: Run React Effect Hook only Once in Strict Mode
description: >-
  Running React in strict mode with Next.js can lead to useEffect callbacks with
  zero dependencies to run twice in development. Here’s a way around that.
tags:
  - nextjs
  - react
tweet: >-
  It took me awhile first to figure out why the effect hook was running twice in
  dev mode. And then quite a bit more digging until I had a reasonable escape
  hatch to avoid running the effect hook twice in dev mode.
image: /posts/220625/run-react-effect-hook-only-once-in-strict-mode-iPbgxvcN.png
seo:
  image: >-
    /posts/220625/run-react-effect-hook-only-once-in-strict-mode-h8fHA769--meta.png
---

You may have noticed that with newer Next.js projects, a `useEffect` hook runs twice. New Next.js projects now run in [strict mode](https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode), which is a feature of React 18.

A breaking change that came with React 18 was that components are mounted, unmounted, and remounted in development mode. This causes an effect hook (with specified dependencies that don’t cause additional renders) [to run twice](https://www.techiediaries.com/react-18-useeffect/).

## Effect Hook that Runs Twice

Here’s an example of a component with an effect hook that runs twice:

```jsx
import { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";

export const SimpleEffect = () => {
  const [timesRun, setTimesRun] = useState(0);
  const counter = useRef < number > 0;

  useEffect(() => {
    counter.current += 1;
    setTimesRun(counter.current);
  }, []);

  return (
    <p className={styles.description}>
      <code className={styles.code}>SimpleEffect</code> called:{" "}
      <code className={styles.code}>{timesRun}</code>
    </p>
  );
};
```

This is a simple counter that gets incremented every time the effect hook runs. This will result in `2` being rendered to the screen when running in development mode.

{% callout type="note" %}
I’m using a `ref` object here because I can be sure that the value increments. Because state changes are set asynchronously, I can’t ensure I’ll get `2` consistently, even thought the hook is run twice.
{% endcallout %}

## Using a Reference to Ensure Hook only Runs Once

To ensure this hook only runs once in development mode, we can add another reference object that tracks whether the callback to `useEffect` has been called. Something like this:

```jsx
import { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";

export const EffectRunOnce = () => {
  const [timesRun, setTimesRun] = useState(0);
  const counter = useRef < number > 0;
  const effectCalled = useRef < boolean > false;

  useEffect(() => {
    if (effectCalled.current) return;
    counter.current += 1;
    setTimesRun(counter.current);
    effectCalled.current = true;
  }, []);

  return (
    <p className={styles.description}>
      <code className={styles.code}>EffectRunOnce</code> called:{" "}
      <code className={styles.code}>{timesRun}</code>
    </p>
  );
};
```

Now we have an `efectCalled` reference that starts as `false`. It gets set to `true` the first time the effect runs. Every subsequent time, we exit early from the effect callback.

## Single Effect Run Demo

[Here's a demo](https://stackblitz.com/edit/nextjs-qmztpj?file=components%2FSimpleEffect.tsx,components%2FEffectRunOnce.tsx,pages%2Findex.js) in which you can see both components in action.

{% code_playground url="https://stackblitz.com/edit/nextjs-qmztpj?ctl=1&ile=pages/index.js" %}
