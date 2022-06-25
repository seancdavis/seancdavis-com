---
title: One of My Favorite Performance-Boosting Netlify Plugins
description: >-
  Inlining critical CSS is a breeze for classic SSG sites built and deployed
  using Netlify. Here’s how it works.
tags:
  - netlify
  - performance
  - css
tweet: >-
  One of my absolute favorite @netlify build plugins is one that inlines
  critical CSS (by @tombonnike). It provided some quick performance wins to my
  classic SSG sites with (growing) global stylesheets.
image: >-
  /posts/220625/one-of-my-favorite-performance-boosting-netlify-plugins-oVcu3JAc.png
seo:
  image: >-
    /posts/220625/one-of-my-favorite-performance-boosting-netlify-plugins-pwCYLj41--meta.png
---

One of my favorite Netlify build plugins is one that often slides under the radar — [netlify-plugin-inline-critical-css](https://github.com/Tom-Bonnike/netlify-plugin-inline-critical-css) by [Tom Bonnike](https://twitter.com/tombonnike).

## How it Works

This plugin injects the [critical](https://www.npmjs.com/package/critical)[ package](https://www.npmjs.com/package/critical) into the Netlify build process. It targets a select set of built files and writes the CSS inline at the top of the file.

It then defers the loading of the rest of the site’s CSS so that it does not block the rendering process for your users.

### Before Inlining Critical CSS

When I run a build for my static site, I’m left with a `<link>` element that loads my stylesheet in the `<head>` of each document.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="/css/styles.css" />
    <!-- ... -->
  </head>
</html>
```

### After Inlining Critical CSS

After this plugin runs, I see a style tag in my `<head>` with only the styles required near the top of the home page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      /* critical styles only for this page ... */
    </style>
    <!-- ... -->
  </head>
</html>
```

It then defers the loading of the main stylesheet while the rest of the page is downloaded and rendered by the browser.

```html
<link
  rel="stylesheet"
  href="/css/styles.css"
  media="print"
  onload="this.media='all'"
/>
```

## Benefits of Inlining Critical CSS

The beauty of this process is that my users (like you!) only download the styles necessary to render the section of the page they will see upon initial load. And (_theoretically_) by the time they scroll, the rest of the CSS will have loaded, and the styles will be in place.

For me, this was a _critical_ improvement on the road from turning a page speed score of 60 all the way up to 100.

If you’re building static sites with Netlify, it’s worth looking into this plugin. (It may still be useful if using more modern tooling.)

## More on Inlining Critical CSS

If you want to read more about inlining critical CSS, I wrote a brief intro guide.
