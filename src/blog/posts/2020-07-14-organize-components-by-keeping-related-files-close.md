---
title: Organize Components by Keeping Related Files Close
description: We've traditionally organized files by type. But that can make specific files difficult to track down, especially in an era dominated by component-driven development.
tags:
  - components
image: /blog/200714/component-based-organization.jpg
---

Web projects have traditionally been organized by page or template. But with the emergence of [component-driven development](/wtf-is-component-driven-development), we can now build sites with reusable and composable bits of code, or _components_.

## Template-Based File Structure

When web projects were organized by template, we tended to stay organized by keeping similar _types_ of files together.

{% post_image
    src="/blog/200714/template-based-organization.jpg",
    alt="Template-Based Organization" %}

The output of a project (i.e. a sitemap) might look something like this:

```
/
├── css/
│   └── main.css
├── js/
│   └── main.js
└── index.html
```

## Adding Build Processes

If using some view templating system, [CSS preprocessor](https://developer.mozilla.org/en-US/docs/Glossary/CSS_preprocessor), or [JS bundler](https://medium.com/@gimenete/how-javascript-bundlers-work-1fc0d0caf2da), the method for staying organized may look the same, but the project's structure will have more going on. Perhaps something like this:

```
src/
├── js
|   ├── features/
|   |   └── timer.js
|   ├── utilities/
|   |   └── do-the-thing.js
|   └── main.js
├── scss
|   ├── global/
|   |   ├── _base.scss
|   |   └── _typography.scss
|   ├── partials/
|   |   ├── _button.scss
|   |   └── _timer.scss
|   └── main.scss
└── index.njk
```

Sure, that's organized. The problem is that whenever you have to edit a feature, you may end up working in three (or more) different disparate.

## Component-Based File Structure

When we build websites with components, we have an opportunity to rethink how we're organizing the code within our site. Since a site is essentially made up of components, why not have components represent the file structure? You could bring all the necessary files related to a component together in one directory. That could include [HTML](/wtf-is-html), [CSS](/wtf-is-css), [JavaScript](/wtf-is-javascript), test files, mocked data, and documentation (and probably more).

{% post_image
    src="/blog/200714/component-based-organization.jpg",
    alt="Component-Based Organization" %}

In using a button and timer (like in the example above), a component-based file tree would look more like this:

```
src/
├── components
|   ├── button/
|   |   ├── button.js
|   |   ├── README.md
|   |   ├── styles.scss
|   |   └── test.spec.js
|   ├── timer/
|   |   ├── README.md
|   |   ├── styles.scss
|   |   ├── timer.js
|   |   └── test.spec.js
├── styles
|   └── global.scss
└── index.njk
```

In this case, everything we need for a button or a timer component are all right next to each other in the same directory. So if you need to make a change to the component, whether functional or stylistic, you know exactly where to go. It's all together.

(Notice that I even put README files in here, which could act a means for _documentation_ for the component, if necessary.)

### Nesting Components

One of the first holes poked in this approach is typically that it can get unwieldy quickly. Most projects don't have two components, but dozens or hundreds. And, on screen, components are often nested within components, so it can be difficult to find what you're looking for.

When it comes to structuring _files_, I try to stick as closely as possible to what we see on screen. _Shared components_ go directly into `src/components`, while components that are only used once, as a subcomponent, get nested in their parent's directory.

For example, consider that a header component could have a mobile nav component. It doesn't make a ton of sense to muddy up `src/components` with the mobile nav component, as it'd be unlikely to be used elsewhere. Instead, I tend to stick it inside the header component.

If a component is eventually shared among multiple parents, then I pull it out to the main directory.

That said, this also assumes the application code itself is well-organized. If you make a subcomponent every chance you get, the files are going to be unwieldy, regardless of how you structure the project.

### The Downside

One of the biggest drawback I've found with organizing a project by components is that there tends to be extra work when it comes to excluding files from the build output. We don't want test files or READMEs in the build. But if you solve it once and [build a convention](/increase-developer-efficiency-by-establishing-conventions), you can be consistent across projects and not worry about it once the process is in place.

---

I've found this to be a great approach to help drive consistency (read: _convention_). It has made it a breeze to move around large projects with many components.

How are you structuring your component-based projects? [Let me know](https://twitter.com/seancdavis29) so we can learn from each other!
