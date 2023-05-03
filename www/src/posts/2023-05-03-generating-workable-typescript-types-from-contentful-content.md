---
title: Generating Workable TypeScript Types from Contentful Content
description: >-
  Automatically generate TypeScript type definitions from a Contentful schema,
  and then override for front-end adjustments.
tags:
  - cms
  - contentful
  - javascript
  - typescript
tweet: >-
  I wanted to use TypeScript in a Contentful project recently and realized there
  isn’t a built-in method for generating type defs, but there are a number of
  libraries that can help.
image: >-
  /posts/230503/generating-workable-typescript-types-from-contentful-content-UW-EpXZE.png
seo:
  image: >-
    /posts/230503/generating-workable-typescript-types-from-contentful-content-BFNqGKU_--meta.png
---

{% youtube_embed id="TuRpE2sE-P0" %}

Contentful is a popular content management system that offers a JavaScript SDK for interacting with its APIs. While this library is fully typed, the content you retrieve from the database is not. Here's how I have handled generating types from Contentful content in previous projects.

## Example Project

For this example, we'll assume that you have a web project using some Node-based framework that is accessing content from Contentful.

### Project Setup

However, if you don't already have the necessary Contentful dependencies, install them:

```txt
npm install contentful contentful-cli
```

## Exporting Content

There are a number of libraries that will help us with this task. The one we're going to work with doesn't connect directly to Contentful, but works from Content exported from Contentful. The first thing we're going to do is export content from the space.

### Add Export Script

Add a `cf-export` script to your `package.json` file that run `contentful space export` based on configuration in an `export-config.json` file in the `contentful` directory (we'll create that soon), and using environment variables for your space and user values (we'll set those next).

`package.json` {.filename}

```json
{
  "scripts": {
    "cf-export": "contentful space export --config contentful/export-config.json --management-token $CONTENTFUL_ACCESS_TOKEN --space-id $CONTENTFUL_SPACE_ID"
  }
}
```

### Add Environment Variables

It's probably safe to assume that you have some mechanism for storing and loading environment variables in your project if you're using Contentful. We're going to use the following variables:

- `CONTENTFUL_SPACE_ID`: ID value for the space, which you can get from the URL or any API key page for that space.
- `CONTENTFUL_ACCESS_TOKEN`: This is your _personal_ access token, sometimes called a management token. It's specific to your user and is only shown when you create it.

### Create Export Configuration

Rather than make the export command super long, we can put the rest of our config in a separate file.

`contentful/export-config.json` {.filename}

```json
{
  "exportDir": "contentful",
  "contentFile": "export.json",
  "downloadAssets": false
}
```

Here, we're telling the export script to put the exported content in a `contentful` directory (alongside this configuration file), to call the export file `export.json` and to not download the assets.

### Run the Export

Now run the script!

```txt
npm run cf-export
```

You should see your `contentful` directory fill up with content. And most important, there should be an export file at `contentful/export.json` in your project.

## Generate Contentful Types

Now let's generate types from Contentful.

### Install dependencies

We're going to use [cf-content-types-generator](https://www.npmjs.com/package/cf-content-types-generator) for this example. This is what I chose after some brief research, but there are many others out there.

Install the package.

```txt
npm install -D cf-content-types-generator
```

### Add Generator Script

Add another entry into the `scripts` object for generating the TypeScript definitions from the `contentful/export.json` file.

`package.json` {.filename}

```json
{
  "scripts": {
    "cf-export": "contentful space export --config contentful/export-config.json --management-token $CONTENTFUL_ACCESS_TOKEN --space-id $CONTENTFUL_SPACE_ID",
    "cf-generate-types": "cf-content-types-generator contentful/export.json --out types/contentful"
  }
}
```

I chose to put these types in a `types/contentful` directory so they can stay in their own space. My only recommendation here is that you use a unique directory for these types because you'll want to regenerate them at some point, and it's nice to know everything in that directory was automatically-generated.

### Run the Generator Script

Now you can run the script!

```txt
npm run cf-generate-types
```

You should see a new `types/contentful` directory with all your type definitions.

### Type Structure

This library provides a type that uses types coming from the Contentful SDK. It also defines the field set for each model as a separate type and prefixes every type with `Type`.

Here's an example Example for a `page` model with a few fields.

`types/contentful/TypePage.ts` {.filename}

```ts
import * as Contentful from "contentful";
import { TypeHeadingFields } from "./TypeHeading";
import { TypeHeroFields } from "./TypeHero";
import { TypeImageFields } from "./TypeImage";
import { TypeParagraphFields } from "./TypeParagraph";

export interface TypePageFields {
  title: Contentful.EntryFields.Symbol;
  slug: Contentful.EntryFields.Symbol;
  sections?: Contentful.Entry<
    TypeHeadingFields | TypeHeroFields | TypeImageFields | TypeParagraphFields
  >[];
}

export type TypePage = Contentful.Entry<TypePageFields>;
```

## Extend Types for Your Needs

Having these auto-generated types is convenient with working with Contentful. However, in some cases, you're likely going to transform content in some way to make it workable for your front-end code.

For example, you may have a `slug` field for a `post` model that helps you build the URL, but it'd be much easier to transform that field into a `urlPath` property that added a `/posts` prefix and stored the path right on the post.

If you do that, you'll then have to adjust any other type referencing the post.

### Setting Up Project Types

To solve this problem, I assume that I'm going to have to transform every type in some way. Therefore, I don't use the auto-generated types directly. Instead, I extend every type in some place, and I only use those types in my project.

For this example, let's assume I put these types in a `types/index.ts` file. Here's how I might extend the `page` model.

`types/index.ts` {.filename}

```ts
import * as Contentful from "./contentful";

export type Page = Contentful.TypePageFields;
```

My front-end code would now use a `Page` type to work with a page from Contentful, and would never actually use the `TypePage` definition directly.

### Adding New Properties

Let's go with the example above and say we wanted to add a `urlPath` to the page model.

`types/index.ts` {.filename}

```ts
import * as Contentful from "./contentful";

export type Page = Contentful.TypePageFields & { urlPath: string };
```

When you transform this content, you could accept the type coming from Contentful, and output the new page type so that's what you work with in your front-end code. Here's an example of a utility function that your front-end code might use.

```ts
import { Page } from "@/types";
import { TypePageFields } from "@/types/contentful";

export function transformPage(ctflPage: TypePageFields): Page {
  // Do the transformation ...
}
```

{% callout type="note" %}
Note that the `@` is just a shorthand here as an example, which represents the root of the project.
{% endcallout %}

### Working with Shared Properties

Now, let's say you wanted to do a common transformation for all Contentful content. For example, maybe you add an `_id` property to each object to make it easy to access the Contentful entry ID.

`types/index.ts` {.filename}

```ts
import * as Contentful from "./contentful";

type MetaFields = {
  _id: string;
};

export type Page = Contentful.TypePageFields & MetaFields & { urlPath: string };
```

### Override Reference Properties

When a model references other models in Contentful, the generated reference types reference other generated types. So when you export the `Page` type shown above, TypeScript expects the `sections` field to be populated with other auto-generated types, which wouldn't be those types making use of the `MetaFields` shared property.

One way to get around this is to omit the field when bringing it in. And then redefining that field using types you've defined.

`types/index.ts` {.filename}

```ts
import * as Contentful from "./contentful";

export type Image = Contentful.TypeImageFields;
export type Paragraph = Contentful.TypeParagraphFields;

export type Page = Omit<Contentful.TypePageFields, "sections"> & {
  sections?: Array<Image | Paragraph>;
};

const paragraph: Paragraph = {
  body: "...",
};

const page: Page = {
  sections: [paragraph],
  // ...
};
```

### Creating Generic Types

In one last example, let's say that you have a few models that represent page types, and both should have a `urlPath` field on them. It might be easier to share these properties so you only have to type them once.

You can use a generic type for this — `PageLayout` in the example below.

`types/index.ts` {.filename}

```ts
import * as Contentful from "./contentful";

type MetaFields = {
  _id: string;
};

type PageLayout<ContentfulFields> = ContentfulFields &
  MetaFields & { urlPath: string };

export type Page = PageLayout<Contentful.TypePageFields>;
export type Post = PageLayout<Contentful.TypePostFields>;
```

That should give you a basis for how you can automatically generate TypeScript type definitions from Contentful content, and then build on those to make working with content from Contentful safer and easier.
