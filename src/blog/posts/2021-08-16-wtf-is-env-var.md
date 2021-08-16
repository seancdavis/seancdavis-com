---
title: WTF is an Environment Variable?
description: "Introductory information on environment variables and how to set them."
image: "/blog/210816/wtf--env-var.png"
tags:
  - wtf
---

In software development, an "environment" is the context in which a program or process runs.

An environment variable is a value that adjusts the environment — i.e. the process — in some way.

For example, consider some value you want to be different when developing locally versus running in production. Although you could achieve by writing a conditional in your code, it's much easier (and a better practice) to use a variable. Here's what this looks like in a [Node.js](/blog/wtf-is-node/) application.

```js
// bad
const myVar = isProduction ? "thisValue" : "thatValue"

// good
const myVar = process.env.MY_VAR
```

## Setting Environment Variables

Environment variables can be set in a number of ways, and those depend on the system in which the process is running. The action is often performed on the command line, but many programming languages have mechanisms and libraries for making this process easier for you.

## Storing Sensitive Information

Because environment variables are specific to the environment and not the code, they are a great way to store sensitive values for your processes.

## Further Reading

To dig into more technical details and theory, read [the Wikipedia entry](https://en.wikipedia.org/wiki/Environment_variable).

Otherwise, move on to [_When to Use Environment Variables_](/blog/when-to-use-environment-variables/) and then do a bit of research into how to set environment variables in the language you're using.
