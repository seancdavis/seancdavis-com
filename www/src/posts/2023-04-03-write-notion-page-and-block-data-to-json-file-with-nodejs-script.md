---
title: Write Notion Page and Block Data to JSON File with Node.js Script
description: >-
  Write a Node.js script that connects to a Notion database and writes its page
  and block content to a local JSON file.
tags:
  - api
  - cms
  - javascript
  - node
  - notion
image: >-
  /posts/230403/write-notion-page-and-block-data-to-json-file-with-nodejs-script-UqlXJSZj.png
seo:
  image: >-
    /posts/230403/write-notion-page-and-block-data-to-json-file-with-nodejs-script-OTjvNIdV--meta.png
---

{% youtube_embed id="9JE1LYJFNMY" %}

This is part of a four-part series on showing the potential of Notion as a CMS for complex websites:

1. [Using Notion Callouts to Generate Complex Components](https://www.notion.so/Using-Notion-Callouts-to-Generate-Complex-Components-798f15a836a94c0dac9fedc51a3cc82e)
1. [Accessing a Notion Database Using the API](https://www.notion.so/Accessing-a-Notion-Database-Using-the-API-dd8daa7e418e45958427d673acd7d458)
1. **Write Notion Page and Block Data to JSON File with Node.js**
1. [Transform Notion API Data into Component-Ready JSON](https://www.notion.so/Transform-Notion-API-Data-into-Component-Ready-JSON-4e4449e6cc524ddda5c6649f306ef945)

---

We're going to write a Node.js script that fetches pages from a Notion database and writes the result to a JSON file.

Because block information is not included in the page list response, we'll adjust the script to fetch blocks for each page and store them in a `children` property on the page object, before writing the end result to a JSON file.

## Prerequisites

You'll need the following for this tutorial:

- A database with a few pages, where at least one of the pages has some content (a few blocks). If you don't have a database, [feel free to copy mine](/673a6770c83a43b5a050f3d99d5236b8?v=5336305ad601461ea06b9392b441f559).
- Notion integration with a connection established. This process is explained in the previous post in the series.
- The `id` property of the database from Notion's API. This is not retrievable from the database's URL. This process is also covered in the previous post.
- [Blank Node.js script](/posts/new-javascript-project-setup/) and a way to run the script.
- The secret token from the Notion integration and a way to store environment variables. If you don't have environment variables

## Setup Script

Make sure you have a blank file to add your script. Then there are just a couple other quick setup tasks.

### Install Dependencies

We're going to install the [Notion JavaScript SDK](https://www.npmjs.com/package/@notionhq/client) so that we can easily interact with their API.

```txt
npm install @notionhq/client
```

### Add Environment Variables

Add the following environment variables, which should be accessible by the script:

- `NOTION_DATABASE_ID`: The `id` property from the Notion database, retrieved via the API.
- `NOTION_API_KEY`: Secret token from the Notion integration,

## Retrieve Pages and Write to File

First, let's write a script that simply retrieves the pages from the database and writes them to a `notion-export.json` file in the same directory as the script.

```js
const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function importPages() {
  // Retrieve pages from the database.
  let { results: pages } = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  // TODO -> Attach blocks to pages

  // Write the result to file.
  const outputFile = path.join(__dirname, "notion-export.json");
  fs.writeFileSync(outputFile, JSON.stringify(pages, null, 2));
  console.log(`Wrote ${pages.length} pages to ${outputFile}`);
}

importPages();
```

After running the script, you should see a new `notion-export.json` file in the same directory as the script.

Open it up to inspect the results. Notice that it seems fairly sparse for how much information Notion likely has about a page. That will change when we add blocks to pages.

## Attach Blocks to Pages

The script that retrieves the pages likely ran super fast. It only hit the database a single time. But, for blocks within a page, we have to call the API for every page, and again for every block with children.

{% callout type="warning" %}
I recommend trying this on a small scale first. Use a database with a small number of pages, and pages with a small number of blocks. Your approach and code will likely have to change as your databases scale.
{% endcallout %}

Here's the full script:

```js
const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getBlocks(block_id) {
  let { results: children } = await notion.blocks.children.list({ block_id });
  for (const child of children) {
    const grandchildren = await getBlocks(child.id);
    child.children = grandchildren;
  }
  return children;
}

async function importPages() {
  // Retrieve pages from the database.
  let { results: pages } = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  // Attach blocks to pages
  for (const page of pages) {
    const blocks = await getBlocks(page.id);
    page.children = blocks;
  }

  // Write the result to file.
  const outputFile = path.join(__dirname, "notion-export.json");
  fs.writeFileSync(outputFile, JSON.stringify(pages, null, 2));
  console.log(`Wrote ${pages.length} pages to ${outputFile}`);
}

importPages();
```

Run it again and if your pages have blocks, you'll likely see a lot more content in the JSON file.

## Example Code

[Here is an example project with this code](https://github.com/seancdavis/notion-component-mapper/tree/main/03-export-page-data).

---

If you're following the four-part series, _Part 4_ is the next and final step of the process, which takes this raw content and transforms it into a more usable object.
