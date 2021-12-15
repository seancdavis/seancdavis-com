---
title: WTF is an Environment Variable?
description: "Introductory information on environment variables and how to set them."
image: "/posts/210816/wtf--env-var.png"
tags:
  - wtf
---

In software development, an "environment" is the context in which a program or process runs.

An environment variable is a value that adjusts the environment (the _process_) in some way.

For example, consider some variable whose value you want to be different when developing locally versus running in production. Although you could achieve that by writing a conditional in your code, it's much easier (and a better practice) to use an environment variable. Here's and example in a [Node.js](/posts/wtf-is-node/) application:

```js
// bad
const myVar = isProduction ? "thisValue" : "thatValue";

// good
const myVar = process.env.MY_VAR;
```

## Setting Environment Variables

You can set environment variables in a number of ways, and those depend on the system in which the process is running. The action is often performed on the command line, but many programming languages have mechanisms and libraries for making this process easier for you.

## Storing Sensitive Information

Because environment variables are specific to the environment and not the code, they are a great way to store sensitive values for your processes.

## Further Reading

To dig into more technical details and theory, read [the Wikipedia entry](https://en.wikipedia.org/wiki/Environment_variable).

Otherwise, move on to [_When to Use Environment Variables_](/posts/when-to-use-environment-variables/) and then do a bit of research into how to set environment variables in the language you're using.
