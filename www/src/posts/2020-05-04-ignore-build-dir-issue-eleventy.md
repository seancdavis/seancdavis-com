---
title: Ignore _site Build Directory in Eleventy
description: How to ignore the build output when adding it to gitignore causes problems.
tags:
  - eleventy
image: /blog/default/default-pink-02.png
---

The other day I ran into a scenario with Eleventy in which having a `.gitignore` file without ignoring the build output directory (usually `_site`) caused the build to fail.

The error looked like this for me:

```
Unhandled rejection in promise ([object Promise]): (more in DEBUG output)
> Unexpected token =

`SyntaxError` was thrown:
    /path/to/node_modules/@11ty/eleventy/test/stubs/classfields-data.11ty.js:2
      data = {
           ^

    SyntaxError: Unexpected token =
...
```

## Build Failure Cause

The reason this occurs is likely because [Eleventy is trying to process files in the `node_modules` directory](https://github.com/11ty/eleventy/issues/318#issuecomment-449766302):

> Paths listed in your project's `.gitignore` file are automatically ignored ...
>
> If you do not have a `.gitignore` file in your project, the `node_modules` directory will be ignored automatically. This makes new Eleventy projects a little easier and helps developers new to Eleventy get ramped up easier too.

There's a goofy exception in here — if you have a `.gitignore` file and it has contents, but those contents do not include `node_modules`, then Eleventy will try to process files in `node_modules`.

The reason I came across this is because I was working in a space in which the project was inside a larger repository, where the root-level `.gitignore` had included `node_modules`, while my Eleventy project did not.

## Easy Solution

The easy solution is to add `node_modules` to your `.gitignore` file:

`.gitignore` {.filename}

```
node_modules/
_site/
```

## Another Way to Solve

Having `node_modules` in your `.gitignore` file is usually the way to go — it's a best practice. But, if there's a reason you don't want to include it, there's still a way to get Eleventy to work.

The other approach is to add `node_modules/` to `.eleventyignore`, which will automatically get picked up and ignored by Eleventy, but will still track those `node_modules` files with git (again, which you almost never want to do).

`.eleventyignore` {.filename}

```
node_modules/
```
