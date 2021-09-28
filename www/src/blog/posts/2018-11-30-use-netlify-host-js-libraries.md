---
title: Use Netlify to Host JavaScript Libraries
description: "Netlify is built to host websites, but it can be a handy resource for JavaScript libraries, too."
tags:
  - javascript
  - netlify
---

[Netlify's](/blog/wtf-is-netlify/) focus is in on hosting websites following the [Jamstack approach](https://jamstack.org/), and it's really good at doing that.

If you don't about Netlify, the workflow is simple on the surface. It's all built around continuous delivery. When you push a change to GitHub, here's what happens:

1. GitHub webhook fires off to Netlify.
2. Netlify runs the build, as configured by you.
3. If the build passes, the code is deployed to Netlify's CDN providers and voila!, your code is live.

Because it uses the Jamstack approach, when the build is done, all Netlify has to host are static files that can be consumed by the web. Therefore, Netlify can take advantage of distributing these files via a [content delivery network](https://en.wikipedia.org/wiki/Content_delivery_network) (CDN), which means they are readily available worldwide and (most important) cached. (Plus, one of the best features of Netlify is that they handle the cache invalidation.)

Add to all this that it's basic service is free, and all this makes Netlify a perfect candidate for hosting any type of asset, not _just_ [HTML](/blog/wtf-is-html/) and [CSS](/blog/wtf-is-css/) files.

Consider a scenario where you have a browser-based JavaScript library shared among of a few of your projects, but it's not really any benefit to maintain, support, and distribute via the open-source community. If you want that code available via a URL (i.e. CDN), Netlify is a perfect candidate for helping you distribute it because it will deploy that code automatically to a CDN with a predictable URL.

Let's take a look at an example.

## The JavaScript Library

Let's say I have a really simple library. [Here's an example](https://github.com/seancdavis/hello-world-js) I put together that uses [webpack](/blog/wtf-is-webpack/) and [Babel](https://babeljs.io/) to take a ES6 module and make it available globally when loaded by the browser. The global class is called `HelloWorld` and it has two static methods:

- `log()`: Logs "Hello World!" to the console.
- `write()`: Appends "Hello World!" to the DOM's body.

In other words, once the script is loaded on any webpage, I can do the following:

```js
HelloWorld.log() // Logs "Hello World!" to the console.
HelloWorld.write() // Appends "Hello World!" to the DOM's body.
```

This webpack bundle is built by running `npm run build` (specified in `package.json`) and is output to `dist/hello-world.js`.

## Setting Up Netlify

To set up Netlify, you'd hook up the project to your JS library's GitHub repository just like you would for any Jamstack site your were to deploy with Netlify. In my case, the build command setting is `npm run build` and the publish directory is `dist`, but yours may be different depending on your project's build configuration.

And that's it. Really. Once your build can run your code has been distributed to a global CDN and is readily available. You don't even need your own domain if you don't want it.

I changed my project name to `hello-world-js`, which means the code is hosted at [https://hello-world-js.netlify.com](https://hello-world-js.netlify.com).

But notice there's nothing there -- it throws a 404 (page not found) error. This is because I don't have an `index.html` file in my `dist` directory. But, the JS file _is_ there. If you go directly to [https://hello-world-js.netlify.com/hello-world.js](https://hello-world-js.netlify.com/hello-world.js) the script is right there and ready for consumption, which means I can now do this on any webpage:

```html
<script src="https://hello-world-js.netlify.com/hello-world.js"></script>
<script>
  HelloWorld.log() // Logs "Hello World!" to the console.
  HelloWorld.write() // Appends "Hello World!" to the DOM's body.
</script>
```

## Bonus: Test Suite

While Netlify is built upon the concept of [continuous delivery (CD)](https://en.wikipedia.org/wiki/Continuous_delivery), it deploys code whenever you push to GitHub (based on your settings). But because Netlify's process includes a build step, that means you can also use Netlify as a [continuous integration (CI)](https://en.wikipedia.org/wiki/Continuous_integration) server. All you have to do is use a [`netlify.toml`](https://www.netlify.com/docs/build-settings/) file to tell Netlify to run your test build as part of your main build. Then, if that build fails, Netlify sends notification back to GitHub and your code does not get deployed. (You can also run this logic on pull requests, so you know your build is going to pass before you attempt to deploy it.)

## Next Steps

This is a really simple example because the concept is simple at its core. But as your JS library and the number of projects it supports grows, the more complex it's going to be. You'll likely want to consider versioning, for example, and write a new file to your `dist` directory whenever there is a new version ready to go. You may even want to make use of [previews](https://www.netlify.com/tag/deploy-previews/) so you can test a production build prior to releasing the new version.

The point is there is a lot you can do with the simple idea of using this great (and free!) service for hosting your browser-based JavaScript libraries.
