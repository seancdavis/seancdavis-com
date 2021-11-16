---
title: Generate Dynamic JSON Pages with Next.js
date: 2021-06-10
description: Two methods for generating JSON pages with Next.js. One that updates on every request, the other on every build.
image: /blog/210610/210610-next-json.png
tags:
  - nextjs
canonical_url: https://www.grouparoo.com/blog/dynamic-json-pages-with-nextjs
---

[Next.js](https://nextjs.org/) is a super powerful tool for building scalable websites and web applications. Building dynamic web pages is no big thing with Next.

I had a scenario pop up in which I wanted to generate and deliver JSON pages. I wanted to retrieve the data from elsewhere and then output it to a file that didn't have to change between builds.

## Limitations of Pages in Next.js

Part of the reason Next is equal parts powerful and easy to use is a result of the opinions it brings along. One such opinion is the way in which pages are delivered.

While there are options to [fetch data prior to rendering a page](https://nextjs.org/docs/basic-features/data-fetching), pages are rendered as React components. And they are wrapped in application-level components.

That means there isn't an easy way for me to follow the Next.js pages pattern to generate statically dynamic JSON pages.

Fortunately, I found two ways in which I could still accomplish what I wanted in two other ways.

## The Setup

Before we walk through these two examples, I'm assuming you have a Next.js project ready to go. If you don't you can use `create-next-app` to start with the default template.

    $ npx create-next-app

We're going to install a single dependency for this example, [axios](https://www.npmjs.com/package/axios):

    $ npm install axios

Once it seems you're ready to go, boot that development server. With the default template, that command is:

    $ npm run dev

And the server runs at localhost:3000 in your browser.

If you had an existing Next project, you may have a different command to start the dev server and a different port on which the front end runs.

## Method #1: API Routes

Now that you're up and running, let's look at our first option for generating JSON pages: API routes.

Okay, I lied. A little. Pages in next don't _have to be_ React components. Next also supports what they call [API routes](https://nextjs.org/docs/api-routes/introduction). These are methods that run on the server side and return data back to the user. That feels like a really good use case for our scenario.

Let's pretend that we want to return a single random dad joke.

### Starting Simple

As a quick introduction to API routes, let's first create a page at `pages/api/joke.js` with the following content:

```js
// pages/api/joke.js

export default (req, res) => {
  res.status(200).json({ hello: "World" })
}
```

Now visit http://localhost:3000/api/joke in your browser, or make a GET request to that same URL through an API client. You'll see on screen (or in your client) the object we sent:

```json
{ "hello": "world" }
```

Great!

### Making it Dynamic

Now let's make it dynamic by adding axios and querying [the icanhazdadjoke.com API](https://icanhazdadjoke.com/api):

```js
// pages/api/joke.js

import axios from "axios"

export default async (req, res) => {
  const { data } = await axios.get("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" }
  })

  res.status(200).json(data)
}
```

There's not much to that, really. We're asking the icanhazdadjoke.com API for a response and passing that response on to the user.

Now refresh your browser or make a request through your API client again and you'll be sent something classically witty like this:

```json
{
  "id": "xXg3LZLZDd",
  "joke": "*Reversing the car* \"Ah, this takes me back\"",
  "status": 200
}
```

_Note that if you were going to take this into production, you'd want to put some checks in place to guard against the icanhazdadjoke.com API being down or giving you something you didn't expect._

## Method #2: Static File

The first method is powerful and all, but it's also forcing you into a solution in which you have to run that method (i.e. do some work, like hit another API) every time you want the data in this file.

Recall in the intro that I mentioned a nuance of not needing the file to change in between builds. Thus, the JSON file itself should be _generated dynamically_, but could be _delivered statically_. (This has all the makings of a [static API](https://www.seancdavis.com/blog/lets-talk-about-static-apis/).)

While we know we can't make pages as static JSON files, we could _generate_ a static JSON file prior to building the site and serve it [as a static asset](https://nextjs.org/docs/basic-features/static-file-serving).

### Generate Script

To do that, let's put together a little script at `scripts/getJoke.js` which retrieves the dad joke and then writes it to a file at `public/joke.json`.

_Note: We're putting it in the `public` directory because these files get copied over directly. A file at `public/joke.json` would be available at `/joke.json` on our website._

```js
// scripts/getJoke.js

const path = require("path")
const fs = require("fs")
const axios = require("axios")

const filePath = path.join(__dirname, "../public/joke.json")

const main = async () => {
  const { data } = await axios.get("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" }
  })

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

main().then(() => console.log("Done."))
```

Notice this is very similar to our API function. But instead of returning the response, we write it to file.

To see it in action, you can run the script like this from the root of your project:

    $ node ./scripts/getJoke

Check your `public` directory for a `joke.json` file.

```json
{
  "id": "xXg3LZLZDd",
  "joke": "*Reversing the car* \"Ah, this takes me back\"",
  "status": 200
}
```

You can verify that it will be available on your website by visiting localhost:3000/joke.

### Automate It!

To automate this process, we can add [a pre script](https://docs.npmjs.com/cli/v7/using-npm/scripts#pre--post-scripts) to hook into the appropriate script in our `package.json` file.

For example, let's say we want this to run _before_ we run the `npm run dev` script. To do that, add a `predev` script to your `package.json` file:

```json
// package.json

{
  // ...
  "scripts": {
    "predev": "node ./scripts/getJoke",
    "dev": "next dev"
    // ...
  }
}
```

Now, whenever you run `npm run dev`, your `getJoke` script will run, producing a new static file.

Try it out. Stop your server (if it's still running) and start it back up. Then visit localhost:3000/joke to see new content!

---

There are two methods for taking dynamic data and rendering it as JSON in your Next.js application. One updates itself on every request, the other on every build. Choose the best path for you and keep building cool things!
