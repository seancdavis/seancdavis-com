---
title: Storing Multiple Elements in a Single Ref in React
description: >-
  In some cases, you may want multiple references in a component of unknown
  quantity. Here’s how you can make it work.
tags:
  - react
image: /posts/220531/storing-multiple-elements-in-a-single-ref-in-react-E0IKu-hI.png
seo:
  image: >-
    /posts/220531/storing-multiple-elements-in-a-single-ref-in-react-B494244n--meta.png
---

A typical use of [the ](https://reactjs.org/docs/hooks-reference.html#useref)[useRef](https://reactjs.org/docs/hooks-reference.html#useref)[ hook](https://reactjs.org/docs/hooks-reference.html#useref) is to be able to access the HTML element directly. This is the example from the React docs:

```tsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

This unlocks the ability to access native properties and call native functions on that element.

## Accounting for Multiple (Unknown) Refs

I often run into a scenario in which I want direct access to elements with a component (like the example above), but I don’t know how many components there will be.

Consider if we had a similar component, but rather than focusing a single text input, the button would tab through a series inputs of unknown quantity. In that case, we might track the active input with a state, and then increment the index with each button click.

Because I don’t know how many inputs there will be, I can’t use `useRef` directly on each one. The workaround is to store the ref as an array ...

```tsx
const inputEls = useRef([]);
```

... and then pass a function when applying the reference.

```tsx
// An example where `idx` is a known index value
<input ref={(el) => (inputEls.current[idx] = el)} type="text" />
```

In context, that might look something like this:

{% raw %}

```tsx
import React, { useRef, useState } from "react";

export function Component(props) {
  const [nextIdx, setNextIdx] = useState(0);
  const inputEls = useRef([]);

  const onButtonClick = (idx) => {
    inputEls.current[nextIdx].focus();
    // Find the new next index.
    setNextIdx(nextIdx + 1 >= props.inputCount ? 0 : nextIdx + 1);
  };

  return (
    <>
      {Array(props.inputCount)
        .fill()
        .map((_, idx) => (
          <input
            ref={(el) => (inputEls.current[idx] = el)}
            type="text"
            style={{ display: "block", marginBottom: "0.5rem" }}
          />
        ))}
      <button onClick={onButtonClick}>Tab through inputs</button>
    </>
  );
}
```

{% endraw %}

That leads to this behavior:

{% post_image alt="", src="/uploads/220531/tabbed-inputs.gif" %}

## Playground

[Here’s a playground](https://stackblitz.com/edit/react-w45ry9?file=src/App.js) with this code so you can see it in action.
