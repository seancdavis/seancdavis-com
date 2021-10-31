---
title: 3 Reasons Why Turbolinks Is Not Worth The Effort
description: Turbolinks is a great idea in theory, but it comes with enough
  problems to offset its benefits.
tags:
  - javascript
  - ruby-on-rails
image: /blog/default/default-pink-01.png
---

I would assume, if you're reading this, that you're familiar with [Turbolinks](https://github.com/turbolinks/turbolinks-classic). If not, it's README explains it well:

> Turbolinks makes following links in your web application faster. Instead of letting the browser recompile the JavaScript and [CSS](/blog/wtf-is-css/) between each page change, it keeps the current page instance alive and replaces only the body (or parts of/) and the title in the head.

It's a great idea. You get to build your application using Rails, and Turbolinks works on its own to speed it up for you. It speeds things up because it doesn't need to load your stylesheets and javascripts on every page load.

Unfortunately, while good in theory, it's caused me several problems.

## 01: Lack Of A Clean, Global Scope

You have to pay very close attention to scoping because the JavaScript is not reloaded. This is explained well in [this article](https://plus.google.com/+YehudaKatz/posts/A65agXRynUn), specifically this section:

> ... a lot of existing JavaScript operates under the assumption of a clean scope, and a single `DOMContentLoaded` event. In a perfect world, popular JavaScript plugins would be architected to work well with a solution like Turbolinks, but the assumption of a clean global scope per server-rendered [HTML](/blog/wtf-is-html/) page is baked into a lot of the JavaScript and jQuery libraries that people tend to use.

Many libraries that we use won't consider compatibility with Turbolinks. In an ideal world, every library and plugin we use would consider scoping more carefully. But, frankly, it's not the responsibility of these various authors to consider compatibility with Turbolinks.

## 02: Duplicating Bound Events

Once again, because JavaScript is not reloaded, events are not unbound when the body is replaced. So, if you're using generic selectors to bind events, and you're binding those events on every Turbolinks page load, you could run into issues with the same event being bound multiple times. That often leads to undesirable behavior.

While paying close attention here can eliminate this problem, it's unnecessary to have to consider it when it wouldn't be a problem if the JavaScript was reloaded.

## 03: Complexity In Feature Specs

The biggest benefit of Turbolinks is supposedly that it speeds up applications. That makes sense, and most of the time that is the case. But it makes writing feature tests more difficult.

Because Turbolinks doesn't load a new page, [Capybara](https://github.com/jnicklas/capybara) will think clicking a link is the end of the request and will move on. This means every time you click a link in a feature test you have to make sure you're waiting for the ajax to finish loading before writing the next line in the spec.

While Turbolinks may speed up page loads, it makes writing feature tests more aruduous. And I've found it leads to unexpected and inconsistent results.

---

I now always remove Turbolinks from my Rails projects. I focus on optimizing my queries. And if I really needed to speed things up with JavaScript, I'd consider using an MVC framework to write a [single-page application](https://en.wikipedia.org/wiki/Single-page_application). But, personally, I have no problem with standard HTTP requests for web applications.
