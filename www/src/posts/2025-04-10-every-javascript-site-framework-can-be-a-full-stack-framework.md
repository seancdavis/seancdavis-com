---
title: Every JavaScript site framework can be a full-stack framework
description: >-
  Debunking the idea of a “full-stack” framework from today’s offering by
  exploring how the role of a framework translates to an application running on
  a production platform.
tags:
  - architecture
  - javascript
image: >-
  /posts/250410/every-javascript-site-framework-can-be-a-full-stack-framework-JGy6bNl3.png
seo:
  image: >-
    /posts/250410/every-javascript-site-framework-can-be-a-full-stack-framework-F9YfplPu--meta.png
---

I recently wrote [a classic ](/posts/pick-the-react-framework-that-best-serves-your-project/)[framework recommendation](/posts/pick-the-react-framework-that-best-serves-your-project/)[ post](/posts/pick-the-react-framework-that-best-serves-your-project/) to help today's "React developers." This was, in large part, a response to [how the React docs framed their recommendations](https://react.dev/learn/creating-a-react-app). At the time of writing, these docs led with "full-stack frameworks" while defining _full-stack frameworks_ in fragments like they "support all the features you need to deploy and scale your app in production" and they "do not require a server."

## The stack is about the production server, not the framework

When it comes to frameworks, the distinction between "full-stack" and "front-end" is a little silly. Frameworks are frameworks, not stacks. Your "stack" is your production application architecture. Your framework is a means to get to production but plays a widely varying role in production.

### Most "modern" platform providers are "full-stack"

Most of today's production platform providers are "full-stack" in that they can serve a variety of types of responses from user requests, where logical code written by developers determines the response. That's full-stack.

The framework is just a tool that a developer uses to build that logic. Thus, all the "site" frameworks (distinguished from UI frameworks like React) we talk about in JavaScriptLand today are (or can be made to be) capable of helping developers create full-stack applications.

## Runtimes in monolithic application frameworks

[Ruby on Rails](https://rubyonrails.org/) is a classic example of a framework designed to help developers create monolithic applications. It has a development server (runtime), which developers use to make rapid changes to the application.

When ready for production, a _build_ optimizes assets, ships assets to a web server, and then starts a production instance of that same runtime.

## Runtimes in front-end application frameworks

When the Jamstack arrived on the scene in the mid-2010s, it helped to popularize the use of static site generators (SSGs), which later became known as front-end frameworks, or simply site _frameworks_.

(Somewhat) Like Rails, these frameworks have a development server to help developers work quickly.

Unlike Rails, when they are ready to go to production, they are built and transformed into HTML, CSS, and JavaScript files and delivered to users via a CDN. The production runtimes for these applications are file servers with no (or very little) trace of the framework used to create the assets.

## Runtimes in server-enabled site frameworks

It gets trickier when it comes to the category of frameworks that, at their core, act like SSGs but have server-enabled capabilities.

In development, these feel like working with Rails. That's because the development server is a runtime on a local web server, _just like Rails_. The server will have its framework's behavior and opinions baked in, but in a lot of cases, you'll be able to do what you can do with Rails, including loading dynamic data, putting routes behind authentication, injecting middleware, serving dynamic content, setting cookies and response headers, etc.

In production, things change.

### Platform adapters drive build behavior

When it comes to the build step, what happens then becomes specific to the platform on which the site will be deployed and hosted.

Each framework in this category has core build behavior which determines how it transforms the assets developers worked with in development to those that are hosted and used in production. While there may be default behavior for developers who choose to self-host, in most cases, developers will configure a platform adapter to build and run the application on Netlify, Cloudflare, Vercel, etc.

### Adapting framework features to platform features

The build process will still result in a collection of HTML, CSS, and JavaScript files. That's how these sites work at their core. They are just files delivered to the user.

These platforms have advanced to wrap more capabilities around the process of delivering static assets to users via a CDN. Each platform has a unique set of features that enable it to support (or not) the dynamic behaviors of the framework available when the development server is running.

For instance, at Netlify (where I work), our Astro adapter packages dynamic behavior into a "serverless" function. When a user requests a server-rendered page, Netlify directs the request to the serverless function and returns the result. (There's more to this, but we're focused on the basics.)

### The runtime is a platform configuration

While each combination of framework and platform has many nuanced features that can make it quite different from any other combination, the result is still essentially the same. Once the build process is complete, the resulting assets are uploaded, hosted, and delivered on some platform, and virtually all connection to the framework is severed.

Though there are exceptions, these aren't framework-level production runtimes in most cases. They are distributed platform configurations.

## Serverless functions and edge functions

Though providers offer a wide range of platform-level features to add additional capabilities to modern applications, the two core features are serverless functions and edge functions.

"Serverless" functions (which, quite literally, run on a server) are wired up to one or more URLs and have a single function that accepts a dynamic request and returns a unique response on demand. They are a crucial component of single-page applications (SPAs), providing dynamic behavior to JavaScript code that runs entirely on the client.

Edge functions are a way to manipulate a response at request time from the server. They are extremely powerful and flexible. A simple example is that an edge function could be used to change the text within a _static_ page's first `<h1>` element based on the requesting user's location.

I mention these two features because they are offered by most platform providers and act as the primary outlet for adapting how dynamic behaviors in server-capable front-end frameworks are run in production applications.

## Identifying the real value of a framework

The value a framework brings to developers today has nothing to do with the extent to which it is "full-stack" or not.

Frameworks are unique from another in three ways:

- **Rendering patterns:** APIs that determine how pages are served (rendered) and the extent of reliance on client-side JavaScript after the first page load
- **Development experience:** Tools and patterns that speed up development and enable developers to implement the framework's rendering patterns
- **Platform adaptation:** How the rendering patterns and other development tools are adapted to be hosted by the chosen platform

The rendering patterns affect user experience and are the main differentiating point between frameworks in production.

However, the value in a rendering pattern and development experience can only be realized if a framework _adapts_ its offering to how the website runs in production, which depends on the platform chosen by the developer.

### Framework gaps can be filled with direct platform feature usage

If that platform doesn't support the framework's features, then those features are meaningless for the developer.

On the other hand, if a framework doesn't appear to support a platform provider's capabilities, developers can often still work with those features.

For example, [11ty](https://www.11ty.dev/) doesn't have the concept of dynamic, server-rendered API routes. If it did, 11ty would also need adapters to transform those routes to serverless functions on the production platform. However, developers can work with 11ty and still have dynamic, server-rendered API routes by adding serverless functions as the platform expects, as long as the platform supports the feature.

## Choose the platform that is best for you

I've deployed almost exclusively to Netlify since 2018 because as frameworks have evolved, the platform has evolved right alongside them, making the features of the most progressive framework available to the most classic framework.

When it comes to choosing the right framework for your project, don't choose based on whether it is "full-stack" or not. And don't choose based on how a UI framework's documentation has marketed to you. All your users care about is how your application can best serve them in production.

Do your homework on the patterns and opinions of various frameworks. Pick the one that will enable you to build the features you need to deliver the right experience to your users as quickly as possible. Develop quickly. Deliver quickly. Serve quickly.
