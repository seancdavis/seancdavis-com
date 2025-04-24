---
title: Full-stack web development with 11ty
description: >-
  Frameworks like 11ty are only limited by the platforms to which you deploy
  them. Here we build a full-stack application by leveraging Netlify’s
  full-stack platform primitives.
tags:
  - eleventy
  - netlify
image: /posts/250411/full-stack-web-development-with-11ty-9ZjoVO6l.png
seo:
  image: /posts/250411/full-stack-web-development-with-11ty-MmOv7vdK--meta.png
---

I recently wrote about the role of modern web frameworks, which are built to serve the development experience but rely on platform adapters to deliver pages in production.

## Accessing platform-level features

When everything goes smoothly, developers don't see or feel this. That's the point. Developers can develop within a framework that _adapts_ to how the platform handles the runtime experience for users.

Working with a framework like [Astro](https://astro.build/) feels like you have everything you need to develop a complex, dynamic application — like you're doing full-stack web development.

Platforms like Netlify and Cloudflare can access these platform-level features directly without a framework adapter. Therefore, anything you can do with Astro, you can also do with 11ty.

While you can't do "full-stack development" with 11ty, you can when you combine 11ty with Netlify. So let's do it!

## Resources: code and demo

We're going to build a simple waitlist application. Users can submit their email addresses through a form. Emails are stored in a persistent data store. Another page lists the active number of users on the waitlist.

The demo is available at [full-stack-11ty.netlify.app](https://full-stack-11ty.netlify.app/), and the source code is on GitHub at [seancdavis/full-stack-11ty](https://github.com/seancdavis/full-stack-11ty). You can also click the button below to deploy the app to your Netlify account.

{% dtn_button repo="seancdavis/full-stack-11ty" %}

Let's walk through the process of building this thing using only 11ty and Netlify.

## Start a new 11ty project

Create a new directory for your website, then initialize git and any personal preferences. Then, we can start adding files.

### Add the package.json file

We'll return to add a few dependencies that we'll need. For now, you can copy the code below and add it to a `package.json` file in the root of your project.

`package.json` {.filename}

```json
{
  "name": "full-stack-11ty",
  "type": "module",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy"
  }
}
```

Then add the 11ty dependency to your project.

```txt
npm install @11ty/eleventy
```

### Add a layout

Add an HTML layout file so that we can have multiple pages using the same boilerplate code.

`_includes/base.njk` {.filename}

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Join our exclusive waitlist to be the first to know when we launch. Sign up now to secure your spot."
    />
    <title>{{ title }}</title>
    <link
      rel="icon"
      type="image/png"
      href="https://www.11ty.dev/img/favicon.png"
    />
    <link rel="stylesheet" href="/style.css" />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <main>{{ content | safe }}</main>
  </body>
</html>
```

### Add home page

Next, add a home page that uses the base layout and includes the unique HTML code for the home page. This page should be placed in the root of your project.

`index.njk` {.filename}

```html
---
layout: "base.njk"
title: "Join the Waitlist"
---

<h1>JOIN THE WAITLIST</h1>
<p>Add your email and submit the form to join the waitlist.</p>
<form id="waitlistForm" action="/api/waitlist" method="POST">
  <input
    type="email"
    name="email"
    placeholder="Enter your email"
    required="required"
  />
  <button type="submit">Join waitlist</button>
</form>
```

### Add and configure styles

Add all the styles we'll need for this project. Some of these won't be used just yet, but they will keep us moving once we start adding the dynamic bits.

`style.css` {.filename}

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Playfair Display", Georgia, serif;
  background: white;
  color: black;
  min-height: 100vh;
  display: grid;
  place-items: center;
}

.feedback {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #666;
  color: black;
  padding: 1rem 4rem;
  border-radius: 4px;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

main {
  width: 90%;
  max-width: 600px;
  text-align: center;
  display: grid;
  gap: 2rem;
}

h1 {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: clamp(4rem, 12vw, 8rem);
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.02em;
}

p {
  font-size: 1.125rem;
  opacity: 0.8;
}

form {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

input {
  flex: 1;
  padding: 1rem;
  border: 1px solid black;
  font-size: 1rem;
  background: white;
  font-family: inherit;
}

input:focus {
  outline: none;
  border-color: black;
}

button {
  padding: 1rem 2rem;
  background: black;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
  font-family: inherit;
}

button:hover {
  opacity: 0.9;
}
```

Then, let's tell 11ty that we want to copy this over to the build directory (`_site`) when running a build. We'll need to create an 11ty configuration file for this.

`eleventy.config.js` {.filename}

```js
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
}
```

### Run the site

Now you can open a terminal window in this directory and run the development server.

```txt
npm run dev
```

Visit the URL returned to you (probably localhost:8080), and you should see the home page!

{% post_image alt="", src="/uploads/250411/CleanShot_2025-04-08_at_06.29.192x.png" %}

## Making the site dynamic

There are just three things we need to do to round out the dynamic (full-stack) functionality for this application:

- **Create waitlist item:** an endpoint for creating new waitlist items
- **Feedback:** a way to show dynamic status messages on static pages
- **Waitlist size:** a page that shows the current size of the waitlist

### Create the waitlist item serverless function

The waitlist [serverless function](https://docs.netlify.com/functions/overview/) runs on demand on Netlify's servers. In this case, these functions are placed in the `netlify/functions` directory.

Let's add the code all at once and then break it down to see what's happening. First, we need a couple of dependencies.

```txt
npm install @netlify/functions @netlify/blobs
```

Then you can the function file.

`netlify/functions/waitlist.mts` {.filename}

```ts
import { getStore } from "@netlify/blobs";
import { purgeCache, type Config, type Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  function setFeedbackCookie(value: string) {
    context.cookies.set({
      name: "feedback",
      value: encodeURIComponent(value),
      path: "/",
      maxAge: 600,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }

  function redirect(url: string = "/") {
    const baseUrl = new URL(req.url);
    const redirectUrl = new URL(url, baseUrl);
    return Response.redirect(redirectUrl.toString(), 303);
  }

  if (req.method !== "POST") {
    setFeedbackCookie("Method not allowed");
    return redirect();
  }

  try {
    const formData = await req.formData();
    const email = formData.get("email") as string | null;

    if (!email) {
      setFeedbackCookie("Email is required");
      return redirect();
    }

    const store = getStore({ name: "waitlist" });
    await store.setJSON(email, { email, createdAt: new Date().toISOString() });

    await purgeCache({ tags: ["waitlist"] });
    setFeedbackCookie("Successfully joined the waitlist!");
    return redirect();
  } catch (error) {
    setFeedbackCookie("Failed to process request");
    console.error(error);
    return redirect();
  }
};

export const config: Config = {
  path: "/api/waitlist",
};
```

Here's a summary of what's going on in this file, from top to bottom:

- We're using [Netlify Blobs](https://docs.netlify.com/blobs/overview/) as our data store. Blobs are key-value file stores that Netlify organizes on our behalf and don't require additional configuration. Our store here is called `waitlist`; we use the submitted email as the key for each item blob.
- `setFeedbackCookie` is how we will render dynamic status messages on our static home page. Various conditions cause the serverless function to return. We always return a redirect so that we end up back on the home page even if the function errors. The `feedback` cookie is a simple string containing the value we want to show back on the home page. We'll wire that up next.
- The rest of the function consists mainly of performing the proper checks, getting the data from the submitted form, storing the waitlist item, setting the feedback, and returning a redirect.
- You'll notice we also run `purgeCache` when successfully creating an item and before redirecting. This is because we will cache the page with the dynamic count to make it feel like a static page. We purge that cache to tell Netlify to regenerate the page when the count needs to be updated.
- Last, the exported config object tells Netlify that this function can be accessed via the `/api/waitlist` URL path.

### Add the dynamic feedback component

At this point, we'd be able to capture and store email addresses if using Netlify Dev. But, we wouldn't get any feedback on screen. So let's work on the feedback component, and then we can walk through using Netlify Dev.

For the dynamic feedback component, we'll use an [edge function](https://docs.netlify.com/edge-functions/overview/). Add one more dependency.

```txt
npm install @netlify/edge-functions
```

Then, we can add our edge function. These functions are placed in the `netlify/edge-functions` directory.

`netlify/edge-functions/feedback.mts` {.filename}

```ts
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";
import type { Config, Context } from "@netlify/edge-functions";

export default async function handler(req: Request, context: Context) {
  const response = await context.next();
  const feedback = context.cookies.get("feedback");

  if (!feedback) {
    return response;
  }

  // Create an HTML Rewriter instance with a transformer for the feedback element
  const rewriter = new HTMLRewriter().on("feedback", {
    element(element) {
      // Create a div with class="feedback" and set the feedback text as its content
      element.replace(
        `<div class="feedback">${decodeURIComponent(feedback)}</div>`,
        {
          html: true,
        }
      );
    },
  });

  // Clear the feedback cookie
  context.cookies.delete("feedback");

  // Apply the transformation and return the modified response
  return rewriter.transform(response);
}

export const config: Config = {
  path: ["/", "/waitlist"],
};
```

This one is commented so that it's a bit easier to follow. It essentially works like this:

1. Look for a `feedback` cookie set on the server. If it's not there, return.
1. If it is there, delete it, then transform the response by replacing the `<feedback></feedback>` element with the specified HTML.

We run this code on the home page and the `/waitlist` page.

{% callout type="note" %}
In most cases, I would use `/*` for path configuration to have this run on every page, given that it's a global type of feature. But that requires additional checks we don't need to worry about here.
{% endcallout %}

To get this to work, we have to add the feedback element to the page markup. Let's do this in the layout so that it works on every page we specify in the config without needing to add it to every template.

`_includes/base.njk` {.filename}

```html
<!-- ... -->

<main>
  <feedback></feedback>
  {{ content | safe }}
</main>

<!-- ... -->
```

### Run the Netlify development server

We're ready to boot this thing up and see it in action!

To do that, we'll use [Netlify Dev](https://docs.netlify.com/cli/local-development/) via the Netlify CLI. This is a wrapper for your framework built to run in a production-like manner.

First, install the CLI.

```txt
npm install -g netlify-cli
```

Then start the server.

```txt
netlify dev
```

Netlify will know what to do and will start the 11ty dev server, followed by a Netlify web server, most likely at localhost:8888, which should open automatically for you.

Fill in the form and see that you get feedback at the top of your page.

{% post_image alt="", src="/uploads/250411/CleanShot_2025-04-08_at_08.46.21.gif" %}

And if you refresh the page again, the feedback message will be gone. Voila!

### Add the current waitlist page

Next, let's add a super simple page `waitlist.njk` that will render the dynamic count of total registrants.

`waitlist.njk` {.filename}

```html
---
layout: "base.njk"
title: "Current Waitlist"
---

<h1>CURRENT WAITLIST</h1>
<current-waitlist></current-waitlist>
```

On its own, `<current-waitlist></current-waitlist>` doesn't do anything. So, just like we did for the feedback element, we'll create an edge function that runs only on this page and replaces the current waitlist element.

`netlify/edge-functions/current-waitlist.mts` {.filename}

```ts
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";
import type { Config, Context } from "@netlify/edge-functions";
import { getStore } from "@netlify/blobs";

export default async function handler(req: Request, context: Context) {
  const response = await context.next();

  const store = getStore({ name: "waitlist" });
  const waitlistBlobs = await store.list();
  const waitlistEmails = waitlistBlobs.blobs.map((blob) => blob.key);

  response.headers.set("Netlify-Cache-Tag", "waitlist");
  response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  response.headers.set(
    "Netlify-CDN-Cache-Control",
    "public, max-age=300, stale-while-revalidate=31536000, durable"
  );

  // Create an HTML Rewriter instance with a transformer for the feedback element
  const rewriter = new HTMLRewriter().on("current-waitlist", {
    element(element) {
      // Create a div with class="feedback" and set the feedback text as its content
      element.replace(
        `<div class="waitlist-count">There are ${waitlistEmails.length} people on the waitlist</div>`,
        {
          html: true,
        }
      );
    },
  });

  // Apply the transformation and return the modified response
  return rewriter.transform(response);
}

export const config: Config = {
  path: "/waitlist",
};
```

You can probably read through and see what's happening at this point, as this follows patterns similar to those we've already discussed.

In this case, we count the number of blobs in the `waitlist` store rather than extracting a value from a cookie. After we have the count, we set cache headers so that we don't need to fetch it again until the `/api/waitlist` function purges the cache.

Navigate to this page in your browser to see the dynamic content filled in.

{% post_image alt="", src="/uploads/250411/CleanShot_2025-04-08_at_08.55.16.png" %}

### Prep for deployment

That's it! If you want to deploy this to Netlify, the last thing to do is to add a Netlify configuration file. You may be fine without it, but I like to be as explicit as possible by adding my configuration to the code when possible.

`netlify.toml` {.filename}

```toml
[build]
  functions = "netlify/functions"
  publish = "_site"
```

## Choosing the right framework for full-stack development

Just because we _can_ do this, _should_ we?
