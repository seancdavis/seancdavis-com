---
title: Deploying a Static API to Vercel
description: A super simple example of building a static API that walks through the deploy process using Vercel Now. It's part of a series of tutorials on building and deploying static APIs.
tags:
  - api
  - jamstack
  - vercel
---

This is a quick look at how to deploy and query a [static API](/blog/lets-talk-about-static-apis/) using [Vercel](https://vercel.com/) as the deploy and hosting service. The examples here come from the commentary in my introduction on [how to build static APIs](/blog/how-to-build-static-api/) and from [a similar tutorial](/blog/deploy-static-api-netlify/) which uses [Netlify](/blog/wtf-is-netlify/) instead of Vercel.

In this tutorial, I am assuming you are manually writing each of the API's JSON files — i.e. there is no [static site generator](https://www.staticgen.com/) or build process involved in creating the files that will be deployed.

## Step 1: Project Setup

Let's start by creating a space for the project to live:

    $ mkdir my-project
    $ cd my-project

Vercel works by connecting to a [Git](https://git-scm.com/) provider, like [GitHub](https://github.com/). Make sure you're tracking your code using Git:

    $ git init

And that's enough to get us started!

## Step 2: Add API Files

Next, let's add our JSON files. These files pull from [the example in the introduction](/blog/how-to-build-static-api/). The structure will look like this:

```
public/
├── earworms.json
└── earworms/
    ├── 1.json
    ├── 2.json
    └── 3.json
```

The important note here is that we're nesting our JSON files in a `public` directory. That's generally a good practice in terms of security and organization.

`public/earworms.json` {.filename}

```json
{
  "results": [
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
  ],
  "meta": {
    "count": 3
  }
}
```

`public/earworms/1.json` {.filename}

```json
{
  "result": {
    "id": "1",
    "date": "2020-03-29",
    "title": "Perfect Illusion",
    "artist": "Lady Gaga",
    "spotify_url": "https://open.spotify.com/track/56ZrTFkANjeAMiS14njg4E?si=oaaJCMbiTw2NqYK-L7CSEQ"
  },
  "meta": {}
}
```

`public/earworms/2.json` {.filename}

```json
{
  "result": {
    "id": "2",
    "date": "2020-03-30",
    "title": "Into the Unknown",
    "artist": "Idina Menzel",
    "spotify_url": "https://open.spotify.com/track/3Z0oQ8r78OUaHvGPiDBR3W?si=__mISyOgTCy0nzyoumBiUg"
  },
  "meta": {}
}
```

`public/earworms/3.json` {.filename}

```json
{
  "result": {
    "id": "3",
    "date": "2020-03-31",
    "title": "Wait for It",
    "artist": "Leslie Odom Jr.",
    "spotify_url": "https://open.spotify.com/track/7EqpEBPOohgk7NnKvBGFWo?si=eceqQWGATkO1HJ7n-gKOEQ"
  },
  "meta": {}
}
```

### Push to Git Provider

Next, you'll want to commit the code you created and push up to a remote repo on your preferred Git provider. (I prefer [GitHub](https://github.com/), but [GitLab](https://about.gitlab.com/) and [Bitbucket](https://bitbucket.org/product) are also solid options.)

## Step 3: Setup Vercel Project

If you aren't familiar with Vercel already and don't have an account, the first step is to [sign up](https://zeit.co/signup). (I use GitHub as the auth provider.)

Once you have an account, you should see an empty dashboard when you sign in. Begin by choosing to import a project:

{% post_image
    src="/blog/200417/zeit-import-project.png",
    alt="zeit-import-project" %}

You already have what you need in your GitHub repo, so choose "From Git Repository" as your import source:

{% post_image
    src="/blog/200417/zeit-git-provider.png",
    alt="zeit-git-provider" %}

If you don't have Vercel installed on your GitHub (or other Git Provider) account, you'll be prompted to do so:

{% post_image
    src="/blog/200417/zeit-github-install-01.png",
    alt="zeit-github-install-01" %}

Choose the organization for which you'd like to install it. (I used my personal one because it was a little easier to configure on GitHub.)

{% post_image
    src="/blog/200417/zeit-github-install-02.png",
    alt="zeit-github-install-02" %}

When you come back to Vercel, you'll be prompted to pick a repo and then give the project a name:

{% post_image
    src="/blog/200417/zeit-project-name.png",
    alt="zeit-project-name" %}

And that's it! Now your project will build and you'll have a static API deployed to Vercel!

Unlike Netlify, when Vercel doesn't have a home page, it shows a listing of directories. Try navigating to the home page of your new API site. You should see a listing for `earworms.json` and an `earworms` directory.

You can click through to navigate those pages and see that you have a fully-functioning API.

Stop to give yourself a pat on the back before we add two more steps to the process!

## Step 4: Consume Your API

Next, we're going to preview one means of consuming that API content, just to make sure everything is working right. You could use a command-line tool or write a script, but I'm going to use the [Postman](https://www.postman.com/) client, which makes it easy to work with APIs.

I created a new request, put in the URL to the `earworms.json` path (for me this was [https://json-static-api.now.sh/earworms.json](https://json-static-api.now.sh/earworms.json)), and then sent it. That did the trick and gave me the following result:

{% post_image
    src="/blog/200417/zeit-api-request.png",
    alt="zeit-api-request" %}

## Step 5: Redirect Index Pages

This last step — redirecting the index pages — is optional. The way Vercel handles the home page is kind of nice for a site like this, where we may want to be able to see what we have via a directory listing.

But let's say you didn't want those directory listings, but wanted to redirect the home page (`/`) to the `/earworms.json` page and the `/earworms` path to the first earworm (`/earworms/1.json`).

Redirects can be configured in a Vercel project within a `now.json` file in the root of your project

now.json {.filename}

```json
{
  "redirects": [
    { "source": "/", "destination": "/earworms.json" },
    { "source": "/earworms", "destination": "/earworms/1.json" }
  ]
}
```

Commit and push that change to GitHub (or your Git provider). Vercel will automatically pick up the change and deploy. Once that's complete, try to access your home page again and you'll be redirected to the `/earworms.json` page.

---

There you go!

This was only a very basic look at static APIs for the purposes of the deploy step. You can head back to [the intro to check out other tutorials on building static APIs](/blog/how-to-build-static-api#tutorials).
