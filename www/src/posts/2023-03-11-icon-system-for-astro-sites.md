---
title: Icon System for Astro Sites
description: >-
  A simple way to add icons to an Astro site and to stay organized in the
  process.
tags:
  - astro
tweet: >-
  I’ve been tinkering with Astro for a side project. So far, so good. And it’s
  been a seamless process to apply my icon system within the Astro framework
  (using Astro components).
image: /posts/230311/icon-system-for-astro-sites-gLV0Uj9x.png
seo:
  image: /posts/230311/icon-system-for-astro-sites-bxrZOQbI--meta.png
---

{% youtube_embed id="xEggcolcQZA" %}

We're going to create a simple system to make it easy for you to add icons to your Astro site. I like this approach because it can grow with the site. It works for a few icons (as we'll see), but scales easily.

## How It Works

Let's explore a bit of background first. Skip down to the next section if you want to dive right into the code.

### Working with SVG

I really like to use SVG icons because they scale to any size and change color without generating needing additional assets.

When generating these icons, I ensure each is a consistent size, has `fill` attributes set to `currentColor`, and have all strokes outlined. [Read more about my icon process](/posts/how-to-add-svg-icons-to-a-react-project/).

### A Generic Icon Component

To make icons easier to manage, I generally like to have them in separate files. On smaller projects, I may start with them all in a single component, but typically break them out on more sizable projects.

In this case, we're going to start with individual icon files because it should cover your case, regardless of scale.

## Icon System Code

Let's get into the code!

### Icon SVG Files

Find a good location to put all your SVG icons. In the example project below, I've put these in `src/components/Icon`. This way they are colocated with the icon component and easy to find in the project.

Here's what I do when adding new icons:

1. Copy the SVG code.
1. Create a file in the `src/components/Icon` directory. **Use** **`.astro`** **as the file extension.**
1. Change `fill` attributes to `currentColor`.
1. Import the component into the main icon component.

Here's an example of an icon called `arrow-left`:

`src/components/Icon/ArrowLeft.astro` {.filename}

```xml
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M15.5921 54.4923L43.0203 85.6988C44.8161 87.7689 44.4898 90.7935 42.5303 92.3857C41.5509 93.1818 40.4076 93.5 39.2651 93.5C37.9587 93.5 36.4899 92.863 35.5097 91.9078L1.22447 52.8997C-0.408162 51.1484 -0.408162 48.4413 1.22447 46.6901L35.5097 7.68191C37.3055 5.61182 40.4076 5.45274 42.3665 7.20404C44.4892 8.9553 44.6523 11.9806 42.8565 13.8909L15.5929 44.9395H95.1021C97.8773 44.9395 100 47.0096 100 49.716C100 52.4225 97.8773 54.4925 95.1021 54.4925L15.5921 54.4923Z"
    fill="currentColor"></path>
</svg>
```

### The Icon Component

Here's the basic structure of the icon component with a few icons.

```js
---
import ArrowLeft from './Icon/ArrowLeft.astro'
import Calendar from './Icon/Calendar.astro'
import Eye from './Icon/Eye.astro'

export interface Props {
  name: 'arrow-left' | 'calendar' | 'eye'
}

const { name } = Astro.props

const iconMap: { [K in Exclude<Props['name'], undefined | null>]: string } = {
  'arrow-left': ArrowLeft,
  calendar: Calendar,
  eye: Eye,
}

const IconComponent = iconMap[name]
---

<IconComponent />
```

### Using an Icon

To render an icon, you would import the component and then use the `name` property to specify the component you want to render.

```md
---
import Icon from '@components/Icon.astro'
---

<Icon name="arrow-left" />
```

### Working With TypeScript

You can certainly omit the TypeScript here. However, as TS support for Astro files develops, you'll find a benefit in being able to see all available icon name values when adding a new icon.

### Handling Global CSS

I often like to make sure that icon sizes are governed by the width of their parent. This doesn't work in all projects, but handles basic use cases.

To do this, I put global CSS in my main layout file.

`src/layouts/Layout.astro` {.filename}

```md
<style is:global>
  svg {
    height: auto;
    width: 100%;
  }
</style>
```

## Demo Code

Here's a super simple demo with a few icons.

{% code_playground url="https://stackblitz.com/edit/astro-icon-components?ctl=1&embed=1&file=src/pages/index.astro" %}
