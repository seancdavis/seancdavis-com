---
title: Using Node.js to Check for Broken Links
description: >-
  A tutorial that walks through the process of writing a Node.js script to
  recursively test for broken links on a website.
tags:
  - node
  - testing
  - javascript
tweet: >-
  I’ve been exploring scripts that test for broken links on a few different
  websites recently. It turns out that it’s not all that difficult to do if you
  can leverage existing tools like Linkinator.
image: /posts/230203/using-nodejs-to-check-for-broken-links-1u1cvAs0.png
seo:
  image: /posts/230203/using-nodejs-to-check-for-broken-links-teLDHOXS--meta.png
---

{% youtube_embed id="SdvlogJv3S8" %}

I've explored various methods for checking broken links over the last several years. I've found that the approach that works best for me is having a simple script that recursively checks links on my production site.

When it finishes a run, it then notifies me of the results, so I can take action as needed. Here we're going to only look at the script that checks for the links and have it report the results on the console.

{% callout type="note" %}
If you'd like to simply see the resulting code, check out [the example repository](https://github.com/seancdavis/node-link-checker). The main script used in the repo is [index.js](https://github.com/seancdavis/node-link-checker/blob/main/index.js).
{% endcallout %}

## Project Setup

I've created [an example project](https://github.com/seancdavis/node-link-checker) with all the code you'll find here. What we walk through in this post is the process for adding a script like this to your project.

### Install Dependencies

I'm using two dependencies here: [linkinator](https://www.npmjs.com/package/linkinator) for checking the links and [chalk](https://www.npmjs.com/package/chalk) for colonizing the reported console output.

```txt
npm install -D linkinator chalk
```

### Add Script

Then add a script in the `package.json` file that points to the script file. In the example project, the script is called `check-links`, which runs `node index.mjs`.

`package.json` {.filename}

```json
{
  "scripts": {
    "check-links": "node index.mjs"
  }
  // ...
}
```

{% callout type="note" %}
Note that I'm using `.mjs` as the file extension. This is because linkinator is an ES module and we will have to use `import` instead of `require`.

The benefit of this is that we then can also run asynchronous code outside a function, which makes the script's code much cleaner, as you'll see below.
{% endcallout %}

## How Linkinator Works

The bulk of this script is simply setting up, hooking into, and reporting from linkinator's process. To do so, let's take a look at how it works.

### Starting with a Base URL

First, you give instantiate linkinator and give it a set of options.

```js
import { LinkChecker } from "linkinator";

const BASE_URL = "https://www.seancdavis.com/";

const checker = new LinkChecker();

await checker.check({ path: BASE_URL, recurse: true });
```

If you run the script now, it will appear to hang for a bit and then eventually exit with not output. But it is checking for links.

{% callout type="note" %}
The site it is checking (this site) is fairly large, so you may want to replace the domain with a site you know is smaller.
{% endcallout %}

### Linkinator Events

The way we get feedback and can report on results is by hooking into the lifecycle events while linkinator is running. We'll use two: `link` and `pagestart`.

The `link` event runs after a link has been checked. Let's take a look at what happens when we log out the link parameter passed into this event callback. (We'll use `pagestart` a little later.)

```js
import { LinkChecker } from "linkinator";

const BASE_URL = "https://www.seancdavis.com/";

const checker = new LinkChecker();

// Log the link object for each link, after it is checked.
checker.on("link", (link) => {
  console.log(link);
});

await checker.check({ path: BASE_URL, recurse: true });
```

### The Link Object

When you run the script again, you'll likely get a lot of output sent to the console. Each object is the result from checking a link.

Successful links will be structured like this:

```js
{
  url: '...',
  status: 200,
  state: 'OK',
  parent: '...',
  failureDetails: []
}
```

Failures look the same, but will have a different status code, `BROKEN` state, and `failureDetails` will be populated. Here's an example:

```js
{
  url: '...',
  status: 403,
  state: 'BROKEN',
  parent: '...',
  failureDetails: [
    {
      config: [Object],
      data: [Gunzip],
      headers: [Object],
      status: 403,
      statusText: 'Forbidden',
      request: [Object]
    }
  ]
}
```

This will come in handy, as we'll use various properties from this object to store and report results.

### Checking Pages

If you'd also like to show an output of every page that was checked, include the `pagestart` event listener. To see what's happening here, we can log the URL of the page.

```js
import { LinkChecker } from "linkinator";

const BASE_URL = "https://www.seancdavis.com/";
const checker = new LinkChecker();

// Log the URL for each page, before it is checked.
checker.on("pagestart", (url) => {
  console.log(`Scanning ${url}`);
});

await checker.check({ path: BASE_URL, recurse: true });
```

This should give you a list of all the pages on the site.

```txt
Scanning [...]/
Scanning [...]/about
Scanning [...]/blog
Scanning [...]/contact
Scanning [...]/privacy
...
```

## Reporting Output

Now we have the basics in place, let's start to gather the results and report them to the console.

### Quick Results

A pattern I really like to use when building scripts that run tests like this is to write the result with some colorized character in the console. This way there is _some_ feedback being logged, but not so much that it's noisy.

And when the process is finished, we can surface the necessary details from the task.

To do this, we'll use the chalk library along with a map object to produce a colorized character that informs us of the result of each link tested, as follows:

- `OK`: green period
- `SKIPPED`: yellow question mark
- `BROKEN`: red exclamation mark

Here's the code:

```js
import { LinkChecker } from "linkinator";
import chalk from "chalk";

const BASE_URL = "https://www.seancdavis.com/";

// Define a map of states and colors to use when logging the results of each
// link.
const LOGGER_MAP = {
  OK: chalk.green("."),
  BROKEN: chalk.red("!"),
  SKIPPED: chalk.yellow("?"),
};

const checker = new LinkChecker();

// Log the results for each link.
checker.on("link", (link) => {
  process.stdout.write(LOGGER_MAP[link.state]);
});

await checker.check({ path: BASE_URL, recurse: true });
```

Then we can see the results appear as the links are checked.

{% post_image alt="", src="/uploads/230203/CleanShot_2023-01-11_at_20.43.09.png" %}

### Storing Links for Reporting

That's nice, pretty, and concise feedback while it's running. But when it's done, we probably want to log the broken links.

To do that, we can inspect the state of a link after a check and store a reference if it was broken.

```js
import { LinkChecker } from "linkinator";
import chalk from "chalk";
import { URL } from "url";

const BASE_URL = "https://www.seancdavis.com/";
const LOGGER_MAP = {
  OK: chalk.green("."),
  BROKEN: chalk.red("!"),
  SKIPPED: chalk.yellow("?"),
};

const checker = new LinkChecker();

let brokenLinks = [];
checker.on("link", (link) => {
  process.stdout.write(LOGGER_MAP[link.state]);
  // Store reference if link is broken
  if (link.state === "BROKEN") brokenLinks.push(link);
});

await checker.check({ path: BASE_URL, recurse: true });

// Report broken links
if (brokenLinks.length > 0) {
  console.log("");
  console.log(`Found ${brokenLinks.length} broken links:`);
  for (const brokenLink of brokenLinks) {
    console.log("");
    console.log(brokenLink.url);
    console.log("  ", "STATUS:", brokenLink.status);
    console.log("  ", "SOURCE:", new URL(brokenLink.parent).pathname);
  }
}
```

If you run the script again and it found any broken links, you should now see a summary just before the script exits.

```txt
Found 2 broken links:

https://...
   STATUS: 403
   SOURCE: /about

https://...
   STATUS: 404
   SOURCE: /blog
```

### Storing Pages

We showed above that you could also report a list of pages. However, if you're using this concise reporting method, you don't want to log the page every time a page is checked, but rather send a summary after the checks have been completed.

```js
import { LinkChecker } from "linkinator";
import chalk from "chalk";
import { URL } from "url";

const BASE_URL = "https://www.seancdavis.com/";
const LOGGER_MAP = {
  OK: chalk.green("."),
  BROKEN: chalk.red("!"),
  SKIPPED: chalk.yellow("?"),
};

const checker = new LinkChecker();

let brokenLinks = [];
checker.on("link", (link) => {
  process.stdout.write(LOGGER_MAP[link.state]);
  // Store reference if link is broken
  if (link.state === "BROKEN") brokenLinks.push(link);
});

// Store reference to page being checked
let pagesChecked = [];
checker.on("pagestart", (url) => pagesChecked.push(url));

await checker.check({ path: BASE_URL, recurse: true });

// Report broken links
if (brokenLinks.length > 0) {
  console.log(`Found ${brokenLinks.length} broken links:`);
  for (const brokenLink of brokenLinks) {
    console.log("");
    console.log(brokenLink.url);
    console.log("  ", "STATUS:", brokenLink.status);
    console.log("  ", "SOURCE:", new URL(brokenLink.parent).pathname);
  }
}

// Report pages checked
console.log("");
console.log(`Checked ${pagesChecked.length} pages:`);
for (const page of pagesChecked) {
  console.log(" ", new URL(page).pathname);
}
```

And now your results should look something like this:

```txt
.....................?...........................!............?..!..

Found 2 broken links:

https://...
   STATUS: 403
   SOURCE: /about

https://...
   STATUS: 404
   SOURCE: /blog

Checked 29 pages:
  /
  /about
  /blog
  ...
```

## Customizing for Your Needs

This is the basic pattern for handling this task. The core of it is really quite simple.

You can take this and customize it to your needs. Here are some ideas I've used to make this more effective for my uses:

- Use environment variables to drive values like the `BASE_URL` to make it easier to test in development and apply to production.
- Report the results to important parties. For example, I have a couple scripts that summarize the results in a Slack channel. For one project, I report a summary of all links, while the other only reports broken links.
- Use a GitHub Action or some sort of CI/cron task to run the script nightly.

## References

- [Example Repository](https://github.com/seancdavis/node-link-checker)
- [linkinator on NPM](https://www.npmjs.com/package/linkinator)
- [Chalk on NPM](https://www.npmjs.com/package/chalk)
