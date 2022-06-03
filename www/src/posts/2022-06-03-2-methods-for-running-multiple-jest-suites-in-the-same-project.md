---
title: 2 Methods for Running Multiple Jest Suites in the Same Project
description: Multiple approaches on running a subset of Jest tests within a project.
tags:
  - jest
  - testing
tweet: >-
  I’ve been a big fan of Jest for years. It’s trivial to run a subset of tests
  using the CLI, but I’ve also had to get creative in persisting that subset in
  CI. 


  Here’s how I’ve done it.
image: >-
  /posts/220603/2-methods-for-running-multiple-jest-suites-in-the-same-project-DShhPvxT.png
seo:
  image: >-
    /posts/220603/2-methods-for-running-multiple-jest-suites-in-the-same-project-aat7YlId--meta.png
---

I’ve come across two primary methods for running subsets of Jest tests within a single project. Let’s take a look.

## Why Run Multiple Test Suites Separately

First, why would you do this? I’ve run into a number of scenarios in which I want to run a certain set of tests. Here are a few examples:

- Run a single test while I’m developing (typically [the ](https://jestjs.io/docs/cli#--watch)[--watch](https://jestjs.io/docs/cli#--watch)[ option](https://jestjs.io/docs/cli#--watch) takes care of this)
- The test suite is large and I only want to run a subset of tests
- Tests should be run in a specific context/configuration — e.g. visual regression tests likely require a different config than unit tests

Fortunately, Jest makes this a super simple process.

## The Scenario

Let’s demonstrate this with a super simple project. Say I have a single `index.js` file with two functions — `method1()` returns `true` and `method2()` returns `false`.

`index.js` {.filename}

```js
exports.method1 = function () {
  return true;
};

exports.method2 = function () {
  return false;
};
```

And (for whatever reason) I want to test these methods in isolation in two different test suites, like this:

`__tests__/suite1/index.test.js` {.filename}

```js
const { method1 } = require("../../index.js");

describe("method1()", () => {
  it("returns true", () => {
    expect(method1()).toEqual(true);
  });
});
```

`__tests__/suite2/index.test.js` {.filename}

```js
const { method2 } = require("../../index.js");

describe("method2()", () => {
  it("returns false", () => {
    expect(method2()).toEqual(false);
  });
});
```

Now let’s look at how we could run these in isolation, assuming Jest is installed.

## Method #1: CLI Arguments

The more flexible approach is to use the CLI. Assuming you have a `test` string in your `package.json`:

```json
{
  // ...
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "jest": "^27.0.6"
  }
}
```

You can target a single file or directory as the first argument with the `jest` command. If using an `npm` script, that looks like this:

```txt
npm test -- __tests__/suite1
```

{% callout type="note" %}
Pay close attention to the `--` here. This is necessary for passing arguments to the `npm` script. If you’re running `jest` globally, you don’t need them, but could instead run `jest __tests__/suite1`.
{% endcallout %}

That will run only tests found within that path, returning something like the following output:

```txt
$ jest __tests__/suite1/
 PASS  __tests__/suite1/index.test.js
  method1()
    ✓ returns true (28 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.212 s, estimated 1 s
Ran all test suites matching /__tests__\/suite1\//i.
```

### When to Use the CLI

This method is really great for being quick and flexible. If you aren’t running the same grouping of tests repeatedly, this is a good approach.

## Method #2: Dynamic Configuration with Environment Variables

A more permanent option is to build a dynamic configuration file that looks for an environment variable to determine which suites to run.

Let’s say we were looking for an environment variable called `JEST_SUITE` and it should be set to `1` or `2`. We could do something like this:

`jest.config.js` {.filename}

```js
module.exports = {
  testMatch: [
    `<rootDir>/__tests__/suite${process.env.JEST_SUITE}/*.(spec|test).[jt]s`,
  ],
};
```

Now you can run the second test suite like this:

```txt
$ jest
 PASS  __tests__/suite2/index.test.js
  method2()
    ✓ returns false (28 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.227 s
Ran all test suites.
```

### When Dynamic Config is Better

Dynamic config is a more permanent solution. This is best used when you are intentionally splitting up tests for a specific purpose and for an extended period of time.

## Playground

I’ve set up a playground that includes [both scenarios within the same project](https://stackblitz.com/edit/node-yy8lhl?file=index.js). Take a look below:

[PLAYGROUND HERE]
