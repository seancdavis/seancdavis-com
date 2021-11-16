---
title: Testing storage with Selenium (Node)
date: 2021-02-18
description: How to test for key-value pairs in sessionStorage and localStorage using Selenium Node.
image: /blog/210208/210208--error-graphic.png
tags:
  - node
  - testing
canonical_url: https://www.grouparoo.com/blog/testing-session-storage-selenium-node
---

We have [a feature on this site that is using `sessionStorage`](/blog/getting-previous-path-nextjs) to send analytics data we want to capture. Being that it's an important feature, we _should_ write test(s) to cover the use case(s), right?

Okay, fine. Let's do it!

This website is a [Next.js](https://nextjs.org/) application that uses [Jest](https://jestjs.io/) as our test runner and [Selenium WebDriver](https://www.selenium.dev/) for integration test help.

What I wanted to do with Jest and Selenium was to read from `sessionStorage` after visiting a series of pages. After a bit of perusing, I finally uncovered a (goofy) way to achieve what I wanted.

We can use the `executeScript` method to run a JavaScript expression and capture the result. [Our test looks like this](https://github.com/grouparoo/www.grouparoo.com/blob/main/__tests__/integration/sessionStorage.ts):

```ts
declare var browser: any

async function getSessionItem(key) {
  return await browser.executeScript(
    `return window.sessionStorage.getItem("${key}");`
  )
}

test("stores page history in the session data", async () => {
  await browser.get(url + `/docs/config`)
  expect(await getSessionItem("prevPath")).toBe("null")
  expect(await getSessionItem("currentPath")).toBe("/docs/config")
  await browser.get(url + `/meet`)
  expect(await getSessionItem("prevPath")).toBe("/docs/config")
  expect(await getSessionItem("currentPath")).toBe("/meet")
})
```

Here are a few of the key items to note:

- You must `return` the JavaScript expression or you'll end up with `undefined`.
- It's a much cleaner approach to run tests as `async` functions so you can use `await` to retrieve the result of the script, rather than ending up in a nightmarish Promise chain.
- `browser` is often referred to as `driver` in other documentation and implementations. This comes from [the library we're using to connect Jest and Selenium](https://github.com/alexeyraspopov/jest-webdriver/tree/master/packages/jest-environment-webdriver).

This now works like a charm! You could take a similar approach if you wanted to read from any other JavaScript object, including `localStorage`.
