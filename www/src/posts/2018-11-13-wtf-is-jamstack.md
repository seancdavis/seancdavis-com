---
title: WTF is Jamstack?
description: This term "Jamstack" is becoming a buzzword among development
  communities. But what does it mean and why should you care about it?
tags:
  - jamstack
  - wtf
image: /posts/default/default-yellow-03.png
---

[Jamstack](https://jamstack.org/) is this new(ish) term gaining popularity among web development communities. In fact, the premier [Jamstack Conference](https://jamstackconf.com/) was held just last month (October 2018).

But what is Jamstack and why should you care about it?

## What is Jamstack?

The community website provides a one-sentence overview of Jamstack:

> Modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.

Right, so the "JAM" in Jamstack stands for **Javascript, APIs, and Markup.** WTF?

Yeah, well, the term is a little goofy. [Netlify](/posts/wtf-is-netlify/) co-founder [Matt Biilman](https://twitter.com/biilmann) has joked that he and a friend coined the acronym prior to knowing what it stood for. The part that tripped me up when I first learned about it was that **you don't actually need Javascript to follow the Jamstack approach.** _Yeah, so ..._ The first letter in the acronym is one of the least important parts of the entire philosophy.

Instead, I like to think about the Jamstack as being a philosophy that guides the production and distribution of dynamically-built static sites.

The term _static sites_ holds some implication that it's ... well, _static_ -- that you can't use a database and/or a content management system to power your content. But that's not true. Jamstack defines _when_ the a site retrieves dynamic content, not _how_ it is retrieved. And that is to say **all _dynamic_ tasks in a Jamstack site occur at build time**, not at runtime.

Using the community's best practices, this is the process for deploying a site using the Jamstack approach:

1. Make a change to the code locally.
2. Push the changes to GitHub.
3. GitHub webhook notifies a server to build the project.
4. Server pulls down the changes from GitHub.
5. Server builds the project.
6. Server uploads the [HTML](/posts/wtf-is-html/) files from the built project (along with any necessary assets/) to a CDN.
7. Server informs CDN to invalidate its cache.
8. Site is live.

When a visitor accesses your site they are delivered static files through a [content delivery network (CDN)](https://en.wikipedia.org/wiki/Content_delivery_network). There's no retrieving data through a database at run time because there is no runtime -- it's actually a static site. _But_, it doesn't have to _feel_ static because you have the ability to automate every step in the process, and you have have the freedom to do whatever you want at build time (e.g. using a CMS to build your pages).

## Why should you care?

Okay, so Jamstack really just a different way of building and delivering content to visitors. Why does it matter to you?

Because being able to deliver the same information to a visitor using static files is significantly simpler and has the following benefits:

- **Performance:** The site (meaning all the content) is already built when it is delivered to the visitor (via a static HTML file), so there's no waiting around for data.

- **Scale:** You don't lose runtime performance when your site scales because (again) you're simply delivering HTML files to the visitor. The CDN delivering those files doesn't care if there are 100 or 100,000. It delivers only what it's asked to, and that content is cached after being delivered the first time.

  The main scaling issue you'll have to deal with occurs at build time in considering how long it takes to run the build. But that's on you to solve for your own (or your client's) benefit -- it doesn't affect the end user because they only see the result of the build.

- **Security:** There's no way to get into your database because there is no database. When someone accesses your site all the dynamic content is long gone.

- **Developer Experience (DX):** In the absence of a monolithic application running on a web server, and with your dynamic data abstracted into API calls, your developers efforts are more focused. This means easier debugging and (potentially) quicker developing.

But that's not all ...

## The Best Part

The absolute best part of Jamstack is that it is a high-level methodology, not a formula dictation.

Think about what may seem like a synonym to Jamstack:

- **LAMP** stands for Linux, Apache, MySQL, and PHP (i.e. WordPress).
- **MEAN** stands for Mongo, Express, Angular, and Node.

So if you want to use PostgreSQL or React or Nginx you don't fit within one of these communities. But with Jamstack, it makes no difference which site generator, content source(s), build tool(s), build platform, or CDN you use. The community is being built around the practice, not the products.

## Getting Started

One problem with the high-level approach of Jamstack is that it can be a little intimidating to get started because there is no specific formula. Fortunately, there are some seriously great tools available.

The place to start is with [Netlify](https://netlify.com). The creators of Netlify are the ones who've coined the _Jamstack_ term. Netlify is super powerful and manages steps 3-8 of the deployment process outlined above. So all you have to worry about is:

- What site generator are you going to use? (Netlify has [a list](https://www.staticgen.com/) for you to reference.)
- Where is your data coming from (if you even have dynamic data)? (Netlify also has [a list](https://headlesscms.org/) of headless CMS products that integrate well.)

And you can use the powerful features of Netlify on its free tier, so it is absolutely worth a try.

---

I hope you have success trying out the Jamstack approach. I am a huge proponent of it and plan to litter this site with articles on it. So feel free to [drop me a line](https://twitter.com/seancdavis29) if you struggle to get started or have questions about the approach.
