---
title: Deploying a Static API to Netlify
description: A super simple example of building a static API that walks through
  the deploy process using Netlify. Part of a series of tutorials on building
  and deploying static APIs.
tags:
  - api
  - jamstack
  - netlify
image: /blog/default/default-lime-03.png
---

This is a quick look at how to build, deploy, and query a [static API](/blog/lets-talk-about-static-apis/). We're going to assume that you are manually writing each JSON file for your output. In other words, there is no [static site generator](https://www.staticgen.com/) or build process involved in creating the files that will be deployed. (I know, I know, how _archaic_.)

When we have those files, we'll upload them to a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) using [Netlify](https://netlify.com/).

The examples here come from commentary in my article on [how to build static APIs](/blog/how-to-build-static-api/). It's worth a skim if you want a bit of background, but all the relevant code is included in this tutorial. And if you would like further explanation on what static APIs are, you can reference [the introductory article](/blog/lets-talk-about-static-apis/).

_Before we begin, note that I am not going to cover the basics of [Git](https://git-scm.com/) in this tutorial. But a basic knowledge of Git is required for working with Netlify._

## Step 1: Project Setup

Begin by creating a space for your project and navigating to it:

    $ mkdir my-project
    $ cd my-project

Netlify requires your code be uploaded to a Git provider (e.g. [GitHub](http://github.com/)), so let's take this opportunity to initialize a repository:

    $ git init

And now we're good to go. We don't need a `package.json` or any similar sort of file because we don't have any dependencies — we're writing our API output directly.

## Step 2: Add API Files

Now it's time to add those files. We'll continue [the example from the introduction](/blog/how-to-build-static-api/), which means there are four files to create following this structure:

```
public/
├── earworms.json
└── earworms/
    ├── 1.json
    ├── 2.json
    └── 3.json
```

The important note here is that we're nesting our JSON files in a `public` directory. We're doing that partially because of my insecurities — I've always been uncomfortable deploying the root directory of a project — and partially because I find it a little easier to stay organized and work with Netlify using this approach.

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

## Step 3: Setup Netlify Project

If you aren't familiar with Netlify already and don't have an account, the first step is to [sign up](https://app.netlify.com/signup). (As you may guess, I use GitHub as the auth provider.)

Next, in the appropriate workspace (probably your personal one), click _New site from Git_.

{% post_image
    src="/blog/200410/netlify-new-site-from-git.png",
    alt="" %}

Choose your Git provider in the Continuous Deployment section and then find your repo.

{% post_image
    src="/blog/200410/netlify-git-provider.png",
    alt="" %}

When filling out the options, leave the build command blank, but set the publish directory to `public`, because that's where we stuffed the files we want deployed.

That's it! By the time you've looked around your project, Netlify has likely already deployed it.

But, before we take a look, note that Netlify automatically names your project something silly by default. You can change it by going to _Settings_ > _General_ > _Change site name_.

{% post_image
    src="/blog/200410/netlify-change-site-name.png",
    alt="" %}

When you're ready to take a look at your deployed API, click the URL under the title on the _Overview_ screen.

{% post_image
    src="/blog/200410/netlify-site-url.png",
    alt="" %}

If everything went according to plan, you should see a _Page not found_ error.

That's good! I know, it's weird, but it's good.

You're seeing that error because we didn't add a home page (`public/index.html`) so there's nothing to see. (We'll come back to this later.)

Instead, visit `/earworms.json` on your site (e.g. [https://json-static-api.netlify.com/earworms.json](https://json-static-api.netlify.com/earworms.json)) and you should see a match to the JSON file you added to your project. You can also try `/earworms/1.json` to look at an individual file.

Really, that's it to get started! You have a static API that is out there on the web and ready to be consumed.

Give yourself a pat on the back!

There are two more steps for you if you want to keep going:

- Consume your API's data
- Redirect the home page to `/earworms.json`

## Step 4: Consume Your API

There are countless ways in which we could consume the API. But when just testing to try to get a result, I tend to use a client like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

Using Postman, I created a new request, put in the URL to the `/earworms.json` path, and then sent it.

{% post_image
    src="/blog/200410/netlify-api-request.png",
    alt="" %}

_That did the trick — hooray!_

## Step 5: Redirect Home Page

The last step is purely optional. I don't have any problem with the home page throwing a 404 error because there is no page there. But in this case our API is so simple that we might as well redirect the home page to the `/earworms.json` page.

Typically I'd add a `_redirects` file to the `public` directory, because I find that easier to work with. But I was using this repo for [my Vercel tutorial](/blog/deploy-static-api-vercel/) as well, and so I didn't want to clutter the output.

Therefore, I'm going to put the redirect in a `netlify.toml` file, which produces the same result, just not as cleanly.

`netlify.toml` {.filename}

```toml
[build]
  publish = "public"

[[redirects]]
  from = "/"
  to = "/earworms.json"
  status = 302
```

Commit and push that change to your Git provider. That will kick off a new build and deploy with Netlify.

Once that change is deployed, go back to your home page and you should be redirected to the `/earworms.json` page.

---

This was a super simple example on how to deploy a static JSON API with Netlify. You can head back to [the intro](/blog/how-to-build-static-api#tutorials) to check out specific tutorials on building static APIs from data files using various static site generators.
