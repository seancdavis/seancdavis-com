---
title: Streamline Your CSS with Sass
tags:
  - css
  - sass
description: I began using Sass yesterday and I am already in love.
image: /posts/default/default-orange-02.png
---

I began using [Sass](http://sass-lang.com/) yesterday and I am already in love. You can very quickly and easily streamline your CSS with Sass.

## So what is it?

Well, you can read their site to find out more, but I've found these three main benefits: - CSS is more organized and readable - CSS becomes much more reusable - Writing code is more efficient

## Organization

CSS files can get super long and muddy. Think about building a dynamic menu. You're going to have classes like this:

```css
.main-menu {
  /* styles */
}

.main-menu ul {
  /* styles */
}

.main-menu ul li {
  /* styles */
}

.main-menu li {
  /* styles */
}

.main-menu li a {
  /* styles */
}
```

With Sass, you would write it like this:

```scss
.main-menu {
  /* styles */
  ul {
    /* styles */
    li {
      /* styles */
    }
  }
  li {
    /* styles */
    a {
      /* styles */
    }
  }
}
```

To me, nested styles just make sense. And this code is so much easier to read.

## Reusability & Efficiency

If you're building a website, whether it's a theme for an existing platform or a custom content management system, most of your server-side and client-side code is reusable. So when you go to build your next site, you have much of the code already in place, except the CSS. The ability to use variables and functions in Sass makes globally changing your CSS a walk in the park.

## It's Not CoffeeScript

Let me be clear about one thing. You aren't learning a new syntax. You aren't learning a new way to write CSS. This is absolutely worth the 30 minutes it takes to know how to use it. You won't be looking up syntax after the first time you use it. You're just writing CSS; it just has a few more features.

So what are you waiting for? Go use it!
