---
title: How to Set Environment Variables in JavaScript Projects
description: "Environment variables are a great way to store values that will change based on your program's context."
image: "/blog/210819/blue--js-env-var.png"
tags:
  - javascript
---

[Environment variables](/blog/wtf-is-environment-variable/) are a great way to store values that will change based on your program's context (local vs production), or values that are sensitive and shouldn't be coupled with the code. (See here for more info on [when to use environment variables](/blog/when-to-use-environment-variables/).)

## Front- vs Back-End Environment Variables in JavaScript

To know how to set environment variables, you first have to understand whether you are setting the variable for the front or the back end.

In some cases this is quite obvious. If you're developing a [Node.js](/blog/wtf-is-node/) application, you're working on the back end. But if you're using a program that builds code to be run on the front end, then that differentiation gets a little muddy.

Consider a [static site generator](/blog/wtf-is-ssg/) like [Gatsby](https://www.gatsbyjs.com/). Part of the code you'll write gets run on the server, at build time. This is Node.js code that has access to anything Node can access. But the components that make up the front end are to be consumed in a browser and can't inherently read from the system in which the code was built.

## Front-End Environment Variables in JavaScript

How you work with front-end environment variables depends entirely on the framework that you're using. For example, [this is how Gatsby handles env vars](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/), and [this is how Next.js works with them](https://nextjs.org/docs/basic-features/environment-variables).

Environment variable support tends to be a basic feature in most front-end build tools. A quick search should get you the answer you're looking for.

## Back-End Environment Variables in JavaScript

When working on the back-end, Node.js offers a common practice for dealing with environment variables. The entire environment (within the context in which the program is running) is available in the `process.env` object.

This is a mutable object, which means you can write to it on the fly.

```js
console.log(process.env.MY_VAR)
// => undefined

const process.env.MY_VAR = "hello world"
console.log(process.env.MY_VAR)
// => "hello world"
```

But you're typically going to want to set these values somewhere more secure and decoupled from your code, as environment variables can be used to store sensitive information.

### Setting Env Vars Prior to Running the Program

You can have environment variables set before running the program. As I mentioned, your environment gets loaded into the `process.env` object at runtime. That means that if you've already set an environment variable, it'll be available to you.

How you set environment variables depends on the system in which your program is running. You can either do this on the command line or in a file that your system reads when it boots.

### Using a Tool to Help

Today there are great tools out there that help you work with environment variables.

Perhaps the most popular tool is [dotenv](https://www.npmjs.com/package/dotenv), which reads values from a file in your project and loads them into `process.env` at runtime.

I use dotenv when the framework has it built in. Otherwise, I tend to stick with my favorite, [direnv](https://direnv.net/). It only works for Unix-based systems (Mac OS X, Linux) but it's a delight. direnv also works by reading from a file, but it runs in the shell and actually loads the values into the environment, rather than waiting until the Node.js program is running. This can be beneficial because your various entry points to your application and the tools surrounding it don't have to remember to run dotenv. They are already in place.
