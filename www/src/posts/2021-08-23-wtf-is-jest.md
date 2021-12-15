---
title: WTF is Jest?
description: Learn the basics of the JavaScript testing framework, Jest.
image: /posts/210823/wtf--jest.png
tags:
  - javascript
  - jest
  - wtf
---

[Jest](https://jestjs.io/) is a [JavaScript](/posts/wtf-is-javascript/) testing framework.

It's JavaScript, so yeah, there are a whole heck of a lot of frameworks to choose from when it comes to writing tests. Many feel passionate about one over another. But Jest seems to be the more popular choice today.

As a test framework, its job is to provide you with an API that will help you test your program's code. Here's a quick example:

Let's say you have a function called `add` that is exported from a `utils.js` file. It adds to numbers together and returns the result. It looks like this:

`utils.js` {.filename}

```js
exports.add = function (num1, num2) {
  return num1 + num2;
};
```

You may have a Jest file right alongside it that loads the function and writes tests for it. A simple test would be to ensure that `1 + 1 = 2`. That Jest file might look like this:

`__tests__/utils.js` {.filename}

```js
const { add } = require("../utils");

test("1 + 1 = 2", () => {
  expect(add(1, 1)).toEqual(2);
});
```

{% callout type="note" %}
Notice I named the file the same and put it in a `__tests__` directory. This is a convention expected by Jest.

You can alternatively group the files together in the same directory and call it `utils.spec.js` and `utils.test.js`. Both will get picked up and run by Jest by default, unless you've changed the configuration.
{% endcallout %}

This was a super simple example just to give you a preview. To actually put this to action and learn more about Jest, visit its [Getting Started guide](https://jestjs.io/docs/getting-started).
