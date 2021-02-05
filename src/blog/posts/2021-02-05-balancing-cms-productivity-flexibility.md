---
title: "Balancing Flexibility and Productivity in Your CMS"
description: "Help your content editors enjoy their CMS experience by designing a content schema that balances productivity and flexibility."
image: /blog/210205/productivity-vs-flexibility--meta.png
attribution:
  - name: balance by Bieu Tuong from the Noun Project
    url: https://thenounproject.com/search/?q=balance&i=2032274
    license: Creative Commons CCBY
  - name: flexibility by Tomasz Pasternak from the Noun Project
    url: https://thenounproject.com/search/?q=flexible&i=1116121
    license: Creative Commons CCBY
  - name: Graph by Vectorstall from the Noun Project
    url: https://thenounproject.com/search/?q=graph&i=3714812
    license: Creative Commons CCBY
tags:
  - cms
  - components
  - jamstack
---

In the exciting world that is [_The Jamstack_](/blog/wtf-is-jamstack), even after choosing which [headless CMS](/blog/wtf-is-headless-cms) to use on a project, there's still a blank slate before you. The beauty (and curse) of _most_ headless CMS products is that they don't make assumptions about what you want to do with your content. So it's up to you to structure it. And that structure is a _big_ part of making or breaking the experience for your content editors.

I often say that designing an optimal content management experience comes from finding a balance between flexibility and productivity. These things — flexibility and productivity — tend to act as the inverse of each other. The more flexible a CMS experience is, the longer it takes to create and edit content.

What I want to explore with you here today are a few questions that will help you find that perfect balance in your project:

1. What makes content flexible?
2. When is it appropriate to sacrifice productivity for flexibility?
3. How do we find the right balance?

Let's try to answer these questions ...

## Content-First vs Component-First

What makes content flexible is the degree to which the fields in the CMS map to some specific location, function, and appearance on the page. More flexibility means that the content editors have more control.

With most headless CMSs today, it's up to you to choose that degree of flexibility. That degree ranges from completely structured and rigid (minimal flexibility) to loose and configurable (maximum flexibility). At [Ample](https://www.ample.co/) we also used the ends of this spectrum _component-first_ when referring to more flexibility, and _content-first_ when referring to more structure and (usually) productivity.

Generally speaking, it works like this:

{% post_image
    src="/blog/210205/flexible-vs-structured-diagram.png",
    alt="Diagram: Flexible vs Structured Page Design",
    classes="mb-4" %}

A structured (content-first) design maps fields to specific places on a page. Looking at the example above, you can see we have four fields

- Jumbotron
- Heading
- Body
- Cards

The front-end code would target each of these fields specifically, and render the appropriate content on the site in a pre-determined location with pre-determined functionality.

Contrast this with a more flexible (component-first) approach to content modeling. When I've used a more flexible approach, I tend to have a smaller number of fields with more options for the content editors. [Here's how I accomplished this at Ample](https://www.ample.co/blog/the-perfectly-flexible-page-building-experience) with what I called _The Flexible Page Model_.

### Structured Pages and Templates

Because structured pages have a shape that is already defined, they can be easily templated. For example, you could have a _Blog Post_ template or a _Product_ template. Each of those pages would have their own model in your CMS. This is where the productivity really takes shape.

Technically you can have a _Flexible Page_ template. (That's kind of what we did at Ample.) But a Flexible Page template is more like a system that maps content in the CMS to components or _partial_ templates in the code. That's great for code reusability, but it's tedious for editors to create pages in that way.

### Is there a middle ground?

Of course! You could have a page in which _some_ of the page is pre-determined and structured, while another part is wide open and flexible. More on this below.

## Sacrificing Productivity

Arguably, the most productive way to work is to have a template for every type of page a content editor wants to create. Unfortunately, it takes design and development time to build those templates. So, even though it's more productive for content editors, it may not be in the best interest of the project to build a unique template for every different page.

And you don't just have to consider the cost of design and development. Most headless CMS providers value their product on the amount of content you use, including the number of models (content types). If you create a template for every unique type of page, you'll very likely run up the bill on the CMS pretty quickly.

I usually think about this in terms of [_Continuous Abstraction_](https://www.thepolymathlab.com/introducing-continuous-abstraction). If I only have to build a page one time, then I probably shouldn't spend the time to create a template to serve that page. That's a lot of design and dev time for little payoff to content editors. But if I have to build a similar page twice, I can probably assume I'm going to want to do that again, and it may be worth creating a template for it.

For that reason, I tend to end up with templates for page types like Blog Post, Product Detail, and not for pages like Contact, Team, etc.

## Finding the Perfect Balance

Using that approach to determining when to create a template has helped me find a good balance in designing a CMS experience. But it revolves around one primary idea:

> _Everything_ should be built on top of a flexible page.

The CMS should have support for a flexible page, such that your content editors are empowered to create pages of many different shapes, sizes, and styles.

But more importantly, your code should be built on top of the most flexible case. In other words, build a flexible page system in your code. And then use that system to create templates as needed. This is the approach we took with our [Gatsby Starter Kit](https://github.com/ample/gatsby-starter-ample) at Ample, and it's worked wonders.

If you start the other way around, it often becomes a mess. If you begin with specific templates, it's difficult to becomes more flexible. But if you start more flexibly, it's (usually) trivial to add more structure later.

### Get to Know Your Content Editors

I'll end by saying that there isn't a silver bullet here. While it's important that your code be able to support the flexible scenario, it may not make sense to pass that flexibility on to the editors.

It's a good idea to get to know your editors. Learn how they like to work. How technically savvy they are. How frustrated they get when there is some obscurity in the behavior of elements in the CMS.

The more you know your editors, the better equipped you're going to be to craft a CMS experience that is productive and that they enjoy using.
