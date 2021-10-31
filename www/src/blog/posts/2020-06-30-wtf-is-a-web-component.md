---
title: WTF is a Web Component?
description: What are components? What makes them different from (or similar to)
  HTML elements? How are they being used today? Let's find out.
tags:
  - components
  - wtf
image: /blog/default/default-blue-02.png
---

We throw the term _component_ around a lot these days, but what does it really mean?

If we go by the textbook definition, a component is one piece of a larger system.

When it comes to [HTML](/blog/wtf-is-html/) pages, we call its pieces _elements_. They are represented by tags that make up the page, like a paragraph (`<p>`), bulleted list (`<ul>`), or quote (`<blockquote>`). HTML elements can also be made up of other elements. For example, a footer (`<footer>`) would likely have a collection of elements inside it.

While outside the context of web development, the terms `element` and `component` can be used interchangeably, within the web dev world, they tend to have exclusive meanings. An _element_, as mentioned above, is a basic building block with a goal of being supported by all browsers. It could be considered _native_ to or a first-class citizens of the HTML language.

But these basic building blocks tend to not do much on their own. They're just building blocks, after all. Putting a useful and visually-appealing web page together means adding some customization through [CSS](/blog/wtf-is-css/) and [JavaScript](/blog/wtf-is-javascript/).

Those customizations are often meant to be reused. Consider a card. There is no `<card>` element in HTML, but many web projects these days have cards littered throughout. Or even consider something that is already an HTML element, like a `<button>`, but within your project, you want to add styling with CSS and interactivity with JavaScript, and you want that behavior to persist throughout the site.

That's where [_web components_](https://developer.mozilla.org/en-US/docs/Web/Web_Components) come into play. And thus, **a web component is a reusable set of HTML, CSS, and JavaScript code that can be registered and then added to an HTML page**. That means I could write the HTML, CSS, and JavaScript I need to render a card on the page, and then I could use a `<card>` tag like I could for any native HTML element.

Perhaps the biggest benefit of a web component is that it is encapsulated in its own space, called the _shadow DOM_, such that any styling and functionality (CSS and JS) applied in that space can't bleed out and interfere with other components.

One of the biggest struggles with web components is that it's been a long road to get all browsers to agree on a standard approach. The reason the term _component_ is thrown around so much is because most of the time we're not actually talking about official _web components_.

Developers didn't want to wait for web browsers to adopt a standard approach to web components, so they built a workaround. Frameworks like [React](/blog/wtf-is-react/) and [Vue](https://vuejs.org/) use the concept of _components_ to make it _feel_ like we're working with components without actually using web components. And that makes sense, as we want the code we write to work in as many browsers as possible. But, there are also libraries like [Stencil](https://stenciljs.com/), which do render actual HTML components in the browsers that support it, while relying on a polyfill for those that don't.

With most front-end frameworks moving more in the direction of components, it seems as though they are going to be around for awhile. So, while it's important to understand the basics of HTML and CSS, most front-end developers are likely to end up working with the concept of components in some capacity.

If you want to learn more about components, consider:

- [Reading technical documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
- Looking into a library, like [Stencil](https://stenciljs.com/) or [Polymer](https://www.polymer-project.org/), which work with native web components.
- Diving into front-end frameworks, like [React](https://reactjs.org/) or [Vue.js](https://vuejs.org/), which use the concept of components.
