---
title: Building a Static API with Eleventy
description: "Implement a Static API using the simple and fast static site generator, Eleventy."
tags:
  - api
  - eleventy
---

This is one of several tutorials on how to build a static API. For links to the other tutorials, and for some background on this tutorial, see [the introduction article](/how-to-build-static-api).

If you'd like further background on what a static API is and why we're going through this exercise, check out [_Let's Talk about Static APIs_](/lets-talk-about-static-apis).

---

This tutorial is going to walk through how you can build a static API using the emerging static site generator, [Eleventy](https://www.11ty.dev/). Eleventy takes a very simple approach to building out static sites, which makes it a great fit for simple scenarios, like this one.

One of the first tutorials I wrote on the subject was on [building a static API with a plain Node.js script](/building-static-api-nodejs). I like this one because it shows the power of 11ty — that there's not much to it on the surface, but it just works, works well, and works fast.

Okay, let's dig in.

## Step 1: Setup Project

First let's create a place for our project to live. I'm going to call my project `eleventy-static-api`:

    $ mkdir eleventy-static-api
    $ cd eleventy-static-api

Then let's add an empty `package.json` file:

    $ npm init -y

And install Eleventy:

    $ npm install @11ty/eleventy

This is often the point where I'd also add [Git](https://git-scm.com/) to my project.

    $ git init

And then add a `.gitignore` file to ignore the `node_modules` directory:

    $ echo "node_modules" > .gitignore

## Step 2: Add Data Files

To make it easier to work with Eleventy, we're going to add our data a little differently than we do in the other tutorials. In the other tutorials I've opted to go with individual [YAML](https://yaml.org/) files for each earworm. (The earworms example comes from [the intro](/how-to-build-static-api).)

But Eleventy is already setup to consume data files living in a `_data` directory. And it's a little easier to iterate over them if the data is all together. So let's put it in a single `earworms.json` file:

`_data/earworms.json` {.filename}

```json
[
  {
    "id": "1",
    "date": "2020-03-29",
    "title": "Perfect Illusion",
    "artist": "Lady Gaga",
    "spotify_url": "https://open.spotify.com/track/56ZrTFkANjeAMiS14njg4E?si=oaaJCMbiTw2NqYK-L7CSEQ"
  },
  {
    "id": "2",
    "date": "2020-03-30",
    "title": "Into the Unknown",
    "artist": "Idina Menzel",
    "spotify_url": "https://open.spotify.com/track/3Z0oQ8r78OUaHvGPiDBR3W?si=__mISyOgTCy0nzyoumBiUg"
  },
  {
    "id": "3",
    "date": "2020-03-31",
    "title": "Wait for It",
    "artist": "Leslie Odom Jr.",
    "spotify_url": "https://open.spotify.com/track/7EqpEBPOohgk7NnKvBGFWo?si=eceqQWGATkO1HJ7n-gKOEQ"
  }
]
```

## Step 3: Add Index Page (Earworms List)

Let's begin by adding our index page of earworms at `earworms.liquid`:

`earworms.liquid` {.filename}

{% raw %}

```liquid
---
permalink: /earworms.json
---
{{ earworms | json }}
```

{% endraw %}

There are a few important notes here:

- We specified the permalink so that the page gets built to `_site/earworms.json`. Otherwise, it would be `_site/earworms/index.html`.
- `earworms` is already available as a global object because we put the `earworms.json` file in the `_data` directory.
- I chose [Liquid](https://shopify.github.io/liquid/) as my templating language (despite my disdain for it), but [11ty supports many different templating languages](https://www.11ty.dev/docs/). Choose your favorite.

It may seem like what we're doing is counterintuitive. We added a JSON file to the `_data` directory only to add a Liquid file to the root directory and render the contents of the JSON file.

WTF? Why?

Two reasons:

1. We're going to also build out individual routes and can therefore have a single source of truth for our data.
2. If we put `earworms.json` in our root directory, Eleventy is not going to pick it up during the build process, unless we specifically configure it to do so. And we're going with the simpler approach here by avoiding configuration adjustments.

## Step 4: Start the Server

Now let's start the Eleventy dev server:

    $ npx @11ty/eleventy --serve

_(You can learn more about command-line usage [here](https://www.11ty.dev/docs/usage/).)_

Note: I typically like to wrap this command up in the `package.json` file so that I only have to remember a simple command like `npm run dev`. To do that, add to the `scripts` section of `package.json`:

`package.json` {.filename}

```json
{
  "scripts": {
    "dev": "eleventy --serve"
  }
  // ...
}
```

Now I could run `npm run dev` to start the server.

Once the server is running, check it out on your computer by opening a browser window and navigating to [http://localhost:8080/earworms.json](http://localhost:8080/earworms.json).

You should see the JSON you added to the `_data` directory!

## Step 5: Add Individual Files

The nice thing about using a static site generator like Eleventy is that we can use a single template to generate a page for each item in our collection of data.

Let's add our template in the root directory. I'll call it `earworm-pages.liquid`:

`earworm-pages.liquid` {.filename}

{% raw %}

```liquid
---
pagination:
  data: earworms
  size: 1
  alias: earworm
permalink: "earworms/{{ earworm.id }}.json"
---
{{ earworm | json }}
```

{% endraw %}

This uses [Eleventy's Pagination](https://www.11ty.dev/docs/pagination/) feature to build out an individual page for each earworm in the collection. It will nest the files in an `earworms` directory, using the `id` value as the file name.

For example, for the first earworm you should be able to go to [http://localhost:8080/earworms/1.json](http://localhost:8080/earworms/1.json) and see the following:

```json
{
  "id": "1",
  "date": "2020-03-29",
  "title": "Perfect Illusion",
  "artist": "Lady Gaga",
  "spotify_url": "https://open.spotify.com/track/56ZrTFkANjeAMiS14njg4E?si=oaaJCMbiTw2NqYK-L7CSEQ"
}
```

And that's it, really! Now you have a website that is acting as an API — a _static API!_ Check out the next section on where to go from here.

## Next Step

You have a working static API with Eleventy, but it's just sitting on your computer. The logical next step would be to deploy the API so it is accessible on the web.

To do so, check out the guide on [deploying a static site to Netlify](/deploy-static-api-netlify) and the other on [deploying to Vercel](/deploy-static-api-zeit) (which used to be ZEIT).

Following successful deployment, I would look to redirect the home page to `/earworms.json` and to also ensure that all routes without the `.json` extension either render the proper file _or_ redirect to the `.json` extension (e.g. `/earworms` should redirect to `/earworms.json`).

---

You can also reference other tutorials on static APIs from [the intro article](/how-to-build-static-api#tutorials).

And you can reference the code I used to build this tutorial [here](https://github.com/seancdavis/cobwwweb-examples/tree/087a5503c3000c47ff5e7f7f379f6289ab0055ac/eleventy-static-api), which includes an example of building out redirects for GitHub.
