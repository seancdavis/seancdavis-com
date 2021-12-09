---
title: The perfectly flexible page-building experience
description: We use a Flexible Page Model to find the sweet spot between flexibility and productivity for our content editors.
tags:
  - repost-ample
  - cms
image: /blog/210115/210115--flexible-page-building.png
canonical_url: https://www.ample.co/blog/the-perfectly-flexible-page-building-experience
---

One of the most difficult challenges in building websites for our clients is crafting a content editing experience that they will enjoy and use productively.

What that really means is finding a balance between flexibility and productivity. But that balance, that sweet spot, is difficult to find because it is a moving target. It's unique to the needs and abilities of each site's content editors.

Consider this...

At one end of the spectrum we have the super experienced content editor (i.e. a developer dressed in a content editor costume). We could give them a title field, the ability to set SEO meta values, and then a blank body field in which they could add HTML and CSS.

{% post_image
    src="/blog/210115/6001fd502d90f370db5d6da6_flexible-page-model--flexible.jpg",
    alt="Diagram: Website and CMS",
    flatten="true" %}

That's the ultimate flexibility for a CMS. But it also only works for those who know how to write code (and are willing to do so). And it's not efficient, as it means building every page largely from scratch.

On the other end of the spectrum we have the marketing newbie who has never used a content management system before, but has been tasked with managing the content of a site. In that case, the page fields should be specific. They should be more structured fields whose values map to specific areas on the screen.

{% post_image
    src="/blog/210115/6001fdd3b8cd6a304727c44d_flexible-page-model--structured.jpg",
    alt="Diagram: CMS content presented in a website",
    flatten="true" %}

If we cater each experience specifically to each client, then our clients would love us! Right? _Maybe_, but that's not an efficient way for us to work. We'd have to start our content modeling from scratch (more or less) for every project. It would feel like we're writing the same code over and over again. That's a lot of wasted time and money when we could be working smarter.

That's why we created the _Flexible Page Model_.

## Flexible Page Model

The foundation of the Flexible Page Model is not just  _flexibility_, but also the ability to author content and code _efficiently_. It's not enough to say a page has an open body for HTML, CSS, or JavaScript code. That's flexible, but not efficient.

We've found that it works better if we provide _some_ foundation (i.e. _structure_) on which to build pages flexibly _and_ quickly. Fortunately, many of the tools we use to build the front-end of websites today support working with _components_ — reusable elements that we can cobble together to compose a page.

Take a look at this section of a page:

{% post_image
    src="/blog/210115/5ffe10758056a67d955cb590_flexible-page-01a@2x.png",
    alt="A simple graphic of a webpage",
    flatten="true" %}

This page could be broken down into components, into _reusable pieces_. There's no right answer for how to do this, but here's one approach:

{% post_image
    src="/blog/210115/6001fe859fae4cf2d9b1a0e5_flexible-page-02b@2x.png",
    alt="Flexible Page",
    flatten="true" %}

The theory behind the Flexible Page Model is that by providing structure to reusable elements of a page (i.e. components), we can empower editors to craft flexible content without writing any code.

Great! But how?

## Implementing Flexible Pages in a CMS

Knowing what we want to accomplish within a CMS is a start, but being able to execute the approach with the features and tools at your disposal varies from product to product. This is where creativity and experimentation come into play.

Every CMS is different when it comes to implementing the Flexible Page Model. In general, though, I've seen it work best when an editor can, in some way, add components to a page. I can usually accomplish this by having one open-ended field in which editors can place or build components. I usually call the field _components_ (surprise!) or _blocks_.

Here's an example within [Contentful](https://www.contentful.com/):

{% post_image
    src="/blog/210115/6001fed7393730031c5c0745_flexible-page-model--contentful.png",
    alt="Screenshot from Contentful component blocks",
    flatten="true" %}

A similar approach in [Forestry](https://www.forestry.io/) ends looks similar, but behaves quite differently:

{% post_image
    src="/blog/210115/6001ff250501ba723bdf9371_flexible-page-model--forestry.png",
    alt="Screenshot from Forestry showing component blocks",
    flatten="true" %}

How those components are built is where the variation comes into play. That tends to be very specific to the choices made by the CMS. After testing on upwards of a dozen different CMS products, I've found that this tends to work best in one of two ways:

1.  Modular Content
2.  Associated Records

### Modular Content

Some content management systems, like [Forestry](https://www.forestry.io/) and [Dato](https://www.datocms.com/), support modular content. This means you can nest a series of fields within a particular model. While this can be limiting, when it works it's a great option.

I really like this approach because it can help avoid pricing tier limitations. Most CMS products use the _number of records_ and/or _models_ as a primary metric for determining the cost of using the product. With modular content, all the content related to one particular page is included with that page. One page is one record.

The biggest downside to this approach is that those products which support modular content often don't support _nesting_ modular fields within one another. And that's a common pattern when it comes to components, because components should be able to include other components. (e.g. In the example above, consider that the Carousel component would have subcomponents for the individual cards/slides.)

The other limitation is that this approach is not conducive to reusing the same component on more than one page.

### Associated Records

Most CMS products either don't support modular content or their approach to modular content is limiting enough that it won't solve all your problems. As mentioned above, if modular content only goes one level deep, it becomes difficult to build a page with any sort of depth.

When modular content doesn't work, the next best method is to create a record for each component and associate those component records with the page record. Let's play that out for a minute.

Say you were going to support adding a Carousel to your pages, and the Carousel supports and accepts Slide components. You'd have the following models:

- Page
- Carousel
- Slide

That means that if you have a page with a carousel that has three slides, you actually have five records in the CMS — one Page, one Carousel, three Slides.

This can become an expensive approach for CMS products that limit you on the number of records you're allowed to create within a given pricing tier. But it does enable you to share components across multiple pages, which is a plus.

### On the Front-End

The beauty of either of these approaches for building a Flexible Page Model in the CMS is that most front-end tooling today is component-driven. In other words, the Flexible Page Model is built for maximum parity between the CMS and the front-end.

The CMS should use a subset of components from your application code. That way, when you pull in the data to the front-end, you can perform a few minor transformations and then simply pass that data as properties onto the components.

## Adding Structured Pages to the Flexible Page Model

By using the Flexible Page Model and mapping the data structure to components, you have built a foundation for making your CMS experience both flexible and productive. That's a fantastic place to start.

But there are two potential problems with using flexible pages for every page on a site:

1.  Some pages don't need to be flexible.
2.  It's inefficient to build the same flexible page multiple times.

### Structured Pages

Most sites have several pages that don't need to be flexible. Consider a blog post. On most blog sites, post pages all function the same way. They have a title, a body, and maybe some meta information. And that information should be displayed with the same structure on every post.

For pages like this, it makes way more sense to be structured. That means, instead of having an open _components_ field in which editors can build components, you provide a series of fields that map directly to some part of the front-end.

When should you use structured pages? One indicator is when the content itself is structured. Think not just blog posts, but products, services, locations, etc. Groupings of _items_ that each require their own page on your site.

### Shared Layouts

The other use of structured pages comes in when you find yourself building and rebuilding the same layout multiple times. Even if the content doesn't _seem_ like it should be structured, it may make sense to do so.

For example, most of the sites I build often have some super simple pages that require only content in an open body area. I usually call this a Basic Page. It seems limiting, but it's much faster to build for content editors. And if they need something more flexible in the future, they can always fall back to the Flexible Page.

### Implementing Structured Pages

When it comes to implementing structured pages, that also depends on the CMS. I typically try to keep all pages together, but that doesn't always work out. In most cases, I end up creating a new model for every type of page.

My ideal scenario is that an editor would be able to choose the layout of the page and the selection of the layout would change the fields available. This is known as _conditional field rendering_. It's super powerful but tends to be pretty rare in modern CMS products. If the CMS you're working with supports conditional field rendering, it's worth looking into. It tends to lead to a more efficient editing process while also reducing the number of models your site will require.

That's it for an introduction to the Flexible Page Model we use as the foundation on which we build our sites today. We're always thinking about making it better. What thoughts do you have? How have you optimized your [content management](https://www.ample.co/content-marketing) experience for your editors? [Drop us a line](https://www.ample.co/contact).
