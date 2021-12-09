---
title: A Simple CSS Build Pipeline Using PostCSS
description: "PostCSS is a super powerful tool that can help you craft your own CSS build pipeline. But it can be a lot to take in all at once. Here are a few quick steps to getting started with PostCSS."
image: /blog/210603/pink--postcss-pipeline.png
tags:
  - css
---

## Departing from the Beloved Sass

For years and years and years I used [Sass](https://sass-lang.com/). I began almost immediately after learning [CSS](/blog/wtf-is-css/). It was a phenomenal extension to CSS.

CSS has evolved significantly, even in the recent years. Enough to the point that some of the core offerings of Sass (like variables) are now available in regular old CSS. It started to feel like I wasn't getting as much out of Sass as I had, at least beyond the ability to nest selectors and import files (both of which are super valuable).

## A Brief PostCSS Intro

Then I discovered [PostCSS](https://postcss.org/). PostCSS is a build tool for CSS. it lets you write CSS (sometimes valid, sometimes not) and then allows you to insert plugins that manipulate the CSS before ultimately presenting something that is valid and useful to the browsers you want to support for your project.

## My Favorite Plugins

PostCSS is really all about plugins. All PostCSS provides is the build tooling. The power comes with hooking in plugins to that build process.

The community is absolutely full of plugins. And there are some good resources out there on finding the right plugin (see [_Resources_](#resources).

I don't want to overwhelm you right out of the gate. We'll begin with just a few plugins that I have found vital to my productivity in working with PostCSS. They include:

- [postcss-import](https://github.com/postcss/postcss-import): Uses `@import` to concatenate local files, similar to how Sass works.
- [postcss-nested](https://github.com/postcss/postcss-nested): Unwraps nested rules, so we can combine selectors much like Sass.
- [cssnano](https://cssnano.co/): Compresses the output, to help with performance in production.
- [postcss/cssnext](https://cssnext.github.io/): Use the latest CSS specs, with fallback to older browsers where possible.

## Step 0: The Example

With that, let's get started. We're going to only build a simple PostCSS pipeline. We're not going to worry about [HTML](/blog/wtf-is-html/) or [JavaScript](/blog/wtf-is-javascript/). We won't end up with something that's ready for production. But you'll have a core set of code that you'll be able to take into your project.

Follow along, and feel free to reference [the example code](https://github.com/seancdavis/seancdavis-com/tree/cba7d25/examples/simple-postcss-pipeline) at any point.

## Step 1: Setup

If you have a project ready to go, great! If not, feel free to [follow my steps to get started](/blog/new-javascript-project-setup/), with the following notes:

For Step 3, your `.gitignore` should have _at least_ the following:

`.gitignore` {.filename}

```
node_modules/
dist/
```

For Step 4, these are our dependencies:

- `postcss`
- `postcss-cli`
- `postcss-import`
- `postcss-nested`
- `postcss-cssnext`
- `cssnano`

For Step 5, these are the scripts you should add to `package.json`:

`package.json` {.filename}

```json
{
  // ...
  "scripts": {
    "build": "NODE_ENV=production postcss src/index.css -o dist/styles.css",
    "dev": "postcss src/index.css -o dist/styles.css -w"
  }
}
```

## Step 2: Configure PostCSS

Once everything is setup and installed, you can configure PostCSS. Do this by creating a `postcss.config.js` file in the root of your project. In it we're going to specify the plugins we want to use:

`postcss.config.js` {.filename}

```js
module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nested"),
    require("postcss-cssnext"),
    ...(process.env.NODE_ENV === "production" ? [require("cssnano")] : [])
  ]
}
```

{% callout type="warning" %}
The order of these plugins is super important. You're specifying the order in which they will run. This matters when each one plays a specific role.
{% endcallout %}

Note here that we're simply requiring the plugins we want to use in an exported object. The only one that looks a little weird is the last one — `cssnano`. What that line is saying that if the environment variable `NODE_ENV` is set to `production` then we want to use `cssnano`, which means we want to compress the output. If not, we'll leave it expanded.

Notice that in our `package.json` scripts, we specified `NODE_ENV=production` in the `build` script, but not the `dev` script. That's doing to be the difference. `dev` will watch for changes and write the expanded output. `build` will run once and compress the output.

{% callout type="note" %}
Unlike many other CLI programs, PostCSS [does not allow us to specify the input and output files in the config](https://github.com/postcss/postcss-cli#config).

Instead, we have to use them as arguments when running the `postcss` command. The scripts you added to `package.json` takes care of that. It says our main source file will be `src/index.css` and it will build a combined output file at `dist/styles.css`.
{% endcallout %}

[Here's what my code looks like at this point](https://github.com/seancdavis/seancdavis-com/tree/d2a18f9/examples/simple-postcss-pipeline). Note that I don't have a `package-lock.json` because I manage my dependencies a little differently.

## Step 3: Add Simple Example

Let's just get this thing working. Add your source file at `src/index.css`:

`src/index.css` {.filename}

```css
body: {
  background: blue;
}
```

And then run the build:

    $ npm run build

You should now see a file at `dist/styles.css` with that rule by itself. Notice that the output is compressed because we ran `build` and not `dev`.

`dist/styles.css` {.filename}

```css
body {
  background: #00f;
}
```

[Here is the code at this point](https://github.com/seancdavis/seancdavis-com/tree/00b6fe1/examples/simple-postcss-pipeline).

## Step 4: Put PostCSS to Work

Now let's put our PostCSS plugins to work by adding some CSS that is not valid.

Adjust the main CSS file to look like this:

`src/index.css` {.filename}

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

@import "partials/base";
```

Notice that we're importing two things — first a font from Google, then a file in `partials/base`. Add that partial CSS file next:

`src/partials/base.css` {.filename}

```css
:root {
  --color-red: red;
  --color-blue: blue;

  --font-size: 1rem;
}

h1 {
  font-size: calc(var(--font-size) * 2);

  a {
    color: var(--color-blue);
  }
}
```

Here we are using CSS variables, nesting rules, and using a function (`calc`) that isn't supported everywhere.

Instead of running `build` this time, let's run `dev`:

    $ npm run dev

The command won't close. This is because it's watching for changes. But it likely still rewrote the `dist/styles.css` file.

It should look something like this:

`dist/styles.css` {.filename}

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

h1 {
  font-size: 32px;
  font-size: 2rem;
}

h1 a {
  color: blue;
}
```

Notice that our styles, colors, and variables we calculated for us, and now we have CSS that is super duper widely supported.

Now make another change and see what happens! You don't have to run another command. Your output file gets written automatically.

## Next Steps

That's it! You did it!

This was just a quick tutorial to get you up and running. Where you go from here is totally up to you.

The one thing to make sure you do is have a little fun on your adventure! See you next time.

## Resources

[Here is the full code example.](https://github.com/seancdavis/seancdavis-com/tree/cba7d25/examples/simple-postcss-pipeline)

And here are a couple resources on plugins these authors prefer:

- [10 Awesome PostCSS Plugins to Make You a CSS Wizard - Hongkiat](https://www.hongkiat.com/blog/postcss-plugins/)
- [7 PostCSS Plugins to Ease You into PostCSS - SitePoint](https://www.sitepoint.com/7-postcss-plugins-to-ease-you-into-postcss/)

But if you have a need, there's probably a plugin for it. Do some googling. And if you can't find what you're looking for, you could always [write your own plugin](https://github.com/postcss/postcss/blob/main/docs/writing-a-plugin.md).
