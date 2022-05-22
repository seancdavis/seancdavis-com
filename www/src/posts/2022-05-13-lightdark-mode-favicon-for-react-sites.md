---
title: Light/Dark Mode Favicon for React Sites
description: >-
  Toggle between two favicon images based on the user’s current theme (color
  scheme).
tags:
  - React
image: /posts/220513/lightdark-mode-favicon-for-react-sites-eSbK7mY5.png
seo:
  image: /posts/220513/lightdark-mode-favicon-for-react-sites-W96fAxb1--meta.png
---

I have a Next.js (React) project where I wanted to adjust the favicon based on whether the current user is in dark or light mode.

Here’s a generic version of what I implemented. It is commented to add some context, and you can find additional context below the snippet.

```js
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

/**
 * Returns the path for a favicon based on the given color scheme.
 *
 * @param {boolean} isDarkMode If currently in dark mode
 */
const getFaviconPath = (isDarkMode = false) => {
  return `/favicon-${isDarkMode ? "dark" : "light"}.png`;
};

export default function MyApp() {
  const [faviconHref, setFaviconHref] = useState("/favicon-light.png");

  useEffect(() => {
    // Get current color scheme.
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    // Set favicon initially.
    setFaviconHref(getFaviconPath(matcher.matches));
    // Change favicon if the color scheme changes.
    matcher.onchange = () => setFaviconHref(getFaviconPath(matcher.matches));
  }, [faviconHref]);

  return (
    <>
      <Helmet>
        <link rel="icon" href={faviconHref} />
        {/* Other meta tags ... */}
      </Helmet>

      {/* Page content ... */}
    </>
  );
}
```

Here are the key elements to note:

- The image files are `favicon-light.png` and `favicon-dark.png`, where the “dark” image applies to the dark mode.
- I am using the light mode icon as the default. This is because: 1) light is the default on most machines, and 2) browser support is limited and it’s the natural fallback. (More on this below.)
- `useEffect` is used to ensure that `window` is available. And it runs only when the component is mounted, updated, or is about to be unmounted. [Learn more about the effect hook](https://reactjs.org/docs/hooks-effect.html).

Here’s a demo of the result:

{% post_image alt="", src="/uploads/220513/favicon-os-theme.gif" %}

## Limited Browser Support

The browser support for [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) is limited. This is why I mention using the light image as the default.

Some browsers have their own behavior. For example, Safari puts white box behind the icon when in dark mode so there’s no need to adjust.

{% post_image alt="", src="/uploads/220513/favicon-safari-dark.png" %}
