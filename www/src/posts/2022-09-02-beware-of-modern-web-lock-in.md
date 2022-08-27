---
title: Beware of Modern Web Lock-In
description: >-
  Although developer experience has brought much flexibility to modern web tools
  and services, vendor lock-in is still very much in play.
tags:
  - cms
  - developer-advice
tweet: >-
  One of (many) reasons I love working at @stackbit is that we minimize vendor
  lock-in for our customers.


  Exploring the ecosystem today, vendor lock-in is less prominent and more
  hidden. Here are some tips to help in evaluating modern web tools.
image: /posts/220827/beware-of-modern-web-lock-in-HSmvS0Ke.png
seo:
  image: /posts/220827/beware-of-modern-web-lock-in-MW6URa1t--meta.png
---

When it comes to adopting a new tool or service, one of my first points of evaluation is whether I'll be locked into using this vendor for the foreseeable future.

## Content Vendor Lock-In Explained

Vendor lock-in means that once I engage with a vendor, I have to do work specific to that vendor's domain, which is generally not easily transferrable to other vendors.

Although it's becoming less common (in tech), vendors have traditionally done this as a means for customer retention, though they mask it with marketing language that makes it feel like it's for the customer's benefit.

### Lock-In isn't Always the Vendor's Fault

To be fair, getting locked in isn't always the vendor's intention or fault. It's up to us (as developers) to ensure that we make smart decisions that balance short-term and long-term risk.

### Modern Web Example

An example I really like is building a website with Next.js and Contentful, because the lock-in isn't obvious, and it's generally self-induced.

You can build a website with Next.js that uses primarily generic React components. You can abstract your content transformers and mappers outside these components so that you can easily swap content providers in and out. And you can work with Contentful's provided SDKs to retrieve content. Boom. 💥 Almost no lock-in.

On the other hand, you can:

- Spend time altering the content editing experience in Contentful by writing custom UI extensions that provide specific experiences for your editors.
- Intertwine Contentful logic in your components and pages.
- Overuse Next.js components within your components.

Doing these things locks you in, making it more difficult and painful to move away from either Next.js or Contentful.

## Why Avoiding Vendor Lock-In is so Important

The reason _avoiding_ lock-in is so important is that it affects the ability to make good decisions in the future. If I choose to work with a vendor that locks me into working with them, then it becomes _significantly_ more difficult to move away in the future (that's why vendors do this).

The mark of a tool that serves me well is not that I continue to stay because it's easier or more convenient, but that the vendor continues to be the best vendor for me. And if I outgrow that tool or service, I want to be free to act on that change immediately.

## The Reality of Vendor Switching

Switching vendors — even when you're not locked in — isn't necessarily a _walk in the park_. It still takes work.

But that's no reason to be complacent on the issue. The reality is that there _will_ almost _certainly_ come a time in the future when the best choice for your project or team is to move to a new vendor.

You don't want to be stuck evaluating sunk costs at that time. You want to be thinking of the return on investing the minimum possible time to bring the _right_ new product or service into your project.

## Recognizing Modern Lock-In

Lock-in today can be more difficult to pinpoint than in previous generations of web tooling. This is, at least in large part, because we're in a new generation of "developer experience" tools.

It can be super easy to mistake a good developer experience for lock-in. Having turnkey solutions, well-supported SDKs, and configurable UIs all at your fingertips is super powerful. You can move faster than ever as a developer. That doesn't mean moving to a new vendor is going to be any easier.

There are three categorical, metaphorical red flags that I raise during these evaluations:

- Writing plugins or extensions
- Accommodating changes to code or processes
- Working with vendor code

### Plugins & Extensions

When a vendor offers plugins or extensions to their tool, it's time to look a little deeper. Ask these questions:

- Why do I have to write plugins? Why doesn't the product provide this feature?
- Is there a library of pre-existing, well-supported plugins available?
- How much plugin code is transferrable if I begin working with another tool?

Generally, you can get a sense of how well the product is architected and how painful it would be to move away based on the answers to similar questions. The more painful it seems to move away, the more lock-in there like is.

### Vendor-Specific Changes

Very rarely should you have to change something core to your team as the result of a vendor. That said, you may learn how to improve some process or tooling through the evaluation process, and that's totally fine.

If you find yourself making inherent changes to the way you previously wrote code, created content, and ran projects, that's not _necessarily_ bad. In many cases, it may mean you got a _serious_ boost from the new tool.

Just ensure those benefits aren't at the cost of work needed to move away from the vendor in the future, but that they are benefitting your team _outside the context of the vendor_.

### Using Vendor-Supported Libraries

Typically, the most obvious sign of lock-in is when working with a tool _requires_ that you use their code libraries. It's one thing if the vendor _is_ the code. But typically, it's more of a way for vendors to say: _We know what we're doing. Trust us_. Even if they do, you should know what you're getting into.

---

The reality is that switching vendors is never easy. There's always going to be some small amount of lock-in.

But if you are extremely critical of that lock-in during your diligent evaluation of new tools and services, you'll thank yourself when it's time to move on in the future.
