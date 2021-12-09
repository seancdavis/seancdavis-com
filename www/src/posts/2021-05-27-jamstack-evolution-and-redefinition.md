---
title: The Evolution and Redefinition of The Jamstack
description: "The Jamstack was a revolution. Which led to an evolution. Now it's time to look at what changed and decide what Jamstack means today."
image: /blog/210527/yellow--jamstack-evolution.png
tags:
  - jamstack
---

When I wrote [WTF is Jamstack](/blog/wtf-is-jamstack/) back in 2018 — before the Jamstack was a mainstream way to build websites — "Jamstack" was still written like "JAMstack" and treated as an acronym.

> _JavaScripts_, _APIs_, and _Markup_.

WTF?

Acronyms are often meant to be self-defining, which made "JAMstack" particularly difficult to understand, because:

1. You didn't _need_ JavaScript or APIs to build a JAMstack site.
2. It's not a stack. It's a foundational set of best practices on which you should build and deploy websites using any number of tools and services.

In other words, the "JAM" part wasn't a requirement and it's not really a "stack."

What "JAMstack" was (in the early days) was a fancy way of saying _a process for building, deploying, and serving a static site via a CDN_. And if there was some need for custom back-end code, that was deployed as a serverless function. But those services tended to be minor features that served a small part of the broader site.

{% callout type="tl;dr" %}
If you're finding this background verbosely exhausting, feel free to [jump right to the definition](#a-more-focused-definition-for-jamstack).
{% endcallout %}

## Explosion. Competition. Innovation. Confusion.

In the years since I wrote that article, the Jamstack has absolutely **exploded**! And I've loved watching it grow. It was truly a revolutionary solution — one which took the best of Web 1.0 and Web 2.0 and combined them into a powerful pattern for the fragmented landscape that is the web today.

That explosion led to a lot of **competition** in the space. For example, at first [Netlify](/blog/wtf-is-netlify) was the only _platform_ offering this type of build and deploy process. Today there are newer companies and startup competitors like [Vercel](https://vercel.com/) and [Layer0](https://www.layer0.co/), big players like [Azure](https://azure.microsoft.com/en-us/services/app-service/static/) and [AWS](https://aws.amazon.com/amplify/), and even open-source side projects like [Coolify](https://github.com/coollabsio/coolify).

To beat the competition, the providers of Jamstack tools have had to be super **innovative**. For example, Vercel and [Next.js](https://nextjs.org/) blew up in 2020 for integrating server-side rendering and static-site generation within the same framework.

But all that innovation has created **confusion**. Today I could build an entire super powerful server-side rendered web application using Next.js and deploy it to Vercel. I could also build a single-page application (SPA) with [React](https://reactjs.org/) and deploy it to Netlify. I could go super simple and use [Eleventy](https://www.11ty.dev/) and upload the build to [S3](https://aws.amazon.com/s3/).

Are _all_ of those Jamstack projects? Are _any_ of them?

{% callout type="info" %}
Ishan Anand gave [a great talk](https://cfe.dev/events/jamstack-identity-crisis/) (which also works to define the Jamstack) in which he walks through a detailed history of this evolution that occurred over 2019 and 2020. I highly recommend it. (It's free if you sign up.)
{% endcallout %}

## Replacing Jamstack Confusion with a New Definition

[Matt Biilmann](https://twitter.com/biilmann) wrote [an excellent article](https://www.netlify.com/blog/2021/04/14/distributed-persistent-rendering-a-new-jamstack-approach-for-faster-builds/) that helped, in part, to explain the confusion of today:

> As the Jamstack evolves, new features like dynamic server side rendering, rehydration, tiered CDN caching, and stale while revalidate seem to be creeping us back towards all the complexity we fought to escape.

That's a great point. The core of the Jamstack had enough power at its inception to pull people in. The challenge is not in the original approach, but in deciding where we go from here. As Biilmann says:

> For any technology, the hardest part is not establishing simplicity, but protecting it over time.

And so it feels like we need a stronger definition for what is (and what isn't) a Jamstack site.

The Jamstack website has a [_What is Jamstack?_ page](https://jamstack.org/what-is-jamstack/) that does a good job explaining what it is. At least, it explains _the core tenets_ of the Jamstack. But it still feels somewhat abstract.

It's still tough to know where exactly the line is. Or even where the grey areas are. And perhaps more important is to understand the consequences of being in that grey area or crossing the line.

I'd like to propose to you a new (relatively concise) definition of _Jamstack_. Before that, let's look at what a Jamstack site is not.

## What the Jamstack Isn't

When it comes to defining the line between _Jamstack_ and _not Jamstack_, there's one idea that matters more than all the others.

**Jamstack is not adherence to any particular tool.**

The term was coined by Netlify in large part as a marketing vehicle. But, it was so effective, that it outgrew the organization and became an entire community.

Sure, Netlify owns the website, the conference, and the Slack team. But I don't find that they treat those mediums like an extension of their product. When an idea emerges that would make a fundamental change to what the Jamstack is, [they ask the community for input](https://github.com/jamstack/jamstack.org/discussions/549).

What's compelling to me about the DPR RFC is that the proposals they put out in the community are authored in such a way that they could be adopted by any provider, thus working to avoid vendor lock-in with Netlify (or anyone else).

That means Jamstack is truly a community. It's not (just) a fancy marketing term.

## Back to the Basics

To be able to define what Jamstack is, we must understand where we came from and what the benefits were with the original approach. The original "JAMstack" methodology led to these four primary benefits:

- Faster responses
- Fewer security vulnerabilities
- Cheaper and easier to scale _requests_
- Better developer experience

Netlify achieved this by commoditizing responses to requests from the edge (a super complicated thing to handle for a single project). With Netlify, we were able to deliver static assets with instant cache invalidation, which meant we were serving up the latest version of our sites at lightning speed, with an extra layer of security. And we didn't have to worry about the super ugly technical bits.

As an added benefit, deploys were atomic, or immutable, meaning it was also trivial to rollback to previous versions of the site.

## The Core Tenets of Jamstack

Given that history, and through recent conversations with thought leaders in the space, I believe a Jamstack site has these four core tenets:

1. The UI is compiled.
2. The front end is decoupled.
3. Content is served from the edge (or a CDN).
4. Deployments are atomic.

## A More Focused Definition for Jamstack

And now, the moment you've been waiting for (or skipped right to).
Given the evolution of the Jamstack over the last several years, and keeping in mind where it came from and the benefits it provided, here is an updated definition for _Jamstack_:

> Jamstack is an architecture for atomically building and delivering precompiled, decoupled front-end web projects from the edge.

Holy smokes! That's a bit too _jam_-packed with buzzwords. Let's explore some of its nuances.

## Clarifications on Jamstack and its Grey Areas

There have been some ... _passionate_ discussions that led me to this definition. It's worth exploring some of the finer points I encountered along the way.

### The Grey Area Doesn't Disqualify Your Site

Jamstack is a spectrum. A site isn't either a Jamstack site or not a Jamstack site. Parts of it can follow Jamstack principles and parts of it may not. That's fine.

What is most important is not whether or not you deviate from the Jamstack pattern, but that you understand when and why you're deviating. And that the deviation leads to some other benefit for you or your project.

### The Jamstack Offers Simplicity, It's Not Required

Using this definition, an SPA could _technically_ follow the Jamstack, though that makes it more challenging to be performant, secure, and immutable.

In other words, pre-rendering is an opportunity, not a requirement. Take advantage of that and start simple. Add the dynamic bits only as you need them.

### Not All Static Sites are Jamstack Sites

Simply deploying a static site build to S3 or a web server on Digital Ocean does not qualify as a Jamstack site. The power really comes with delivering that content from the edge, or a CDN.

### ISR (Incremental Static Site Generation) is Not Jamstack

[ISR is friggin' awesome](https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/). (So is Next.js!) ISR is a super powerful pattern that aims to solve lengthy build times by intelligently expiring caches to individual pages based on the request. This enables you to generate the most popular pages at build time, and all the others as needed.

ISR doesn't follow Jamstack simply because it doesn't offer immutability. You can't necessarily go back to a previous deployment with confidence that all the content is going to be as it was at that time.

### DPR (Distributed Persistent Rendering) is Jamstack

DPR is a very similar pattern [currently being proposed](https://github.com/jamstack/jamstack.org/discussions/549). The big difference is that it offers immutability. It'll generate pages on the fly, but once they are generated, they live as part of that deployment. We'll see where the DPR conversation goes, but my guess is the community doesn't budge on the immutability.

### Next.js Makes You Choose

Next.js is awesome! I work in it almost daily and love it. It can be both Jamstack and not Jamstack, and that's what's super cool about it. You could build a Next.js site that is 100% Jamstack. You could also build a site that has zero pages following the Jamstack.

Neither is better. Again, what matters is not the decision you make, but that you know why you're making that decision.

## Let's Talk About It

This was just a start. It came together after several conversations with various community members. But that doesn't mean it's right.

In the end, what matters is this community. We get to decide where we go. And as long as we're making the web better, I'll stick around for the ride.

[Let's talk about it](https://twitter.com/seancdavis29).

## Big Thanks!

These resources were super helpful in crafting this article:

- [The Evolution of Jamstack](https://cfe.dev/events/jamstack-identity-crisis/)
- [Distributed Persistent Rendering: Jamstack Approach for Faster Builds](https://www.netlify.com/blog/2021/04/14/distributed-persistent-rendering-a-new-jamstack-approach-for-faster-builds/)
- [Distributed Persistent Rendering (DPR) - GitHub Discussion](https://github.com/jamstack/jamstack.org/discussions/549)
- [A Complete Guide To Incremental Static Regeneration (ISR) With Next.js](https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/)
- [Static First: Pre-Generated JAMstack Sites with Serverless Rendering as a Fallback](https://css-tricks.com/static-first-pre-generated-jamstack-sites-with-serverless-rendering-as-a-fallback/)

And a _huge_ thanks to these fine folks who each took time out of their busy schedules to chat with me. Every conversation, including those that got a little heated, really helped make sense of this all. Here they are:

- [Phil Hawksworth](https://twitter.com/philhawksworth)
- [Brian Rinaldi](https://twitter.com/remotesynth)
- [Ishan Anand](https://twitter.com/ianand)
- [Jeff Escalante](https://twitter.com/jescalan)
- [Taylor MacDonald](https://twitter.com/tcmacdonald)
- [Dan Shappir](https://twitter.com/DanShappir)
- [AJ O'Neal](https://twitter.com/coolaj86?lang=en)
- [Evan Tahler](https://twitter.com/evantahler)
