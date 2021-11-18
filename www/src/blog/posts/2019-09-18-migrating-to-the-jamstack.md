---
title: Migrating to the Jamstack
description: Migrating to the Jamstack is easier than you would think. Ample's Sean C. Davis outlines how to do it one page at a time.
tags:
  - jamstack
image: /blog/190918/190918--migrating-to-jamstack.png
canonical_url: https://www.ample.co/blog/migrating-to-the-jamstack
---

I understand you've heard of [the Jamstack](/blog/wtf-is-jamstack/). You've read about [its game-changing benefits](https://www.ample.co/blog/top-4-reasons-we-use-jamstack). And now you're interested in rebuilding your company's massive website using Jamstack methodologies.

That's awesome!

Except, there's one problem:

You're never going to be able to sell that to your boss. It's not that you're not a good salesperson — you are, _probably_. It's that this is a really difficult sale. Sure, the boss would love to have your company's website blazing fast, ridiculously secure, super easy to scale, and packed with endless amounts of fun for developers. But at what cost?

Your site has hundreds (or maybe _thousands_) of pages. It has payment processing, user data collection, an intricate Google Maps feature that no one uses, email notifications, user authentication, etc. And if we are to build this new site with the Jamstack, every one of these pieces must be broken out into its own microservice(s). And then you'll have to figure out how to gather that back-end data and present it in the most beautiful way imaginable using some sort of [static site generator](https://www.staticgen.com/).

And you've done this sort of thing before — rebuilding a website from scratch — haven't you? You remember it because you're scarred from it. It took _years_ to complete. It cost hundreds of thousands of dollars (or was it millions?). It was great when you (finally) launched it, but maintaining it has been a total disaster since then, because you're now realizing that one person that said Drupal was a good idea was the most wrong.

To go through all of that again, just a year or two later, is just not going to work. Your boss and their boss and their boss and their boss...none of them are going to buy it (bosses can be scarred, too).

But what if you didn't have to build the whole thing at one time as a single project? What if you could migrate to the Jamstack immediately and later rebuild the site one page at a time?

If that were possible, you could take your time breaking up that monolithic application into a [microservices back-end](https://en.wikipedia.org/wiki/Microservices) and a [micro front-end](https://micro-frontends.org/). You could follow the [separation of concerns principle](https://en.wikipedia.org/wiki/Separation_of_concerns) and end up with a suite of applications that all do one thing really well.

Yeah, depending on the size and complexity of your site, that whole process might take years. And yeah, it might cost millions. But, you can sell it just as you can build it — one piece at a time.

By making use of a [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy) (via your web server or hosting provider), this process is quite simple. It goes like this:

1.  Identify a web server or hosting provider for your new site.
2.  Add proxy rules to point your domain to your current site (you know, the Drupal site).
3.  Point your DNS records to your new web server.

That's it!

No, seriously. That's it.

<a href="https://uploads-ssl.webflow.com/5a2e8a9f7cc425000195064c/5d7fdd7bec93d26a81de3df7_ample-blog-migrating-to-the-jamstack-page.pdf">
  {% post_image
      src="/blog/190918/5d7fddb2a7e61893bcab60c4_ample-blog-migrating-to-the-jamstack-page.png",
      alt="Migrating to the JAMstack (presentation slide)" %}
</a>

If it sounds weird and crazy, it kind of is. If you follow those three, quick steps, you will have moved your site to Netlify without actually moving any pages. Instead, all requests coming into the site are routed (i.e. _proxied_) through Netlify and back to your monolithic application.

But, the beauty of starting with these three steps is that they prepare you to rebuild your site one page at a time (i.e. to gradually migrate to the Jamstack). All you have to do is add your first page to the Netlify project and then remove the proxy rule. _Voila!_ Requests for that page would then be served by Netlify, while the remaining requests would continue to be proxied back to the old application.

Every other page on the site can follow the same exact pattern. This enables you to create smaller batches of projects and sell them up the chain individually, with smaller budgets and shorter timelines!

Rebuilding a website — no matter the size — can be time-consuming, expensive, and complicated. The process of gradually moving to the Jamstack will enable you to reap its benefits — security, scale, performance, developer experience — at a lower cost and with shorter timelines. That means you and your 14 bosses get the most important pieces into production faster, enabling you to understand users' behavior earlier, which ultimately leads to spending your money on the features that will bring your company the most value.

So while your competitor gets ready to launch the website they've been developing for three years, you can get rolling on the Jamstack within hours.

Why wait?
