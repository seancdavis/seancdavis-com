---
title: "3 Ways to Render Server-Side Components with Eleventy"
description: "While Eleventy doesn't appear to be built for today's component-driven landscape, here are three approaches we can take to get closer."
tags:
  - components
  - eleventy
  - javascript
image: /posts/210110/meta--eleventy-server-components.jpg
---

{% youtube_embed
    id="YDNouZ8ozv0",
    title="Server-Side Components with Eleventy" %}

I love [Eleventy](https://www.11ty.dev/) as a static site generator! It makes no assumptions about what you what to do with it. Instead, it focuses on being a speedy build platform that outputs static files.

The downside to this approach is it's not super conducive to this component-driven world we live in. If we want to use a [JavaScript](/posts/wtf-is-javascript) framework like [React](https://reactjs.org/) or [Vue](https://vuejs.org/), we then lose Eleventy's primary benefit — HTML that is immediately available when the browser loads the page. It also makes SEO inherently more difficult to solve.

What would be great is if we could have the best of both worlds — a component-driven system that renders the output of the components to static HTML during the build process.

It turns out that we can totally do this! Here is a look at three different methods for building out a server-side component system in an Eleventy project:

## Method #1: Template Includes

The first method works right out of the box with Eleventy, but it's a more manual process. Eleventy supports [multiple templating languages](https://www.11ty.dev/docs/languages/) without any configuration, many of which come with their version of _includes_, such as [Nunjucks](https://www.11ty.dev/docs/languages/nunjucks/) or [Liquid](https://www.11ty.dev/docs/languages/liquid/).

Let's say we're using Nunjucks and we want to build a button component. We could add our button to `_includes/button.njk`:

`_includes/button.njk` {.filename}

```html
<a href="/">Hello World</a>
```

_Note that the code for these examples would look slightly different if you are using a templating language other than Nunjucks._

In your template file, say `index.njk`, you can include the button:

`index.njk` {.filename}

{% raw %}

```liquid
{% include "button.njk" %}
```

{% endraw %}

This is great, but it's not really repeatable, is it? Ideally we'd want the `href` attribute, along with the button copy to be configurable when rendering the button.

We can still do that with this method, although it's a little messier. One way is to set each variable before rendering the component. Here's what the component might look like if we were using two variables for these configurable values, `label` and `url`:

`_includes/button.njk` {.filename}

{% raw %}

```pug
<a href="{{ url }}">{{ label }}</a>
```

{% endraw %}

Then, in the template, we can set those variables before rendering the component:

`index.njk` {.filename}

{% raw %}

```liquid
{% set url = "/" %}
{% set label = "Hello World" %}
{% include "button.njk" %}
```

{% endraw %}

This works, but it's tedious. Choosing generic variable names that may be reused for other purposes can make the code more difficult to debug.

Another approach could be to wrap all the component's properties up in a single object. Maybe it's a reusable object so we're consistent across the board. That's _slightly_ easier to debug.

Say we call our object `component`. Our updated code would look like this:

`_includes/button.njk` {.filename}

{% raw %}

```pug
<a href="{{ component.url }}">{{ component.label }}</a>
```

`index.njk` {.filename}

```liquid
{% set component = { url: "/", label: "Hello World" } %}
{% include "button.njk" %}
```

{% endraw %}

Still not great, but not as bad.

## Method #2: Template Shortcodes

Let's say we liked the simplicity of the approach above, but the pattern of setting a `component` variable before rendering the component was growing tiresome. Well, we could wrap up the functionality in a [custom shortcode](https://www.11ty.dev/docs/shortcodes/).

Let's say we want our final template to render in a single line, like so:

`index.njk` {.filename}

{% raw %}

```liquid
{% button label = "The Shortcode Way", url = "/" %}
```

{% endraw %}

That's pretty clean, right? Let's make it work.

First, we'll want to install the templating engine we're using. (Eleventy _technically_ already brings it, but I like to add it to be safe.)

    $ npm install nunjucks

Then, in our [Eleventy config file](https://www.11ty.dev/docs/config/), add the functionality:

`.eleventy.js` {.filename}

```js
const fs = require("fs");
const path = require("path");
const nunjucks = require("nunjucks");

module.exports = function (eleventyConfig) {
  // Add "button" shortcode.
  eleventyConfig.addNunjucksShortcode("button", (props) => {
    // Path to the button component file.
    const filePath = path.join(__dirname, "_includes/button.njk");
    // If the file doesn't exist, render nothing.
    if (!fs.existsSync) {
      return "";
    }
    // If the file does exist, read it.
    const content = fs.readFileSync(filePath).toString();
    // Tell nunjucks to render the file's content, passing the
    // arguments to it as the "component" object.
    return nunjucks.renderString(content, { component: props });
  });
};
```

Note that we're wrapping up all our arguments — in our example that's `label` and `url` — as an object with a single key, `component`. We're then passing that `component` object on to the template. This is what enables `component.url` and `component.label` to work in the component.

### Building for Scale

This solution is a little slicker than the first, but it's not built for scale. My [Eleventy starter kit](https://github.com/seancdavis/twenty-ninety) is built [to handle components](https://github.com/seancdavis/twenty-ninety#components), but [it's a bit more complicated](https://github.com/seancdavis/twenty-ninety/blob/main/utils/shortcodes/component.js). It looks into a specified components directory, extracts the component files, and makes them available as shortcodes automatically. That way I don't have to add to my Eleventy configuration every time I want a new component. I just have to add the component files.

### Gotcha!

There's one big downside I've found with this approach: There is no access to Eleventy's rendering process when rendering components in this way. That makes it difficult to use components inside one another, which is a very common pattern among component-driven sites.

I've gotten around this using data tansformers ([here's an example](https://github.com/seancdavis/seancdavis-com/blob/main/src/_includes/components/post_card/post_card.transformer.js)), but it's a tedious process, and I'm still looking for a better way to do this.

## Method #3: Pre-Rendered JavaScript Components

Remember how I said you can't use JavaScript framework components with Eleventy? Well, _technically_ you can, though support for it is still in its early stages.

[Here's a great article](https://www.netlify.com/blog/2020/09/18/eleventy-and-vue-a-match-made-to-power-netlify.com/) from the creator of Eleventy, Zach Leatherman, in which he talks about using server-side (i.e. pre-rendered) Vue components with Eleventy. This approach does not include the concept of hydration at this point. In other words, there is no client-side JavaScript functionality with the components, but this is a step in the right direction, and I imagine we'll see a lot of progress here in the near future.

There are also other plugins popping up with this approach for other frameworks. [Here's one for React](https://www.npmjs.com/package/eleventy-plugin-react).

This is a new concept — rendering client-side JS components on the server — but I suspect we'll see a lot of this in 2021. In fact, [React has mentioned they are going to be focusing on it](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components).

## Client-Side JavaScript

The biggest downside to all of these methods are that they don't also include support for client-side JavaScript. Some components may need a bit of that.

For example, [my about page](/about) includes a typewriter effect in the header. The typewriter is a component, but it also has client-side code that it needs to function.

The way I've solved this is by having separate files that control the client-side functionality, and a separate build process to bring those files together into a single JavaScript bundle.

## CSS

I take the same approach with CSS. I like having a single CSS file for each component. So I manually scope the selector using [component-driven CSS](/posts/component-driven-css-cdcss/), and piece them together with [postcss-import](https://github.com/postcss/postcss-import), along with [a few other plugins](https://github.com/seancdavis/seancdavis-com/blob/main/postcss.config.js).

---

That's it for this tutorial! Did you find it useful? What approach are you taking to incorporate components into your Eleventy project?

## Resources

- [Method #1 and #2 examples](https://github.com/seancdavis/seancdavis-com/tree/main/examples/eleventy-server-components)
- [Twenty-Ninety](https://github.com/seancdavis/twenty-ninety) (my Eleventy starter kit)
- [The code for this website](https://github.com/seancdavis/seancdavis-com)
