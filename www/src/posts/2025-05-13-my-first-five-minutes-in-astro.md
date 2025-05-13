---
title: My first five minutes in Astro
description: >-
  How I set up new Astro projects using the delightful Astro CLI experience,
  while applying my tastes and preferences.
tags:
  - astro
image: /posts/250513/my-first-five-minutes-in-astro-uTJegkXh.png
seo:
  image: /posts/250513/my-first-five-minutes-in-astro-st9wlMX_--meta.png
---

This is how I spend my first five minutes with a new [Astro](https://astro.build/) project.

Quick aside: In the years before I used Astro and frequently spun up new sites, I often relied on a template that I built and maintained. Because Astro has such a delightful and optimized CLI experience, it's actually now more productive to rely on this setup workflow than it is to maintain a template.

## Create a new Astro project

The first thing I do is to use that delightful Astro CLI to create a new project.

```shell
npm create astro@latest
```

This walks me through a few steps in which I choose the following:

- Name for the project (e.g. `first-five-minutes`)
- Minimal template
- Skip dependencies (more on this below)
- Initialize a git repository

### Open the project in a text editor

And that's it! I have what I need to change into the project directory and open up the project in my text editor. (These days, I'm reaching for [Cursor](https://www.cursor.com/en), which is a fork of [VS Code](https://code.visualstudio.com/).)

```shell
cd <project-name>
cursor .
```

## Install dependencies

At this point, I have a repository with just a few files and an initial commit from Astro.

I want to install the dependencies using my preferred package manager. But first, I specify the version of Node so that any developer or machine in any environment works consistently.

### Add .nvmrc file

I like using [Node Version Manager](https://github.com/nvm-sh/nvm) to specify the version of Node to use in the project. Add a `.nvmrc` file at the root of the project with the version you want to use.

`.nvmrc` {.filename}

```txt
v20
```

If you want to follow this approach and don't have nvm installed, [follow these directions](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).

### Install dependencies

Now I can make sure I'm using the specified version of Node.

```shell
nvm use
```

Because I've set the version of Node that the project will use, I can install dependencies using that version and my preferred package manager — npm, yarn, pnpm, etc. (When not working with a team with established preferences, I generally choose Yarn.)

```shell
yarn
```

This will install the dependencies in `node_modules` and add a `yarn.lock` file to the root of the project.

## Astro integrations

Astro has a great and simple command to add any integrations you know you will want in one command.

My go-to integrations are Tailwind (for styling) and Netlify (for building, deploying, and running the application in production).

```shell
npx astro add tailwind netlify
```

I walk through the steps, replying `y` at each juncture because there is no risk in overwriting my work (because I haven't written any code yet), and then commit the results.

This process adds plugins and their dependencies, installs them, and adds the necessary new files, along with configuration updates.

## Rendering preferences

Now I can put some shape to the way I want to work with pages in Astro.

### Add a default layout

To reduce boilerplate code and give some consistent styles to pages, I'll add a default layout file to a new directory (inside `src`) at `src/layouts/Layout.astro`.

`src/layouts/Layout.astro` {.filename}

```html
---
import './src/styles/global.css';

const { title } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content="{Astro.generator}" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

This is essentially a clone of the `src/pages/index.astro` file, with three changes:

- Import the `src/styles/global.css` file created when installing Tailwind, which ensures that the styles (including Tailwind styles) are included on any page using this layout.
- A `title` prop, which will set the meta `<title>` value for the individual page when using this layout.
- The page content is replaced with `<slot />`, which Astro uses to inject page content inside components.

### TypeScript import path aliases

Astro has built-in support for TypeScript, which makes it trivial to improve the consistency of your imports without worrying where each file is located, relative to the root of the project.

`tsconfig.json` {.filename}

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  // add import path aliases
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

In this case, I'm defining only one import path alias, but you can build a whole series of them to your preferences.

### Update home page

I may need to reload the window, but now I'm ready to simplify my home page code, relying on the import path alias and the default layout.

```html
---
import Layout from '@/layouts/Layout.astro';
---

<Layout title="Home">
  <h1>Welcome to my website</h1>
  <p>This is a simple website I set up with my preferences in five minutes.</p>
</Layout>
```

### Default rendering method (optional)

At this point, I may adjust the default rendering configuration. Astro prerenders pages by default. If I'm building a content site, I'll keep it there.

But I may use server-side rendering by default if I'm building a dynamic application. That requires a slight change to the Astro configuration file.

`astro.config.mjs` {.filename}

```ts
// import statements ...

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: netlify(),
  // specify SSR as the default rendering method
  output: "server",
});
```

### Using Netlify Dev (optional)

Another decision I make _sometimes_ is to bring the Netlify CLI into the development server workflows.

Astro is full-featured enough that most of the production-level primitives on Netlify are created during the Astro build process, so I can lean on the Astro development server and rely on the Netlify adapter to bring the features I work with to the production application.

The most frequent exception to this is when I use [Netlify Blobs](https://docs.netlify.com/blobs/overview/), which is an excellent solution for one-off data or file storage needs. When using Blobs, it's easier to work with them after linking up a Netlify site and using Netlify Dev as the development server.

In these cases, I usually add a separate dev command so that it's easy to escape using the Astro dev server without accessing the command directly.

`package.json` {.filename}

```json
{
  "name": "first-five-minutes",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "dev:ntl": "ntl dev"
    // ...
  },
  "dependencies": {
    // ...
  }
}
```

## Format code consistently

Now that I'm ready to start writing code, the last thing I do is format code consistently before I get too far.

I prefer to use [Prettier](https://prettier.io/) as my code formatter. It has a CLI that I can use locally and [ties nicely into](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VS Code and Cursor (and other forks).

When working with a team, I configure Prettier to the team's preferences. (Typically, I try to build out a centralized configuration that any project can inherit so that I don't have to make changes to every project.)

One of the great freedoms of working on solo projects is the ability to bring my opinions. For my Astro projects, this is my typical configuration:

`.prettierrc` {.filename}

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all"
}
```

Once I've created that file, I can update all the files in the repo that Prettier knows about.

```bash
prettier -w "**/**" --ignore-unknown
```

This doesn't cover `.astro` files, though. For those, I have to open them in my editor and resave. My text editor is configured to use Prettier to format automatically when saving the file. And on Astro files, it uses the Astro extension for formatting.

(If you don't have Prettier installed globally, you can use `npx prettier` instead of using `prettier` directly.)

## Wrapping up

And that's it! I can run the Astro development server and see my site!

{% post_image alt="", src="/uploads/250513/CleanShot_2025-05-07_at_06.13.562x.png" %}

The next few steps are what I tend to do next, but where they fit into the flow can vary greatly depending on the application.

### Deploy the application

I usually try to deploy early in the project. Netlify makes this super simple. All I have to do is create a new GitHub project, commit the changes I've made, push to the new repo, and then wire that repo up to Netlify.

### Add some styles

I also usually add a few classes to the home page to ensure Tailwind is wired up correctly.

`src/pages/index.astro` {.filename}

```html
---
import Layout from '@/layouts/Layout.astro';
---

<Layout title="Home">
  <div class="mt-12 px-12 text-center space-y-4 rounded-lg">
    <h1 class="text-4xl uppercase font-bold text-neutral-800">
      Welcome to my website
    </h1>
    <p class="text-neutral-600">
      This is a simple website I set up with my preferences in five minutes.
    </p>
  </div>
</Layout>
```

If the browser shows the updated styles, I'm good to go!

{% post_image alt="", src="/uploads/250513/CleanShot_2025-05-07_at_06.17.142x.png" %}

And that's it! What are your first few steps on new Astro projects? What do you think I'm missing here? [Hit me up on Bluesky](https://bsky.app/profile/seancdavis.com) with your thoughts!
