---
title: Seamless Type Generation Increases Developer Productivity and Confidence
description: >-
  Discover an innovative way to integrate front-end types into back-end
  generation, simplifying content transformation and improving developer
  experience.
tags:
  - typescript
tweet: >-
  I’ve been tinkering with a prototype to make working with content easier for
  the average website. 


  One of my motivations is to make generated TS types actually useful to
  front-end code. What do you think of the current prototype design?
image: >-
  /posts/240222/seamless-type-generation-increases-developer-productivity-and-confidence-C_RSad8A.png
seo:
  image: >-
    /posts/240222/seamless-type-generation-increases-developer-productivity-and-confidence-jbHdd09A--meta.png
---

Tools that help developers work with content in composable websites often boast "automatic type generation" as one of their features. That sounds super convenient, right?

I query content in some way and then I have a type ready to go. I have an immediate confidence boost without writing runtime tests.

```ts
const post = await client.findOne("Post", "123");
```

If using an IDE like VS Code, you can inspect the return type of the query, which might be something like this:

```ts
type Post = {
  title: string;
  slug: string;
  content: string;
};
```

You get the benefits of typeahead properties and can inspect types for properties. For example, if you inspect `post.title` you might see something like:

```txt
(property) title: string
```

Again, this _seems_ great! And it does go a long way in speeding up the development process.

## The limitations of content source types generation

The problem is that the shape of content coming from the content source is often not exactly what we need for our front-end pages and components.

Take our post example. It has three properties that could be enough to build out a basic blog. But what if your front end also expects an `excerpt` property, which it can use when a card or snippet of the post is rendered?

Perhaps there is an optional `excerpt` property in the content source, but it's optional.

```ts
type Post = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
};
```

But your front-end `Card` component doesn't want it to be optional. And furthermore, it's a card, not a post, so it wants a properties called `heading` and `body`.

### A quick fix to transform content shapes for components

These are relatively quick transformations we can make.

```ts
function getPostCardProps(post: Post): CardProps {
  return {
    heading: post.title,
    body: document.excerpt || `${document.content?.slice(0, 100)}...`,
  };
}
```

Simple, right?

### Minimizing transformer logic calls in front-end code

But where do you put that code? Do you really want to call `getPostCardProps` on a `Post` object every time you need to render the post as a card?

That may work for small projects, but I've seen it get out of hand quickly.

All of a sudden an entire front-end codebase becomes littered with transformation utility function calls. Then there's the business of keeping transformation functions organized, which is another challenge.

### Transforming content when retrieving content

Another popular approach is to transform all the content when it is retrieved from the content source.

```ts
function transformPost(post: Post) {
  return {
    ...post,
    card: getPostCardProps(post),
  };
}
```

Then you'd have a nice packaged `card` property that has the props for the card. Great, except what's the return type here?

Now you need to manually define an intermediary type.

```ts
interface TransformedPost extends Post {
  card: CardProps;
}

function transformPost(post: Post): TransformedPost {
  return { ...post, card: getPostCardProps(post) };
}
```

It seems okay on a small scale like this, but it can quickly become cumbersome.

## Embedding front-end types in generated back-end types

I have an idea. I think we can have the same mechanism that loads content from the source be responsible for transforming the content _and_ generating type definitions that play nice with the front end.

It works like this:

- The schema for the content source is defined by code
- That schema definition includes the necessary transformation functions
- Transformation functions come with configuration to tell the mechanism what the return type should be
- The mechanism uses this information to do all the work.

### Prototype of the schema definition

The schema definition might look something like this:

```ts
import { type Post } from "@/path/to/generated-types.d";
import { definePageModel, defineStringField } from "my-mechanism";

export const PostModel = definePageModel<Post>({
  name: "Post",
  fields: [
    defineStringField("title", { required: true }),
    defineStringField("slug", { required: true }),
    defineStringField("excerpt"),
    defineStringField("content", { required: true }),
  ],
  methods: {
    card: {
      outputType: "Component.CardProps",
      async: true,
      resolve: async ({ sys: { document } }) => {
        return {
          heading: document.title,
          body: document.excerpt || document.content?.slice(0, 100) + "...",
        };
      },
    },
  },
});
```

Note that `Component.CardProps` would be included as an import to the generated types file through some configuration of the mechanism.

### A look at the generated TypeScript type definitions

The generated types might look something like this:

```ts
export interface Post extends Document<"Post", "card"> {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  card: DocumentMethod<Promise<Component.CardProps>>;
}
```

Where `Document` and `DocumentMethod` are utility types that come from the system and are prepped for adding system-level information when processing the sourced content.

### Working with generated types through the client

And then you'd call the client, and could use the returned object to get the card properties with the defined `CardProps` type:

```ts
const post = await client.findOne("Post", "123");
const card = await post.card(); // returns Component.CardProps
```

### Testing with a prototype: navigating the compile-time/runtime predicament

I've put together a prototype of this system, and after many iterations, actually have something working.

The most challenging part of the process is doing the dance between compile-time and runtime. It's still not the best developer experience, but it's been a really interesting problem to solve.

Take these two lines in the schema definition:

```ts
import { type Post } from "@/path/to/generated-types.d";

export const PostModel = definePageModel<Post>({
```

`Post` is generated by the system, but it's also used by the schema definition to provide a better DX through strongly-typed return types on dynamically-defined `methods`.

So, initially, when developing a method, the type doesn't have that method. But once the generator gets run once, it's there, and the experience improves.

### Eliminating the need for intermediary transformers

This removes the need for introducing an abundance of utility methods or the need for manually-defined and manipulated content source types.

### Could this be the future of working with content?

I'm pretty excited about where this could go, but ... is it just me? Would you use something like this? Share you thoughts with me! You can [find my links on GitHub](https://github.com/seancdavis).
