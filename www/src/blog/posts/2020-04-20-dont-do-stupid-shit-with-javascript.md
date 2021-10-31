---
title: Don't Do Stupid Shit with JavaScript
description: The JavaScript community is large. Use it to make your code better.
tags:
  - javascript
image: /blog/default/default-pink-01.png
---

The other day I found myself writing a snippet of code that looked _something_ like this:

```js
const newKey = keyPath.slice(0, keyPath.length - 4)
eval(`myObj.${newKey} = newValue`)
```

You don't have to know the context around what this code is doing to know that it's pretty dumb.

The glaring issue is that I'm using `eval`. Regardless of whether or not an end user will have access to this code, it's generally a bad practice to work with `eval`.

In addition, the first line — which removes the last four characters from another variable — is brittle. Presumably the `4` is important — based on something specific, probably defined elsewhere in the code. That means if that definition ever changes, I'll likely have to change the `4`, too. That's brittle, as it's one more thing to manage and remember than necessary.

Instead, in both cases, I could use a library like [Lodash](https://lodash.com) to write this code. Lodash has been around for years and is well-tested. If I were to import the main Lodash object as `_`, the code snippet from above could become:

```js
const newKey = _.trimEnd(keyPath, suffix)
_.set(myObj, newKey, newValue)
```

Look at that! It's clean, the underlying code is well-tested, and it's using variables defined elsewhere.

---

Look, there are a lot of people writing JavaScript code today. When you come across a problem, it's likely that someone has solved a very similar problem or has a better way of achieving the desired result. It's also likely so many people have solved the same sort of problem that there's a shared and tested solution with a community behind it.

But that doesn't mean you should go hunting for someone else's solution every time you have a problem. That may not always serve your project the best. You may burn more time looking for another's solution than you would have in creating your own. And you may add unnecessary bloat to your project.

What I mean is that you should **operate with balance**. When you find yourself wrangling to get some basic logical function to work, or when you look back at your code and feel like there must be a better way, there probably is. In some cases that may just be a little refactoring (_little_ being the operative word), or maybe there's a JS package you could make use of.

In other words, don't do stupid shit with JavaScript. The community has countless resources which you can use to write better code.
