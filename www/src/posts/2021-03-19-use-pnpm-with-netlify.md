---
title: "How to Use PNPM in Netlify Build"
description: "Tell Netlify not to use NPM and instead use PNPM to install your project's dependencies."
image: /posts/210319/yellow--pnpm-netlify.png
tags:
  - jamstack
  - netlify
  - pnpm
---

I've been using [PNPM](/posts/wtf-is-pnpm) to manage my dependencies in this project. PNPM is a great, performance-focused option for [monorepos](/posts/wtf-is-monorepo).

But I ran into a problem after switching to PNPM and trying to deploy this site: Netlify doesn't support PNPM by default. [It supports NPM, Yarn, and Bower](https://docs.netlify.com/configure-builds/manage-dependencies/#javascript-dependencies). And, as of writing this, [they don't plan to support additional package managers](https://github.com/netlify/build-image/pull/449#issuecomment-665674824), at least not PNPM for now.

I ended up following [this community discussion](https://answers.netlify.com/t/using-pnpm-and-pnpm-workspaces/2759), from which I finally figured out how to get it all working. Here's the synthesized process:

## Step 1: Disable NPM

You can disable NPM in two steps. First, remove the lock file for another package manager if it's in place. This is usually either `package-lock.json` or `yarn.lock`. If you've been tracking either of this with Git, you should probably also add them to your `.gitignore` file.

Next, you can tell Netlify to not install your dependencies with NPM, which it will do by default if it finds a `package.json` and no other specific (supported) lock file.

To do this you'll want to add a `NPM_FLAGS` environment variable set to `/dev/null`. You can set this either in your `netlify.toml` file:

`netlify.toml` {.filename}

```toml
[build.environment]
  NPM_FLAGS="--prefix=/dev/null"
```

Or you can set it through the Netlify UI. [Read more about environment variables here](https://docs.netlify.com/configure-builds/environment-variables/).

## Step 2: Use PNPM to Install Dependencies

Now that you have no package manager, you have to tell Netlify what to do. Before installing PNPM, be sure you are tracking your `pnpm-lock.yaml` file. (Make sure it's not listed in your `.gitignore` file.

Next, we'll want to install PNPM. Since NPM is already installed, you can actually use NPM to install PNPM globally. Your best option here is to add a `prebuild` script to your `package.json` file.

`package.json` {.filename}

```json
{
  "scripts": {
    "prebuild": "test \"$CI\" = true && npx pnpm install -r --store=node_modules/.pnpm-store || echo skipping pnpm install",
    "build": "..."
  }
}
```

Netlify should run this automatically before running `build`. This will use a remote version of PNPM to install your packages.

{% callout type="note" %}
This is where I ended up running into trouble. I had other processes that were running prior to the `prebuild` script. That's why I ended up going the plugin route.
{% endcallout %}

But if this works for you, that's great! You can use `npm` to run your build scripts just as you would have otherwise, but now you've used `pnpm` to manage your dependencies. You can be confident that the packages you're using in production are the same as those you use to develop locally.

## Alternate Step #2: Use a Local Plugin

I attempted to turn this code into a shared plugin and I ran into issues with it, so I abandoned the approach. However, I did write [a local plugin](https://github.com/seancdavis/seancdavis-com/tree/12535f8280f72e3f79d28239066f3dcce244de18/.netlify/netlify-plugin-pnpm) that I'm using on this project. Note the following:

- It includes [a `manifest.yml` file](https://github.com/seancdavis/seancdavis-com/blob/12535f8280f72e3f79d28239066f3dcce244de18/.netlify/netlify-plugin-pnpm/manifest.yml) to name the plugin.
- It also includes [an `index.js` file](https://github.com/seancdavis/seancdavis-com/blob/12535f8280f72e3f79d28239066f3dcce244de18/.netlify/netlify-plugin-pnpm/index.js) with the plugin's code.
- I removed the `prebuild` script in `package.json`.
- I [pointed to the local plugin in my `netlify.toml` file](https://github.com/seancdavis/seancdavis-com/blob/12535f8280f72e3f79d28239066f3dcce244de18/netlify.toml#L8-L9).
