---
title: Handling routes in JavaScript projects
description: >-
  JavaScript frameworks that use file-based routing require an extra layer of
  care to help you keep your sanity when developing.
tags:
  - javascript
image: /posts/250509/handling-routes-in-javascript-projects-s3jxJwKJ.png
seo:
  image: /posts/250509/handling-routes-in-javascript-projects-RTY1CEAF--meta.png
---

Many modern JavaScript frameworks use file-based routing but do not provide a system for referring to a route beyond the `href` value in a link component. One of the first things I abstract in any new project is how I configure these values.

There are three reasons I do this:

- **Typos:** Any time you have to use the same hard-coded value referring to the same thing in code, you run the risk of making a silly typo mistake. These can be tricky to locate and are easy to avoid.
- **Refactoring:** Without a system for routes, every URL path is hard-coded, and any change to your project's structure can be a massive headache, even in small projects.
- **Dynamic routes:** And with more advanced projects, you'll need dynamic routes, which means more than simple hard-coded strings. You'll be better off with a system for defining these routes. (Also making refactoring significantly more difficult.)

## Routes as constants

I like to start this process with a simple solution, especially when I'm not yet confident in how the project will evolve. I have [a single ](/posts/abstract-hard-coded-values-in-your-code/)[constants.ts](/posts/abstract-hard-coded-values-in-your-code/)[ file](/posts/abstract-hard-coded-values-in-your-code/) somewhere in the project's source directory. I import that file into my template and use the values as needed.

For example, here's a constants file:

`src/constants.ts` {.filename}

```ts
export const ROUTES = {
  root: "/",
  dashboard: "/dashboard",
};
```

And then I'll import and use the routes in a page or component. Here's an example in an Astro component:

`src/components/Header.astro` {.filename}

{% raw %}

```html
---
import { ROUTES } from '@constants'
---

<!-- ... -->
<a href="{{ ROUTES.dashboard }}">Dashboard</a>
```

{% endraw %}

### Using TypeScript for consistency

At this point, keeping the routes object consistent seems easy, but TypeScript gives us a little extra insurance:

`src/constants.ts` {.filename}

```ts
type RoutesConfig = Record<string, string>;

export const ROUTES: RoutesConfig = {
  root: "/",
  dashboard: "/dashboard",
};
```

You can get more strict than this, but it's a good place to start.

## Using functions for dynamic routes

Eventually, you'll need to introduce dynamic routes. When that happens, you could design your `ROUTES` object in several ways. Choose whichever feels like the best pattern for your project, based on the amount of structure and strict typing you prefer.

### All routes as functions

The loosest—but most consistent—way to do this is to make every route a function with a flexible number of arguments.

`src/constants.ts` {.filename}

```ts
type RoutesConfig = Record<string, (...args: string[]) => string>;

export const ROUTES: RoutesConfig = {
  root: () => "/",
  dashboard: () => "/dashboard",
  user: (id: string) => `/user/${id}`,
};
```

In this case, you're always calling a function to have a route string returned, whether or not the route is dynamic.

`src/components/Header.astro` {.filename}

{% raw %}

```html
---
import { ROUTES } from '@constants'

const userId = await getCurrentUser()
---

<!-- ... -->
<a href="{{ ROUTES.dashboard() }}">Dashboard</a>
<a href="{{ ROUTES.users(userId) }}">My Profile</a>
```

{% endraw %}

### Structure routes by type

As your app gets more complex, the list of properties in the `ROUTES` object will grow long, and the `RoutesConfig` type may become difficult to manage.

To help with this, you can begin grouping your routes in a way that helps you manage them. One approach is to group by the route type, which gives you a way to more strongly type those routes within that type. Here's an example:

`src/constants.ts` {.filename}

```ts
type RoutesConfig = {
  static: Record<string, string>;
  view: Record<string, (param1: string) => string>;
  edit: Record<string, (param1: string) => string>;
  create: Record<string, string>;
};

export const ROUTES: RoutesConfig = {
  static: {
    root: "/",
    dashboard: "/dashboard",
  },
  view: {
    user: (id: string) => `/users/${id}`,
  },
  edit: {
    user: (id: string) => `/users/${id}/edit`,
  },
  create: {
    user: "/users/create",
  },
};
```

Or perhaps you'd choose to have repeatable groups that forced you into a consistent combination of CRUD operations.

`src/constants.ts` {.filename}

```js
type RouteGroup = {
  view: (param1: string) => string,
  edit: (param1: string) => string,
  create: string,
};

type RoutesConfig = {
  static: Record<string, string>,
  users: RouteGroup,
};

export const ROUTES: RoutesConfig = {
  static: {
    root: "/",
    dashboard: "/dashboard",
  },
  users: {
    view: (id: string) => `/users/${id}`,
    edit: (id: string) => `/users/${id}/edit`,
    create: "/users/create",
  },
};
```

## Pick the patterns that work best for you

The right decision is choosing what works best for you and your project, which may differ from project to project.

As the project grows in complexity, you'll need to flex your system to accommodate. But as long as you have a solid base from where you've started, you'll find something that works for you. The key is starting here to establish a consistent way of working and to remove hard-coded route values from your views and API functions.
