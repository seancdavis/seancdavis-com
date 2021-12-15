---
title: Why Build Static Sites?
description: With all the tools at our disposal today, why would we waste our
  time building static sites? I'll give you four reasons.
tags:
  - jamstack
image: /posts/default/default-pink-03.png
---

There are so many tools at web developers' disposal today. There are [single-page app](https://en.wikipedia.org/wiki/Single-page_application) frameworks like [React](https://reactjs.org/), [Vue.js](https://vuejs.org/), and [Angular](https://angular.io/). There are full-stack frameworks like [Ruby on Rails](https://rubyonrails.org/) (Ruby), [Django](https://www.djangoproject.com/) (Python), and [Laravel](https://laravel.com/) (PHP). And those projects can be easily hosted with services [Heroku](https://www.heroku.com/) and [Digital Ocean](https://www.digitalocean.com/).

And yet, at the same time, there's this emergence of static site generators, and now there is an abundance of tools in this space, too, like [Middleman](https://middlemanapp.com/), [Gatsby](https://www.gatsbyjs.org/), and [Hugo](https://gohugo.io/).

But, why? Why build static sites when they can be dynamic? Why not just grab the data when users request it and show them what they've asked for?

There are four reasons for why static sites are relevant and super powerful in this ever-evolving landscape. But, before I get to those, I want to mention three points I find important to keep in mind when talking about website development with static site generators:

01: **_Static_ sites aren't really static.** When we use the term _static site_, all we're really saying is that what is served to the user is a set of static [HTML](/posts/wtf-is-html/), [CSS](/posts/wtf-is-css/), and JavaScript files (plus other media files/). They can be hosted on a CDN and delivered directly to the user without a database in between.

That doesn't mean the content was _created_ statically. What makes a static site a static site is a build process that can take any data set and transform it into a collection of files that can then be uploaded to a CDN. What happens before and during that build process is entirely up to the developers' imagination.

02: **Users don't care about your stack.** While it may be pretty cool in your inner circles to whip out your stack and slap it on the table, the fact is users just don't care about it. UI/UX aside, when a user visits your website, they care only about speed (security, too, although that's not top of mind until something goes wrong).

03: **The stack is for developers.** Because your users don't care about your stack, that means the stack isn't _for_ them. The final product (the experience and content) that is delivered to the user is what they care about. The stack itself is for your developers and only for your developers. What matters to users is what the stack delivers to those users.

With those points in mind, let's look at the four reasons why you should be building static sites:

1. Performance
2. Security
3. Scale
4. Developer Experience

## 01: Performance

With static sites, the only thing there is to deliver to a user is a set of static files holding content that has already been generated. That means there isn't any _need_ to have heavy processes getting in the way, including calls to a back-end database prior, to loading the page. The only thing to deliver is a set of static files, which can be "hosted" on a CDN, cached, and -- barring any goofy decisions by your developers -- delivered immediately to users.

And because this is just the front end, there are no CMS processes getting in the way of delivering the front-end content to your users -- those processes have been abstracted elsewhere.

## 02: Security

Because the site has already generated content from one or more databases (presumably via APIs), there's (often) nothing for users to hack into. The resulting site files that are delivered to users know absolutely nothing about the back-end CMS and its database and users.

## 03: Scale

Scale can be a really tough problem to account for. As projects grow, they become more complicated, and it can become a significant challenge to also keep them performing well. Fortunately for static sites, that complexity doesn't have to get passed on to the user. It doesn't matter if your site has 10 HTML files or 10 million HTML files. A user only asks for only one at a time. And the CDN handles delivering that file to that user.

The part of the process that is challenging to scale is the build process -- the part that _generates_ those 10 million HTML files. But that's for your developers to solve, and it's primarily for the benefit of the developers and your content editors, not the users.

## 04: Developer Experience

When you have a monolothic application with its own CMS back end and corresponding front end, any developer on your team is likely going to have to touch that project in some capacity. That means writing code in a specific programming language and potentially supporting features built years ago.

With static sites, building out the front can happen modularly, which means it can be built in chunks rather than as one big project. It also means all your developers don't have to understand the ins and outs of your complex back end, they just need to know how to obtain data from it and use that to mark up the front end using their desired language(s) and framework(s).

As a bonus, with the back and front ends being separated, the door opens for using third-party headless CMS providers like [Contentful](https://www.contentful.com/) or [Dato](https://www.datocms.com/), [leaving the inherent complexity of managing a CMS to external experts](/posts/four-key-factors-build-v-buy-software/).

---

While a static site is not the best tool for every project, they are much more powerful than the term _static site_ lead on. Given the benefits of performance, security, scale, and developer happiness, I encourage you to at least _consider_ using a static site generator to build your next website.

---

**Resources:**

_Note: The four primary benefits in this article were expanded from those coined by the creators of [the Jamstack methodology](https://jamstack.org/)._
