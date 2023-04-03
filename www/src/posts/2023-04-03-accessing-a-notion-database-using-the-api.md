---
title: Accessing a Notion Database Using the API
description: >-
  Set up a Notion API integration, make a database connection, and write a
  Node.js script that retrieves an ID value for a Notion database from the API.
tags:
  - api
  - cms
  - notion
image: /posts/230403/accessing-a-notion-database-using-the-api-9IfwhDD8.png
seo:
  image: /posts/230403/accessing-a-notion-database-using-the-api-6OjVSyFH--meta.png
---

{% youtube_embed id="IggOH_2q3y8" %}

This is part of a four-part series on showing the potential of Notion as a CMS for complex websites:

1. [Using Notion Callouts to Generate Complex Components](/798f15a836a94c0dac9fedc51a3cc82e)
1. **Accessing a Notion Database Using the API**
1. [Write Notion Page and Block Data to JSON File with Node.js](/75e8127c9a50405e888b23132f893ecf)
1. [Transform Notion API Data into Component-Ready JSON](/4e4449e6cc524ddda5c6649f306ef945)

---

Working with a Notion database using the API is pretty straightforward once you get going. But there's some setup to get started.

## Create Notion Integration

Begin by going to [My Integrations](https://www.notion.so/my-integrations) and clicking _New Integration_.

{% post_image alt="", src="/uploads/230403/new-notion-integration.png" %}

Set the following information:

- Name
- Logo (optional)
- Choose the appropriate workspace
- Desired capabilities

{% callout type="note" %}
If you're following the four-part tutorial, we only need content capabilities. We will not be working with comments or users.
{% endcallout %}

## Make a Connection

With many APIs, this is enough to have the access you need. But with Notion, you have to make a connection between the integration and the database.

Here's how you create a connection:

1. Click the options menu **when viewing the database.**
1. Choose _Add Connections_.
1. Search or scroll for your connection, and confirm the choice.

{% post_image alt="", src="/uploads/230403/create-notion-connection.png" %}

## Find the Database ID

To be able to find and work with content in the database, you have to know the ID. This also isn't as simple as it seems like it might be. The ID doesn't come from the ID, but is an internal database ID that has to be retrieved through the API.

We'll write a Node.js script to help us.

### Install Dependencies

Let's install the Node SDK.

```txt
npm install @notionhq/client
```

### Get API Key

Your API key is listed on the integration detail page. You can get to each integration from [My Integrations](https://www.notion.so/my-integrations).

{% post_image alt="", src="/uploads/230403/notion-integration-secret.png" %}

{% callout type="warning" %}
Store sensitive values like this as [environment variables](/posts/wtf-is-environment-variable/). In the example below, I'm accessing this value via a `NOTION_API_KEY` environment variable.
{% endcallout %}

### Write the Script

To find the database, we have to use the `search` method.

Here is a basic snippet that uses a query passed when running the script. The script loops through all results and print the title and ID for each database returned from the search.

```js
const { Client } = require("@notionhq/client");

// Exit if no query is provided
const query = process.argv[2];
if (!query) {
  console.log("Please provide a query");
  process.exit(1);
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getDatabaseId() {
  const response = await notion.search({
    query,
    filter: { property: "object", value: "database" },
  });
  response.results.map((result) =>
    console.log(`${result.title[0].plain_text} -> ${result.id}`)
  );
}

getDatabaseId();
```

Running the script with a query matching the title of your database should produce at least one proper result. Assuming the script is called `index.js`, usage would look something like this:

```txt
> node index.js "My Database"

[My Database] xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx
[My Other Database] xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx
```

You can then use the proper ID to access pages, blocks, and more within the database.

### Example Code

[Here is a full example](https://github.com/seancdavis/notion-component-mapper/tree/main/02-get-database-id) similar to the script above, using [dotenv](https://www.npmjs.com/package/dotenv) to load the secret key.

---

If you're following the four-part series, move on to _Part 3_ to write a script that retrieves page and block content from Notion.
