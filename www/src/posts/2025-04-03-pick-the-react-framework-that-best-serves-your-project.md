---
title: Pick the React framework that best serves your project
description: >-
  When you’ve decided to use React, take a moment to consider the site framework
  (for building, routing, and other dev APIs) that best suits your project.
tags:
  - astro
  - react
  - tanstack
  - vite
image: >-
  /posts/250403/pick-the-react-framework-that-best-serves-your-project-Q68pLJwn.png
seo:
  image: >-
    /posts/250403/pick-the-react-framework-that-best-serves-your-project-lj81x8Kr--meta.png
---

When React decided to [sunset Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app), many folks remembered it fondly. [In a brief rant](https://bsky.app/profile/seancdavis.com/post/3licefv6rc22o), I noted:

> I used it for so many demos and examples over the years. But time changes things. The React team's focus has shifted, and we now have other tooling that makes working with React easy, depending on the scenario.

Times change. Tooling comes. And tooling goes. And it goes for a variety of reasons.

In this case, there were a great many things at play, including the evolving and expanding rendering needs of JS devs, the React team's priorities, and the rapidly advancing tooling built up around React.

### Identifying what's best for developers

What I found weird and misleading (and what sparked the rant) is how the React docs recommend [starting new React projects](https://react.dev/learn/creating-a-react-app).

Rather than focus on helping developers pick what's best for their project, the docs present three "full-stack" frameworks, downplay others, leave out a few popular choices, make easy getting started paths sound complex, and add distracting notes about rendering patterns.

Let's reframe how to think about getting started with your next React project by centering you and what is best for your project.

### React as the assumed UI framework

I'm assuming you're reading this after deciding on React and your UI framework. If that's not the case, or if you haven't considered why React is (or isn't) the right choice for your project, start there. And if you've determined that React is right for your project, come back!

React was my go-to UI framework for many years — I used it everywhere I could. Today, I think for a moment before starting a project. I find myself landing on other solutions (or a combination of solutions) about as often as I pick React.

### Decide based on your use case and perceived growth

Tools get marketed to developers, which causes developers to lead architectural decisions with tools that have been marketed to them. We need to push against this. Leading with tooling is leading with a solution without consideration for the problem, getting in the way of making the best architectural decisions for a project.

I usually think about a new project's architecture step-by-step, like this:

1. What problem am I trying to solve?
1. What tools best support my ability to solve the problem quickly and maintain the solution (over a limited time)?
1. Which of these tools will help me deliver the best experience to my users?
1. What are my preferences from the remaining pool of available options?

#2 and #3 often require extensive research when presented with a new problem. Otherwise, you should be able to work through these quickly. The point is to take a moment to consider and choose solutions based on the problems they are addressing, rather than jumping right to the solution.

### Common use cases

I categorize most new projects I've spun up in the last decade into one of three groups:

- **Experiments:** proofs of concept or simple SPA projects that I need to get off the ground quickly, usually with very little attention in taking them to production.
- **Content websites:** projects that are intended to go to production, but where most of the content will be fed from a group of specific users, and once the content is created, it doesn't change often.
- **Dynamic applications:** interactive applications with constantly changing data. Where you need fresh content on most page loads, and where the user typically contributes to those content changes.

We'll consider these our "problem areas" and explore a solution for each of these categories.

{% callout type="note" %}
I've intentionally left out native (and hybrid) applications. I haven't built for these cases in several years and don't have an opinion on the best choice (although it seems like [Expo](https://expo.dev/) is a popular solution these days).
{% endcallout %}

### Leading with a mantra

While you can go much deeper based on your scenario (and I encourage you to), I've aimed to present a single recommendation for the areas listed above.

To summarize these recommendations into a single sentence, I'll share a bit of a mantra that has developed around the virtual halls of Netlify: ["Astro for sites, TanStack for apps, Vite under the hood."](https://x.com/biilmann/status/1903258803744936402)

These three projects lead with what's best for the developer and the developer community. Together, they cover the majority of use cases for any new project, even outside the context of React.

Let's explore how to apply that mantra to the use case categories mentioned above.

## Use Vite + React Router for PoCs and simple SPAs

When you need to spin up a simple prototype or an app with limited complexity, where you're working with established or external APIs, Vite is a great solution.

It's super simple [to get started](https://vite.dev/guide/). With one command, you're up and running with a new application.

```txt
npm create vite@latest my-react-app -- --template react-ts
```

The React docs consider this "[building a React app from scratch](https://react.dev/learn/build-a-react-app-from-scratch)" because it doesn't support all modern React features out of the box. In my experience, most React apps (_especially_ simple examples and prototypes) don't need most of React's features. Vite is a great place to start, not a scary custom option.

### Add React Router for SPA routing

To add client-side routing and create a single-page application (SPA) to a Vite + React app, install React Router.

```txt
npm install react-router
```

Then, add your routes to the root of your app.

```ts
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);
```

Voila! SPA ready to go. ([There's a lot more you can do with the router](https://reactrouter.com/start/declarative/routing#routing).)

### AI codegen tools use Vite + React Router

(At the time of writing) When you prompt AI code-generating agent tools like [Bolt](https://bolt.new/) or [Lovable](https://lovable.dev/) and aren't explicit about the stack you want to work with, they choose Vite + React every time. They are programmed that way because it's a good architectural decision that leads with simplicity and gets you far.

If the agent realizes that you need multiple routes, it will likely install `react-router`.

## Use Astro for content websites

Astro is an ideal choice for _content sites_, where most of the content doesn't change rapidly. The creators of the content typically don't consume content on the site. Think of blogs or marketing sites, not dynamic applications where users change content.

I typically classify these projects broadly as "websites" (vs "web applications," which we'll cover below).

Astro is optimized for content sites, and it works incredibly well for the typical use case but is also jam-packed with features for flexibly covering a variety of needs.

For example, if your site can be mostly pre-rendered but your home page is changing constantly, Astro has you covered — you can render your home page from the server while pre-rendering everything else.

The same goes for client-side code. When you have highly interactive _areas_ of your site, you can implement what Astro calls [a client island](https://docs.astro.build/en/concepts/islands/). Let's take a quick look.

### Get started with Astro and React

Use the delightful CLI wizard to create a new Astro project. Choose your preferred settings. (For demo purposes, choose the _basic, minimal starter_.)

```txt
npm create astro@latest
```

Once the site is set up, you can add React in one command.

```txt
npx astro add react
```

The correct packages will be installed, and configuration will be adjusted to use React.

To see React in action, create a simple counter component.

`src/components/Counter.jsx` {.filename}

```js
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

Replace the welcome component on the home page with the counter component.

`src/pages/index.astro` {.filename}

```html
---
import Layout from "../layouts/Layout.astro";
import Counter from "../components/Counter.jsx";
---

<Layout>
  <Counter />
</Layout>
```

Start up the dev server and visit localhost:4321.

```txt
npm run dev
```

You'll see that the component renders, but the counter doesn't count. This is because Astro renders only HTML and CSS by default. This keeps your site's build output clean, simple, and super-duper fast, injecting client-side JavaScript code only where you've specifically asked for it.

To use a client island, add the `client:load` [client directive](https://docs.astro.build/en/reference/directives-reference/#client-directives) to the page where you've used the counter component.

```html
---
import Layout from "../layouts/Layout.astro";
import Counter from "../components/Counter.jsx";
---

<Layout>
  <Counter client:load />
</Layout>
```

Reload the page, and your counter will count!

### React "apps" and components

This is incredibly useful because you can spin up little React components wherever you need to without requiring your entire site to rely on client-side JavaScript code.

React apps are a collection of components with routing. With Astro, the routing is handled by pages, either pre-rendered or rendered at runtime from a server. Then, your components are hydrated only as needed and from the point at which you specify.

### Demo using React with Astro

Here's a demo of the minimum amount of work to get React to run on the client for an Astro site.

{% code_playground url="https://stackblitz.com/edit/simple-astro-react?ctl=1&embed=1&file=src%2Fpages%2Findex.astro" %}

## Use Remix or TanStack for dynamic applications

The last category is dynamic applications, where users drive constant change to the data, consume that same data on the application, and want to see updates instantly.

As I write this, we're in an era of rapid change. Without going into too much detail on all the JS drama, I'll leave you with five short anecdotes to help you choose what's best for you.

### 1. This isn't about "full-stack" frameworks

First, the React docs position these frameworks as "full-stack," which is misleading, as it suggests those not in the category can't cover traditional full-stack behavior, which is wrong. (I'd argue you could consider [11ty](https://www.11ty.dev/) a full-stack framework if you use it that way, but I digress.)

This category of frameworks leads with JavaScript. They differ from one another in the APIs they introduce to aid the development experience, along with the patterns they provide for distinguishing between which JS code is server-rendered and which is client-rendered (or both).

### 2. Astro works for dynamic applications

I continue to use Astro whenever possible. I'm actively building out a series of business applications with Astro. While it presents challenges (as any framework does at some point), I prefer the more apparent distinction between server-rendered HTML and client-rendered JavaScript.

If that appeals to you, try it. For many folks in the space, Astro isn't the right pattern for highly dynamic applications, and that's totally fine. It's not optimized for that. It doesn't work for everyone.

### 3. Next.js is problematic

Prior to Astro, I used Next.js for many years, but it has some significant problems today, and I don't suspect I'll ever use it again. Part of this has to do with governance and vendor lock-in. But from a tech side, once the app router was introduced, we started to see more APIs come on the scene that have been unstable and/or unnecessary. I don't like working with it.

But it is still, hands down, _the_ go-to React meta framework. You may find yourself leaning toward it, and that's fine. Just make sure [you know what you're getting into](https://eduardoboucas.com/posts/2025-03-25-you-should-know-this-before-choosing-nextjs/).

(Disclaimer: I work at Netlify. Next.js is owned and maintained by Vercel, a direct competitor of Netlify. I loved Next.js long before I worked at Netlify, but I had already started to move away from it before I started at Netlify in 2023. However, only recently have better options been appearing on the scene. If I'd written this last year, I would have probably said, "Next.js is going to cause you problems, but it's probably your best choice.")

### 4. Migrating from Next to Remix

Fortunately, we're evolving!

Over the last year, I have seen teams struggling with Next.js begin to move to Remix. While it seems that those who have moved to Remix seemed happy with the experience, I can't confidently comment much more than that, as I have minimal experience with Remix.

### 5. Emergence of TanStack

And now there's a new player in town! [TanStack](https://tanstack.com/) is a suite of developer tools that can be stitched together to build dynamic and complex React applications. It is currently in beta, but it's getting a lot of love from developers.

Even over the last few weeks, I've seen notes of folks considering the Next-to-TanStack move over the Next-to-Remix move. This could be the corner of the community I'm viewing. But it could also be because TanStack has taken a framework-agnostic approach where it can. Or that TanStack is more developer-community focused and not owned by a corporation.

## Returning to the mantra

I'll leave you by repeating the mantra to summarize these recommendations: _Astro for sites, TanStack for apps, Vite under the hood._

These three projects lead with what's best for the developer and the developer community. Together, they cover the majority of use cases for any new project, even outside the context of React.

You'll spend a lot of time with your frameworks of choice. So don't just take my word about them. Learn more about them. Test them out. See what feels right. Then, get back to building!
