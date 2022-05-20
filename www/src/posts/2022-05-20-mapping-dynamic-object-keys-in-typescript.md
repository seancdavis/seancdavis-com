---
title: Mapping Dynamic Object Keys in TypeScript
description: >-
  Dynamic property maps are a super powerful paradigm in JavaScript, but they
  can be tricky to type correctly with TypeScript.
tags:
  - javascript
  - typescript
tweet: >-
  It’s taken a few tries over the years, but I’m finally adopting TypeScript and
  using it in most of my projects.


  This is a follow-up TS version of the dynamic property map post from
  yesterday.
image: /posts/220520/mapping-dynamic-object-keys-in-typescript-YnWxaVyk.png
seo:
  image: /posts/220520/mapping-dynamic-object-keys-in-typescript-uFDrKQSV--meta.png
---

A pattern I use on an almost daily basis is [dynamic property maps](https://www.seancdavis.com/posts/use-dynamic-property-maps-over-switch-case-statements/). It helps me avoid unnecessary if/else and switch/case statements.

But it’s a tricky scenario to get right with TypeScript. Consider the example from the [dynamic property map post](https://www.seancdavis.com/posts/use-dynamic-property-maps-over-switch-case-statements/):

```typescript
const buttonClassMap = {
  dark: "bg-black text-white",
  light: "bg-gray text-black",
};

const theme = "light";
buttonClassMap[Object.keys(buttonClassMap).includes(theme) ? theme : "dark"];
```

The beauty of TypeScript is that if `theme` is defined elsewhere in the code, we can ensure it’s the right type and not need to do this checking.

The problem is that it’s not as straightforward as it seems it should be. Let’s add a `Button` type with a `theme` property, and then assign our `theme` variable to that type. Something like this:

```typescript
type Button = {
  theme: "dark" | "light";
};

const buttonClassMap = {
  dark: "bg-black text-white",
  light: "bg-gray text-black",
};

const theme: Button["theme"] = "light";
buttonClassMap[theme ?? "dark"];
```

We’ve simplified the last line, and it _seems_ like we’re type-safe. But we’re not fully in the clear. I can add new properties to `buttonClassMap` without error:

```typescript
const buttonClassMap = {
  dark: "bg-black text-white",
  light: "bg-gray text-black",
  // We want this to throw a type error
  other: "...",
};
```

That means we have to type the `buttonClassMap`. We can do that by using [a mapped type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html):

```typescript
const buttonClassMap: { [K in Button["theme"]]: string } = {
  dark: "bg-black text-white",
  light: "bg-gray text-black",
  // Now this throws a type error
  other: "We do not want this to be allowed",
};
```

## Removing `null` or `undefined` Properties on Optional Types

Depending on your compiler options, you may see a type error if you make `theme` an optional type (by appending a `?` to the key).

{% post_image alt="", src="/uploads/220520/Untitled.png" %}

The way to solve this is to ensure that `K` can’t be `undefined`. We can fix that using the [Exclude](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)[ utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers).

```typescript
export type Button = {
  theme?: "dark" | "light";
};

const buttonClassMap: {
  [K in Exclude<Button["theme"], null | undefined>]: string;
} = {
  dark: "bg-black text-white",
  light: "bg-gray text-black",
};

const theme: Button["theme"] = "light";
buttonClassMap[theme ?? "dark"];
```

And now you should be free of TypeScript errors!

## When Map Properties are not Just Strings

If your map properties are objects or arrays instead of just strings, you can type them just like you would any other type. For example, suppose we wanted the background and text classes to be properties within an object, we could do something like this:

```typescript
const buttonClassMap: {
  [K in Exclude<Button["theme"], null | undefined>]: {
    bg: string;
    text: string;
  };
} = {
  dark: { bg: "black", text: "white" },
  light: { bg: "gray", text: "black" },
};
```
