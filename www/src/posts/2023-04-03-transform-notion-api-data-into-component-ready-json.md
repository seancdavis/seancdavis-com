---
title: Transform Notion API Data into Component-Ready JSON
description: >-
  Take raw JSON output from the Notion API and transform it into properties that
  can be used by your website’s pages and components.
tags:
  - api
  - cms
  - javascript
  - node
  - notion
image: /posts/230403/transform-notion-api-data-into-component-ready-json-x-DVt1VF.png
seo:
  image: >-
    /posts/230403/transform-notion-api-data-into-component-ready-json-SZj2L8Jz--meta.png
---

{% youtube_embed id="97ARQTHyf1c" %}

This is part of a four-part series on showing the potential of Notion as a CMS for complex websites:

1. [Using Notion Callouts to Generate Complex Components](https://www.notion.so/Using-Notion-Callouts-to-Generate-Complex-Components-798f15a836a94c0dac9fedc51a3cc82e)
1. [Accessing a Notion Database Using the API](https://www.notion.so/Accessing-a-Notion-Database-Using-the-API-dd8daa7e418e45958427d673acd7d458)
1. [Write Notion Page and Block Data to JSON File with Node.js](https://www.notion.so/Write-Notion-Page-and-Block-Data-to-JSON-File-with-Node-js-Script-75e8127c9a50405e888b23132f893ecf)
1. **Transform Notion API Data into Component-Ready JSON**

---

In the previous post, we retrieved page and block content from a Notion database and wrote the raw result to a local JSON file. We want to be able to map this content to components in a website.

Ideally, that content would be in a format where the website and its components don't have to do much work. They can receive properties and use them directly. We'll cover this process in the next article.

### What the Transformer Script Does

To be able to use this content cleanly in the website code, we _transform_ the raw output from Notion's API into something more workable. This means:

- Strip away the content we aren't going to use.
- Provide contextual properties to help the site map blocks to components.
- Transform additional content that would result in less work for the site and its components. In this example, we'll run code block content through [highlight.js](https://highlightjs.org/) to make it trivial to add syntax highlighting on the site.

## Setting Up the Transformer

Let's start with a bit of setup.

### Prerequisites

I'm assuming the following:

- You've exported raw page data from a Notion API, attached raw block data to `children` properties, and have written the results to a JSON file. (If not, go through the previous post.)
- You have another [blank Node.js script](/posts/new-javascript-project-setup/) ready to go, along with a way to run the script.

### Install Dependencies

We're going to install [highlight.js](https://highlightjs.org/) to help us handle the syntax highlighting, as an example of advanced content transformations.

```js
npm install highlight.js
```

We'll be able to handle all other transformations with basic JavaScript code.

## Writing the Transformer Script

This script gets fairly complex pretty quickly, so we're going to step through it one section at a time. View the full script [in this example project](https://github.com/seancdavis/notion-component-mapper/tree/main/04-transform-data).

### Ensure Export Exists

First, let's add our dependencies and make sure that the file you're looking for exists. If it doesn't, exit the script and print an appropriate message.

And we'll also load the export file into a `pages` constant.

```js
const fs = require("fs");
const path = require("path");
const hljs = require("highlight.js/lib/common");

const outputFile = path.join(__dirname, "notion-export.json");

if (!fs.existsSync(outputFile)) {
  console.error(`File not found: ${outputFile}`);
  process.exit(1);
}

const pages = JSON.parse(fs.readFileSync(outputFile));
```

{% callout type="note" %}
Be sure to set `outputFile` to the appropriate path pointing to the Notion export file.
{% endcallout %}

### Transformer Placeholders

We're going to use a `blockMap` object which will handle transforming raw output from the Notion export into a component-ready object.

This work by using the keys with the `blockMap` object as the `type` property from the exported block data, while the value will be a function that will accept the raw block data and transform it.

To being, we'll just setup the structure on which we can expand.

```js
// ...

const pages = JSON.parse(fs.readFileSync(outputFile));

const blockMap = {};

function transformBlocks(blocks) {
  return blocks
    .map((block) => {
      if (blockMap[block.type]) {
        return blockMap[block.type](block);
      }
      console.log("NOT SUPPORTED:", block.type);
    })
    .filter(Boolean);
}

let output = pages.map((page) => {
  const { properties, children, id } = page;
  return {
    id,
    title: properties.Name.title[0].text.content,
    urlPath: properties.Slug.rich_text[0].plain_text,
    blocks: transformBlocks(children),
  };
});

const transformedOutput = path.join(__dirname, "content.json");
fs.writeFileSync(transformedOutput, JSON.stringify(output, null, 2));
console.log(`Transformed ${output.length} pages to ${transformedOutput}`);
```

Notice that this did the following:

1. Looped over `pages` (raw Notion export) to set the a few properties for the page — `id`, `title`, and `urlPath`. These are essentially pass-through values from the raw export of the page.
1. Set `blocks` on the page to the result of `transformBlocks`, passing in the raw child block content.
1. `transformBlocks` uses the `blockMap` object to map `block.type` to a function expected to transform the block. If it doesn't find the function, it notifies the console, and returns `undefined`. Thus, the block is skipped on the page.
1. After the loop is complete, the last three lines write the result to `content.json` in the same directory as the script, and prints how many pages were transformed.

Running this now would result in a number of "NOT SUPPORTED" notes, like this:

```txt
NOT SUPPORTED: paragraph
NOT SUPPORTED: paragraph
NOT SUPPORTED: paragraph
NOT SUPPORTED: callout
NOT SUPPORTED: paragraph
NOT SUPPORTED: callout
```

But the `content.json` file should still be created. It just won't have any `blocks` data. It should look something like this:

```json
[
  {
    "id": "...",
    "title": "Plain Text Page",
    "urlPath": "plain-text-page",
    "blocks": []
  },
  {
    "id": "...",
    "title": "Page with Components",
    "urlPath": "page-with-components",
    "blocks": []
  }
]
```

### Add Basic Text Support

Let's add our first transformer. We'll start simple and transform `paragraph` blocks.

```js
const blockMap = {
  paragraph: (block) => {
    if (block.paragraph.rich_text.length === 0) return null;
    return {
      component: "Paragraph",
      text: block.paragraph.rich_text
        .map(({ plain_text }) => plain_text)
        .join(""),
    };
  },
};
```

Here we're returning an object with two properties:

- `component`: Set to `Paragraph`
- `text`: Set to the plain text from the content in Notion

{% callout type="note" %}
This omits any style added within the paragraph. If you were taking this script to production, you'd want to introspect the raw export and support things like bold, code, and emojis within a paragraph. You'd also probably want to consider children, which we're not doing in any of these functions.
{% endcallout %}

If you have paragraph content, you should see the paragraph warnings go away and paragraph block content should appear in the transformed output file after running the script again.

```json
[
  {
    "id": "...",
    "title": "Plain Text Page",
    "urlPath": "plain-text-page",
    "blocks": [
      {
        "component": "Paragraph",
        "text": "This page doesn’t have any components. It’s just a bunch of text."
      },
      {
        "component": "Paragraph",
        "text": "Nulla commodo dolore culpa aute Lorem nostrud dolore ullamco consequat aliquip consequat. Nostrud veniam ex proident magna ipsum. Mollit deserunt fugiat ad sunt ipsum occaecat dolor cupidatat nisi. Eiusmod exercitation laborum nisi exercitation est eiusmod nisi esse. Qui incididunt exercitation incididunt sint nisi mollit ullamco pariatur laboris enim Lorem. Excepteur eu eu quis ea qui amet ea consectetur occaecat eiusmod est incididunt."
      }
      // ...
    ]
  }
  // ...
]
```

### Callout Transformer Placeholder

At this point, we've covered the basic foundation. You may have enough to take and run with for your particular use case.

Now we're going quite a bit deeper. We're going to show how we can create an advanced mapping system using Notion callouts.

First, add a `callout` property to the `blockMap` which calls a `resolveCalloutComponent(block)` function to resolve the callout block. (Callouts are going to support multiple components, as we'll see shortly.)

```js
const blockMap = {
  paragraph: (block) => {
    if (block.paragraph.rich_text.length === 0) return null;
    return {
      component: "Paragraph",
      text: block.paragraph.rich_text
        .map(({ plain_text }) => plain_text)
        .join(""),
    };
  },
  callout: (block) => {
    const result = resolveCalloutComponent(block);
    if (!result) return null;
    return result;
  },
};
```

Next, let's add the `resolveCalloutComponent` function, which is going to use another map — `calloutMap` — to further transform callouts **based on the icon used in the callout.** For this example, and to keep things simple, we're going to Notion's provided SVG icons and not the universal emojis.

But at first, like we did above, we'll start with placeholders and show that no callout icons are supported.

```js
const calloutMap = {};

function resolveCalloutComponent(block) {
  if (block.callout?.icon?.type !== "external") {
    console.log("ICON NOT SUPPORTED:", block.callout.icon);
    return null;
  }
  const iconName = block.callout.icon.external.url
    .split("/")
    .pop()
    .split(".")[0]
    .split("_")[0];
  if (!calloutMap[iconName]) {
    console.log("EXTERNAL ICON NOT SUPPORTED:", iconName);
    return null;
  }
  return calloutMap[iconName](block);
}
```

### Callout Examples in Notion

Before we go further, let's look at source content that we're going to account for — tabs and code blocks.

The tabs callout uses a tabs icon, where the content in the primary callout doesn't do anything. It then contains child blocks **which must be callouts, but their icon doesn't matter.**

{% post_image alt="", src="/uploads/230403/tabs-callout.png" %}

The code block callout uses the code icon. The main content is the filename of the example, and it should contain a child code block with the code to display, and the appropriate language selected.

{% post_image alt="", src="/uploads/230403/code-block-callout.png" %}

With these two examples in place in Notion, you can run the script again. At this point, the output won't be any different, but you'll see any updated error messages pointed to the console.

```txt
EXTERNAL ICON NOT SUPPORTED: tabs
EXTERNAL ICON NOT SUPPORTED: code
```

### Add Tabs Support

Let's start with the tabs. First, we'll add a new function called `resolveTabs` that is responsible for mapping over child blocks within the tabs callout and creating a tab component for each child that it finds. The individual tabs will have `label` and `text` properties.

And then we can add the `tabs` property to the `calloutMap`.

```js
function resolveTabs(tabsBlocks) {
  return tabsBlocks
    .map((tab) => {
      if (tab.type !== "callout") return null;
      return {
        label: tab.callout.rich_text
          .map(({ plain_text }) => plain_text)
          .join(""),
        text: tab.children[0].paragraph.rich_text
          .map(({ plain_text }) => plain_text)
          .join(""),
      };
    })
    .filter(Boolean);
}

const calloutMap = {
  tabs: (block) => {
    return {
      component: "Tabs",
      tabs: resolveTabs(block.children),
    };
  },
};
```

Run the script again and we should see transformed content for the tab component.

```json
[
  {
    "id": "...",
    "title": "Page with Components",
    "urlPath": "page-with-components",
    "blocks": [
      {
        "component": "Tabs",
        "tabs": [
          {
            "label": "Tab #1",
            "text": "This is content within the tabs."
          },
          {
            "label": "Tab #2",
            "text": "Qui ex tempor quis aliquip do veniam ea reprehenderit irure dolore duis. Ut cillum sint enim dolor eiusmod nulla reprehenderit proident tempor voluptate in. Pariatur officia anim et ea. Esse amet cupidatat cillum dolor laborum voluptate pariatur Lorem consequat amet."
          }
        ]
      }
      // ...
    ]
  }
]
```

### Add CodeBlock Support

Last, let's handle the code block example. Here we'll do all the work inside the `code` property in the `calloutMap`. The code block component gets `component`, `filename`, `code`, and `language` properties.

```js
const calloutMap = {
  tabs: (block) => {
    return {
      component: "Tabs",
      tabs: resolveTabs(block.children),
    };
  },
  code: (block) => {
    if (!block.children[0].code) {
      console.log("Code component must be first child of code callout");
      return null;
    }
    const code = block.children[0].code.rich_text
      .map(({ plain_text }) => plain_text)
      .join("");
    // YOU MAY NEED A MAPPER FOR THIS
    const language = block.children[0].code.language;
    const highlightedCode = hljs.highlight(code, { language }).value;
    return {
      component: "CodeBlock",
      filename: block.callout.rich_text
        .map(({ plain_text }) => plain_text)
        .join(""),
      code: highlightedCode,
      language: block.children[0].code.language,
    };
  },
};
```

Notice there that we make use of highlight.js to process syntax highlighting on the code block. Notion doesn't give us this from the API response. But it's wise to do this work during this step so that we ship less JavaScript to the client. This way all we need on the front end is highlight.js's CSS file, but none of it's JavaScript.

As the comment notes above, the language values coming from Notion do not have one-to-one parity with highlight.js's expected language values. So you may need to build an additional mapper, which I did not do.

The output will look something like this:

```json
[
  {
    "id": "...",
    "title": "Page with Components",
    "urlPath": "page-with-components",
    "blocks": [
      {
        "component": "CodeBlock",
        "filename": "hello-world.js",
        "code": "<span class=\"hljs-keyword\">function</span> <span class=\"hljs-title function_\">helloWorld</span>(<span class=\"hljs-params\"></span>) {\n  <span class=\"hljs-variable language_\">console</span>.<span class=\"hljs-title function_\">log</span>(<span class=\"hljs-string\">&quot;Hello World&quot;</span>);\n}",
        "language": "javascript"
      }
    ]
]
```

## Example Project

[Here is an example project](https://github.com/seancdavis/notion-component-mapper/tree/main/04-transform-data) with the full script.

## Expanding on this Foundation

As you can probably see, this is a fairly big undertaking if you want to take something like this to a production application. And there are parts of it that are certainly brittle.

However, it's extremely powerful, and almost endlessly customizable to your needs.

We'll stop here, as we've already gone very deep, and it's enough to show the foundation that you would need to apply this to your site.

### Share Your Progress!

From here, you can take this approach and apply your opinions to build your own system. I'd love to hear from you. What did you build? How does this process hold up when scaling beyond a proof-of-concept to a real-world website?
