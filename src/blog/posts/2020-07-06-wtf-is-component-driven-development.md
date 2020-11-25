---
title: "WTF is Component-Driven Development?"
description: "If the web is organized by pages, shouldn't we build it that way? Introducing component-driven design and development, explained through the lens of the evolution of the web."
tags:
  - components
  - wtf
---

The web is organized by pages.

When you open a browser and ask Jeeves some life advice, and Jeeves gives you a website to visit, you ultimately land on a web _page_, right?

Right. It makes sense, then, that when we think about _building_ a website we think of organizing it by pages, because that's how the web works. So that's what we (_we_ being the generic developer) did in the early days. Every web page was an [HTML](/blog/wtf-is-html/) file, and most were built manually, one at a time.

Efficient?

_Not at all._

It's inefficient to design and build every page separately, especially when most sites typically have groups of pages, or _page types_. For example, a blog site may have some unique pages, but mostly be made up of posts. And those posts may all look similar to one another.

So then we moved on to this idea of _templating_ pages. We began to abstract and store content in databases via content management systems, like [WordPress](https://wordpress.org/). We could pull the content out of the database, run it through a template, and send the resulting HTML to the browser. In this case, the developer(s) only had to build the template once, but that template could serve hundreds or thousands of pages.

Efficient?

_We're getting there._

Even in building a website template-by-template, there may be elements that could be shared across templates. Consider something as simple as a button. They are all over the place on most websites, often appearing on different types of pages, perhaps with a slight variation in size or color here or there.

Welcome _components_ to our lives. We began creating reusable bits of code, often called _partials_ or _includes_, which we could stick into templates as needed. Those partials typically used [CSS](/blog/wtf-is-css/) selectors that would give them a specific style, and maybe even some interactivity with [JavaScript](/blog/wtf-is-javascript/).

This idea was followed in short succession by CSS frameworks, like [Bootstrap](https://getbootstrap.com/). CSS frameworks provided the means to enforce consistency of styling and functionality for commonly-used components like buttons, navigation, or alerts.

The [first version of Bootstrap](https://getbootstrap.com/1.0.0/) (2011) didn't call what it was providing _components_, although that's exactly what they were. [2.0 did](https://getbootstrap.com/2.0.0/components.html), shipping right on the heels of its predecessor in early 2012.

Okay, now we're working efficiently?

_Almost._

Although this approach had us building websites using components, we were still _thinking_ about a site in terms of templates. If a template needed to adjust a core component in some way, it was no big deal. We just wrote a little CSS or JS to add that unique functionality.

The problem was, because this _could_ happen all over a website, it _did_ happen. So when it came time to add or change some core functionality to a component, it often meant touching every customization, which could mean just a few instances across a single project, or it could mean hundreds or places across dozens of projects. (It's true, I've been there.)

Add to that challenge that CSS and JS were still just floating around in this global space. Styles could easily bleed from a template into its components. That meant that using a component in one template might look completely different than when it was used in another component, even if not intentional.

That's where _component-driven development_ came to our rescue. _Component-driven_ implies that we're _thinking_ about a website in terms of components. It means the components are the foundation for building a website, not the templates. We could (and _should_) still have templates, because that's ultimately how we organize pages. But a template should be made up of components, usually **without manipulating them**. In other words, the component is in control when it is used. It brings its own (scoped) styles and interactivity, and it controls variations in appearance or function through the use of _properties_.

Efficient?

_Yes, but ..._

Component-driven development has to be disciplined and focused to be successful. The website or application has to be architected diligently and consistently. But it's not just how we build a site that matters.

This attitude must start in the design phase of a project, using what we (appropriately) call _component-driven design_. The designers and developers must be in sync if we're going to get the most out of this approach. A development team can put together a site using components all they want, but if the designers are still bringing in a unique version of a button on every new template, then the use of components will be more trouble than it is worth.

We see success in this approach when designers and developers work together, thinking of a web project from the ground up, _starting with components_. If together we build a _system_ before we think about building individuals templates, then we will realize the benefits of the component-drive approach. Then we will be ...

Efficient.
