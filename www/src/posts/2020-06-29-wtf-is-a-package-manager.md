---
title: WTF is a Package Manager?
description: A brief description of package managers, with some examples using
  referencing JavaScript packages.
tags:
  - wtf
image: /posts/default/default-yellow-01.png
---

A package manager is a collection of distributed software. I like to think of it as a giant repository of plugins — code libraries that don't come native to an environment or programming language, but provide some functionality on top of it.

For example, consider a [JavaScript](/posts/wtf-is-javascript/) library like [Lodash](/posts/wtf-is-lodash/). It offers a collection of utilities to the JavaScript programming language. One example is its [`last` method](https://lodash.com/docs#last/) in which it returns the last element of an array. JavaScript doesn't offer this by default. I could write my own function to handle extracting the last element of an array, or I could install the Lodash library to handle that functionality for me.

But packages can be much more complex. For example, a server-side language may have packages that handle authenticating users for an application.

One benefit of using well-maintained and distributed packages is that they are supported and tested by the community. That means you can grab solid, stable code that just works, and write less code for your project.

A package manager typically works in conjunction with a _registry_ or a place where packages are hosted. These may both be supported by the same provider or may be separated. For example, with JavaScript, NPM is both the package manager (the command-line tool) as well as the registry. But there are other package managers for JavaScript, like [Yarn](https://yarnpkg.com/), which handle just the command-line portion, but use NPM as the source (the registry) for the packages they install.
