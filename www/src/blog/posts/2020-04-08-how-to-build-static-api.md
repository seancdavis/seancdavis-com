---
title: How to Build a Static API
description: An introduction on how to approach building a static API, which serves as the background for several specific tutorials on the topic.
tags:
  - api
  - jamstack
  - netlify
---

Most [APIs](https://en.wikipedia.org/wiki/Application_programming_interface) out in the wild are _dynamic_ APIs. (We just call them _APIs_.) When a user asks for data from a dynamic API, it communicates with a database in real-time, providing the relevant information back to the requester. Many times APIs have some sort of authentication system, as they want to track or limit who is using the system and how much they are using.

While authentication and real-time data offer a lot of power and flexibility, they may be more complex than necessary. In some cases a [_static_ API](/blog/lets-talk-about-static-apis/) may be a better choice.

A static API uses the [Jamstack's](/blog/wtf-is-jamstack/) methodology to take dynamic data and present it statically to the user. In the right scenario, this can offer benefits like cost, scale, performance, and security. ([Learn more about static APIs here](/blog/lets-talk-about-static-apis/).)

This article is going to talk about how we would approach building a static API. It closes with a list of specific tutorials on how to implement that approach. While you'll likely require this article for some background on those tutorials, you're welcome to [jump right to them](#tutorials).

## Building a Static API

A static API is just a set of JSON files that get delivered to the requesting client. So one way to build a static API is to simply write JSON files manually, organize them appropriately into directories, deploy them to a CDN or other file-focused hosting provider, and _Voila!_, you have an API! (There are a couple tutorials on this approach below.)

But ... _no one wants to do that_. That sounds like miserable work.

Static APIs are more powerful when they can pull data from one or more sources _dynamically_ and _automatically_, and then _generate_ JSON files _from that data_. This is most easily done with a [static site generator](https://www.staticgen.com/). Within a static site generator, you can pull data from external APIs (or internal files), transform the data as necessary, and then use it to build JSON pages.

At its core, that's how you'd build a static API _dynamically_. Next, let's talk about its _structure_, before moving into the _automatic_ part.

## Static API Structure

Static APIs should be structured in a similar fashion as their dynamic counterparts.

Let's say I wanted to build an API that tracked my [earworms](https://en.wikipedia.org/wiki/Earworm) — not actual worms, but songs stuck in my head when I wake up in the morning. I would probably have a listing of earworms as an option, say at `/earworms.json`, and I might also have a way to get information on just a single earworm using some unique key, like an `id`. Those pages might be available following the pattern `/earworms/[ID].json`, where `[ID]` represented the `id` value of the earworm.

The `/earworms.json` file would look something like this:

`/earworms.json` {.filename}

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

Notice that I don't just return an array of results, but an object with a nested `results` array. That is so we can add any top-level (meta) info we may want in the future without having to change the structure of the response. (Changing the structure of the response often means adjusting every client consuming the API and/or creating multiple versions of that API).

In this example, I'm showing one possible meta property as the number of results returned. That doesn't add much value in the real world, but is there simply to demonstrate the results/meta structure.

Each individual earworm page might look like this:

`/earworms/2.json` {.filename}

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

Here I use `result` to deliver the earworm data, only to be (somewhat) consistent with the structure of my index page (`earworms.json`).

Since you know you're only going to have one object, you could also return the object directly, and nest a `meta` object within it. If doing that, it's a good idea to use an obscure prefix (e.g. `_`) to make it obvious that it's not a direct property of the object, but info from the API. For example:

```json
{
  "_meta": {},
  "id": "2",
  "date": "2020-03-30",
  "title": "Into the Unknown",
  "artist": "Idina Menzel",
  "spotify_url": "https://open.spotify.com/track/3Z0oQ8r78OUaHvGPiDBR3W?si=__mISyOgTCy0nzyoumBiUg"
}
```

{% callout type="note" %}
For the tutorials listed at the end of the article, we're going to stick with the former approach, for consistency.
{% endcallout %}

Now let's look at the _automatic_ portion of the API – deploying and hosting it.

## Deploying and Hosting a Static API

Static site generators are powerful because they come packaged with build tooling. That's the crux of what enables them to take dynamic data and present it statically. It's also what enables you to develop quickly, as most have some sort of dev server that watches for changes and rebuilds.

Ultimately, the way in which we want to host these static JSON files is on a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), or a content delivery network. The benefit of a CDN is speed through caching mechanisms and global distribution. Because all we're really doing is letting the user download a _file_, so all we need is a speedy file server, not some complex web server.

But you'll also need to build the project first, so you have that set of JSON files to upload. Again, you _could_ do this all manually — build locally and upload to CDN. But then you have all sorts of other challenges to overcome, like setting up DNS for your CDN, or invalidating caches when you want to make an update.

The alternative is to look at a tool like [Netlify](/blog/wtf-is-netlify/) or [Vercel](https://vercel.com/). These tools will run a build process and upload to a CDN that is already configured on your behalf. And they can do that automatically using [webhooks](https://en.wikipedia.org/wiki/Webhook)! (Netlify calls them [_build hooks_](https://docs.netlify.com/configure-builds/build-hooks/) and Vercel calls them [_deploy hooks_](https://vercel.com/docs/concepts/git/deploy-hooks).)

Each of these tools are low-cost options for building, deploying, and hosting your static API automatically.

### CORS ... GOTCHA!

You may run into an issue when first _consuming_ the API (i.e. accessing the API's data). If you're looking to do so from another domain, you may be blocked by a [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)-related error.

What I usually do to overcome that is to set the `Access-Control-Allow-Origin` header to allow the domains I want to be able to access the API. For example:

```
Access-Control-Allow-Origin: https://www.mysite.com
```

## Tutorials {id="tutorials"}

Now that we have a handle on the process for building and delivering a static API, here are some specific examples you can jump to next:

- [Deploying a Static API to Netlify](/blog/deploy-static-api-netlify/)
- [Deploying a Static API to Vercel](/blog/deploy-static-api-vercel/)
- [Building a Static API with Node.js](/blog/building-static-api-nodejs/)
- [Building a Static API with Eleventy](/blog/building-static-api-eleventy/)
