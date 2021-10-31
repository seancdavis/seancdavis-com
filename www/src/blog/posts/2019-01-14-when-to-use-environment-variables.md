---
title: When to Use Environment Variables
description: Environment variables can seem like overkill to new developers, but
  there are two scenarios in which they are extremely beneficial to efficiency
  and security.
image: /blog/default/default-yellow-03.png
---

As a new developer, it can be difficult to understand the value of environment variables and when they make sense to use.

There are two scenarios in which I find environment variables most useful:

1. Environment-specific values
2. Sensitive data

Let's look at each of these scenarios to help derive the value of using environment variables in the first place.

## Environment-Specific Values

Most of your projects will have multiple environments. At the very least, you'll have a _development_ environment (for working locally) and a _production_ environment. But often projects have additional environments—_test_, _qa_, _staging_, etc.

The novice route when changing values between environments usually looks something like this (using JS code as an example):

```js
if (isProduction) {
  var my_var = "This Value"
} else {
  var my_var = "That Value"
}
```

That's gross. It's repetitive (not [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)) and it only solves contextual values for two environments. Every time you add a new environment (which, admittedly, shouldn't happen much) you'd have to add a new line everywhere you have this type of logic.

If you're using environment variables, you can reduce those five lines to a single line:

```js
var my_var = MY_VALUE
```

_(Note: The code is just a demonstration—it doesn't do anything on its own.)_

Managing environment-specific values using environment variables empowers you to keep code clean and manage the change in environments elsewhere.

## Sensitive Data

Sensitive data—passwords, API keys, tokens, etc.—should never be written into the code. This holds true even if you have a private repository on your git host ([GitHub](https://github.com/), [Bitbucket](https://bitbucket.org/), [GitLab](https://about.gitlab.com/), etc.). When you commit a sensitive value and push it to a remote host, you add one more place where that sensitive value could be stolen.

Using environment variables to store sensitive data means the variable only exists where it is being used, effectively mitigating the risk of it being exposed as much as possible.

And when you have a solid system for storing sensitive data, you don't have to worry so much about _how_ sensitive the values are. If there's any question whatsoever as to whether a value is sensitive or not, you should automatically default to using an environment variable over plugging it into the code.

---

So, don't be afraid! Once you get your head wrapped around how to manage environment variables, they will become one of your closest friends. And, if you want a little help working with and managing environment variables, check out [the tool I like to use](/blog/favorite-tool-managing-project-specific-environment-variables/).
