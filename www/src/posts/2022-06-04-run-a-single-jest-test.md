---
title: Run a Single Jest Test
description: >-
  Learn how to run a single test within a file, how to target a series of tests
  within a file, or how to only target a single file when using Jest.
tags:
  - quick-tip
  - jest
image: /posts/220604/run-a-single-jest-test-WK68kC1P.png
seo:
  image: /posts/220604/run-a-single-jest-test-qz_FG70X--meta.png
---

Let’s take a look at how you can target running a single test in Jest.

## Understanding How Jest Runs Tests

To set the context here, the most important thing to understand is that Jest loads test files and runs them in parallel. Jest only knows what it should and shouldn’t run at a global scale based on what you tell it to do through the command. More on this later.

## Methods for Running a Single Test within a Test File

Within a single file, you have multiple options to run a specific test.

### Targeting a Specific Test

Running single tests in Jest means using [the ](https://jestjs.io/docs/api#testname-fn-timeout)[test](https://jestjs.io/docs/api#testname-fn-timeout)[ method](https://jestjs.io/docs/api#testname-fn-timeout). You can target a single test using [test.only](https://jestjs.io/docs/api#testonlyname-fn-timeout):

```js
test.only("This will run", () => {
  // Do something ...
});

test("This will NOT run", () => {
  // This will be skipped ...
});
```

Being that `it` is an alias of `test`, you can also use `it.only()`. Or, as a shorter alias, you can use `fit`:

```js
fit("This will run", () => {
  // Do something ...
});

it("This will NOT run", () => {
  // This will be skipped ...
});
```

### Targeting a Group of Tests

Tests are typically grouped together using [describe](https://jestjs.io/docs/api#describename-fn). If you want to run all tests within a single `describe` block, but no other tests in the file you can use [describe.only()](https://jestjs.io/docs/api#describeonlyname-fn):

```js
describe.only("These tests will run", () => {
  // All tests in here will run ...
});

describe("These tests will NOT run", () => {
  // All these tests will be skipped ...
});
```

You can also use `fdescribe` as an alias:

```js
fdescribe("These tests will run", () => {
  // All tests in here will run ...
});

describe("These tests will NOT run", () => {
  // All these tests will be skipped ...
});
```

## Targeting a Single Test File

In some cases, you may be concerned with targeting a single test within a single test file. I have another post that goes into detail about [running a subset of test files within a Jest test suite](https://www.seancdavis.com/posts/2-methods-for-running-multiple-jest-suites-in-the-same-project/). You can pair the methods in that post with the methods above to pinpoint a single test throughout your suite.

## References

When I was first working to solve this problem, this [StackOverflow question and answer](https://stackoverflow.com/a/44446669/2241124) helped me get started. There is additional context within the answers that may help.
