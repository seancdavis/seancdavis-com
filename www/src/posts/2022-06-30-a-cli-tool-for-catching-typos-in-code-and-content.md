---
title: A CLI Tool for Catching Typos in Code and Content
description: A handy CLI tool for catching misspellings in any files in your codebase.
tags:
  - testing
image: /posts/220630/a-cli-tool-for-catching-typos-in-code-and-content-QP0WnN1s.png
seo:
  image: >-
    /posts/220630/a-cli-tool-for-catching-typos-in-code-and-content-KazlyqW9--meta.png
---

I’ve previously discussed [using a spell checker in VS Code](https://www.seancdavis.com/posts/use-code-spell-checker/), but it’s easy to miss misspellings when _in the zone_. Plus, an extension alone doesn’t protect against other team members misspelling words.

[cspell](https://www.npmjs.com/package/cspell) (the library behind the VS Code plugin) also has a CLI that you could use to check files in your repository.

## Install cspell

You can install cspell on your machine like so:

```txt
npm install -g cspell
```

Or you could choose to run it directly using the `npx` command:

```txt
npx cspell ...
```

## Checking for Typos

Suppose all your content is in markdown files in your repository. You can check across all your content with a command like this:

```txt
cspell **/*.md --exclude node_modules
```

That will print out a list of files that it matches, along with any misspellings.

## Configuring Approved Words

There are a [number of options](https://cspell.org/configuration/) for configuration filenames that are automatically consumed. Supposing you chose `cspell.json` as our config file, you could then add an array of approved words.

```json
{
  "words": [
    "changefreq",
    "checklinks",
    "firstname",
    "gtag",
    "hbsp",
    "HUBSPOT",
    "jobtitle",
    "keylines",
    "lastmod",
    "lastname",
    "nextjs",
    "pageview",
    "semibold",
    "shortcode",
    "shortlink",
    "sourcebit",
    "Sourcebit",
    "stackbit",
    "swiper",
    "tailwindcss",
    "urlset"
  ]
}
```

## Next Steps

This is as far as I’ve taken it so far — using it manually as needed. Ideally, this would be hooked up to some sort of build or continuous integration process, and would fail the build if any words were misspelled.

Hope this helps you avoid typos in your project!
