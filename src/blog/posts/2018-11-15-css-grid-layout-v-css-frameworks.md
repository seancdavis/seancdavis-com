---
title: CSS Grid Layout v CSS Frameworks
description: "Should you be using a CSS Framework to build your grid or should you use the native CSS Grid Layout?"
tags:
  - css
---

[CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) are a set of [CSS](/wtf-is-css) rules that can enable you to build out a grid in your site without the need for a framework. From MDN:

> Like tables, grid layout enables an author to align elements into columns and rows. However, many more layouts are either possible or easier with CSS grid than they were with tables. For example, a grid container's child elements could position themselves so they actually overlap and layer, similar to CSS positioned elements.

So, grid layout is inspired by the old-school table layout approach, while taking cues from CSS frameworks like [Bootstrap](https://getbootstrap.com/docs/4.1/layout/grid/) and [Foundation](https://foundation.zurb.com/sites/docs/grid.html). And [it's surprisingly well-supported](https://caniuse.com/#search=css%20grid).

The question is: _Should you be using the native CSS grid or a CSS framework to lay out the content of your site?_

Let's first look at the differences between grid layout and a framework and then we'll assess when you should use which one -- because, let's face it, you already know the answer of which one to use is: _It depends._

## CSS Frameworks v Grid Layout

Let's take a quick look at the actual difference in code to create a simple layout like this:

{% post_image alt="Grid Layout", src="/blog/181115/grid-layout.png" %}

### CSS Frameworks (e.g. Bootstrap)

Many CSS frameworks have a similar approach to their grid layouts, which is to wrap columns inside rows. If you've worked with one you probably know the structure well. Consider how you would build a grid with Bootstrap 4.1:

```html
<header class="row">
  <div class="col-sm-12">
    Header
  </div>
</header>
<div class="row">
  <main class="col-md-8">
    Main
  </main>
  <aside class="col-md-4">
    Sidebar
  </aside>
</div>
<footer class="row">
  <div class="col-sm-12">
    Footer
  </div>
</footer>
```

And there is some corresponding CSS to match the styles, but structurally it just works. [Here's a working demo](https://codepen.io/seancdavis/pen/GwmdrZ).

One major benefit is it's responsive right out of the box (notice the use of `.col-md-8` for the main content, which implies it should be full width on smaller screens.) The downside is we loaded all these supporting grid styles with Bootstrap and only used a small set of them.

### CSS Grid

Now let's accomplish this same thing with raw CSS (no framework). The markup:

```html
<div class="grid">
  <header>Header</header>
  <main>Main</main>
  <aside>Sidebar</aside>
  <footer>Footer</footer>
</div>
```

And the CSS (structural styles only):

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 150px 50px;
}

header,
footer {
  grid-column: span 3;
}

main {
  grid-column: span 2;
}

aside {
  grid-column: span 1;
}
```

[Here's the working demo](https://codepen.io/seancdavis/pen/oQWdoN) _(inspired from [this great Sitepoint article](https://www.sitepoint.com/css-grid-layout-vs-css-frameworks-debate/))_.

Notice here how much cleaner the markup is. The rows are implied through the markup structure -- there's no worrying about columns being within rows in the markup because the CSS rules build the layout for us with the markup that's already in place.

One caveat here is that it would take a little extra work to make this responsive like the Bootstrap example, but it's a quick media query that can easily be abstracted into a [Sass mixin](https://sass-lang.com/guide).

So ... which one is it?

## The Best Tool for the Job

To me, the answer is clear. The CSS Grid Layout has a bit of a learning curve to understand exactly how the rules work. But once that knowledge is in place I much prefer it over a framework, because:

- It's easier to not bloat CSS by bringing in an entire grid's worth of style rules when only a few are needed.
- It's supported well enough (with vendor prefixes) to cover the browser support of nearly any project that I'd work on.
- The structure of the markup is entirely up to me.

But, like I mentioned, the real answer is: _It depends_. I would use a CSS framework for my grid when:

- I'm already using a framework on my site. (Although, [should you be using a CSS framework in the first place?](/do-you-need-css-framework.html).)
- I need browser support across the globe in less developed areas. ([See this article on browser support](https://www.smashingmagazine.com/2017/11/css-grid-supporting-browsers-without-grid/).)
- The content structure of the site is dynamic. In other words, if your content editors are writing [HTML](/wtf-is-html), it's easier to use a framework because the the grid is (likely) already fleshed out and documented and can supported a wide array of layouts.

In all other cases, I'm going with the native CSS grid layout.

## What About Flexbox?

Yeah, what about Flexbox? Isn't that kind of like a grid? Sort of. [This article explains it well](https://medium.com/youstart-labs/beginners-guide-to-choose-between-css-grid-and-flexbox-783005dd2412) by summarizing:

- CSS grid is a two-dimensional system (rows _and_ columns), while flexbox works in a single direction (rows _or_ columns).
- CSS grid is about the layout, while flexbox is about the content.

Ultimately, flexbox is better suited for layouts _within_ components on a page, while the grid is better for laying out the sections on a page. Using the example from above, the page layout is best suited by using the grid, but flexbox may be of benefit _within_ one of the sections (header, footer, sidebar, etc.).

---

**References**

I've linked to several other articles throughout this article, but I think it's worth restating them (and adding a few) here. There is some good, focused reading on the topic if you want to go further with it.

- [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [The CSS Grid Layout vs CSS Frameworks Debate](https://www.sitepoint.com/css-grid-layout-vs-css-frameworks-debate/)
- [Why CSS Grid is better than Bootstrap for creating layouts](https://hackernoon.com/how-css-grid-beats-bootstrap-85d5881cf163)
- [Using CSS Grid: Supporting Browsers Without Grid](https://www.smashingmagazine.com/2017/11/css-grid-supporting-browsers-without-grid/)
- [Beginner’s Guide To CSS Grid And Flexbox](https://medium.com/youstart-labs/beginners-guide-to-choose-between-css-grid-and-flexbox-783005dd2412)
