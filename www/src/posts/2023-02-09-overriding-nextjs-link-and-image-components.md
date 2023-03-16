---
title: Overriding Next.js Link and Image Components
description: >-
  Next.js ships with these two incredibly useful utility components. You can
  further abstract these to clean up your code.
tags:
  - javascript
  - nextjs
  - react
image: /posts/230209/overriding-nextjs-link-and-image-components-K_Y7ggnu.png
seo:
  image: /posts/230209/overriding-nextjs-link-and-image-components-md-IvW-D--meta.png
---

{% youtube_embed id="_JreGd6z1TE" %}

Next.js ships with two invaluable utility components — [next/image](https://nextjs.org/docs/api-reference/next/image) and [next/link](https://nextjs.org/docs/api-reference/next/link). The image component provides a way to help images load faster and at the right time, and the link component helps leverage the internal routing system to load the next page faster.

## How to Override a Next.js Utility Component

Let's use the next/link component as an example. Typically, you would import the component from the next package, and use it directly.

```js
import Link from "next/link";

function MyPage() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
    </ul>
  );
}

export default MyPage;
```

When we want to add some override, we'd create our own component in our project. I usually keep the name the same, which makes refactoring easier.

`components/Link.jsx` {.filename}

```js
import NextLink from "next/link";

export const Link = function (props) {
  // Do custom stuff ...
  return <NextLink {...props} />;
};
```

And then change your import to point to your local component.

```js
import { Link } from "components/link";

function MyPage() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
    </ul>
  );
}

export default MyPage;
```

### Lookout For Import Structure

Notice that in this example I've changed the import structure. The next/link and next/image components import the default export. The internal component I've shown provides a named export, which requires that you use curly braces when importing the component.

I've found this to be helpful in keeping code more consistent throughout a project, especially as the project grows in size.

### Use a Helpful Alias

Notice there was a name clash in our component. We wanted the name to be the same. But we can't import the next/link component as `Link` and also define and export our component as `Link`.

To get around this, I've imported the next/link default export as `NextLink`. The behavior will be the same. I've found this to be a declarative and helpful way to know when I'm working with the Next.js component when inside my abstracted component.

### Let All Props Pass Through

I recommend letting all props you're not altering pass through to the Next.js component. If you're building on or manipulating a prop in some way, that's fine. But, unless there's some reason to restrict a certain prop, it's helpful to let everything pass through. Otherwise, you'll find yourself constantly coming back to your utility component just to add support for a new prop.

The spread operator comes in handy here.

```js
export const Link = function (props) {
  // Do custom stuff ...
  return <NextLink {...props} />;
};
```

## When to Override a Next.js Component

There are two primary scenarios in which I've found myself overriding these components: adding consistent styling and modifying core behavior.

### New and Consistent Styling

While the link component is a utility, you may find that you want all links to look the same. You've been adding the same class(es) to every next/link instance you use.

This is a great case for writing those classes once — in your own utility component — and having all uses of the link component inherit this styling.

```js
import NextLink from "next/link";

export const Link = function (props) {
  return <NextLink {...props} className="underline" />;
};
```

Keep in mind that if you do this, you may also want to consider merging `className` with `props.className` to account for customization on top of the classes you're passing to the Next.js component.

```js
import NextLink from "next/link";

export const Link = function (props) {
  return <NextLink {...props} className={`underline ${props.className}`} />;
};
```

### Modifying Core Behavior

The Next.js utility components are focused on providing the minimal amount of support and opinion needed to be helpful. Your application may prefer something more opinionated.

For example, you may want to introspect the `href` property and open external links in a new tab.

```js
import NextLink from "next/link";

export const Link = ({ children, ...props }) => {
  if (props.href.toString().startsWith("/")) {
    return <NextLink {...props}>{children}</NextLink>;
  } else {
    return <ExternalLink child={children} href={props.href.toString()} />;
  }
};
```

See [this playground](https://stackblitz.com/edit/nextjs-ehvtnq?file=pages/index.js) for a more complete working example that includes the `ExternalLink` component.

## The _DRY Sense_ Can Help

It's not always obvious when the time has come to add an abstraction layer. The method I use most is what I'll call _The Dry Sense_.

When you're writing code, be on the lookout for cases where you've clearly repeated yourself. If you're adding the same classes to the link component in multiple places, it's time to start thinking about cleaning up the code.

## Not Necessary On Every Project

These approaches may seem basic enough that you'll want to override these components on every project. I've found that most projects _eventually_ get to this point. But that doesn't mean it's an essential part of any application.

Always be mindful when adding a layer of abstraction. When it's not helpful, it takes more time to maintain than it saves in writing less code.
