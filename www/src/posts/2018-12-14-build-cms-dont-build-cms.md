---
title: Build Your Own CMS. But Also, Don't.
description: 3 reasons you should never build a CMS, along with 3 reasons you
  should. So which is it?
tags:
  - cms
image: /posts/default/default-yellow-02.png
---

I built my first CMS six years ago after becoming frustrated with [WordPress](https://wordpress.org/) and learning [Ruby on Rails](https://rubyonrails.org/).

I worked on that project for nearly two years before rewriting and renaming it (_Sapwood_). Sapwood v1 (now called [Sapwood Classic](https://github.com/seancdavis/sapwood-classic)) also lasted for a couple years before it was time for another rewrite (and before earning the "Classic" appendix). Pretty quickly after wrapping up [the next iteration of Sapwood](http://sapwood.org/) (v2) I started on Sapwood v3. Designs were ready to go when I stopped and asked myself this question I regularly revisited during these years:

> Should I keep building my own CMS?

The answer had always been _yes_. Always. Sometimes it took really thinking through it, but I always ended up working on my own product for one reason or another.

That is, until this last time. I finally said _no_ and abandoned my CMS before Sapwood 3 was released. And still, not only do I _not_ regret the 5+ years I spent working on my own CMS products, but I think that time was incredibly integral to my development ... _development_, I suppose.

But we're not here to talk about me. The question is should _you_ build your own CMS?

As you may have gleaned from this article's title, I think the answer is _yes_, but I also think the answer is _no_. And I have three reasons for each case. Let's start with why you _shouldn't_ build your own CMS.

## You should never build a CMS.

These are three reasons why I think you should not build a CMS. (If you get through these and need further convincing, read [this article](https://hackernoon.com/how-i-built-a-cms-and-why-you-shouldnt-daff6042413a)):

### 01: More Expensive

It's easy to convince yourself that a product you build is "free" because you did it in your free time when you weren't making money anyways. It's also easy to convince yourself to create a CMS when you can convince a client to pay you for it. I've used both excuses as justification for continuing to build my own CMS.

The old adage is so true -- _time is money_. And as humans, time is the only thing we have and you should never give it away lightly.

A CMS is a large undertaking. It's not too difficult to get a working proof of concept off the ground. But to make it great over time means continued efforts on feature additions, bug fixes, user support, developer support, and so on. If you're building this on your own, that's a massive investment. And even if you're getting paid by a client for the initial build, it's unlikely the client is going to continue to pay you for all of that maintenance and support required to keep the system running like it should.

And if a premium CMS product is too expensive for your budget, there are an abundance of open-source projects out there that I'm sure could suit your project's needs.

### 02: Less Secure

In software development, there's this notion of [_security by obscurity_](https://en.wikipedia.org/wiki/Security_through_obscurity), which can imply that something less widely used is more secure because those ill-willers aren't as motivated to exploit and don't know as much about your product.

That's proven to be false. A bigger community of users and developers means bugs and vulnerabilities are found and fixed quicker than you and your (presumably small) group of users can do on your own.

### 03: Focused Problem Solving

Learning to work with another CMS is going to take less time than building your own (see point #1 above). That means there is more time for you to focus your problem-solving on the places that matter. This typically means you get to spend more time on the front end of the site, solving business problems, rather than focused on low-level problems behind the scenes.

While that may not sound ideal to every developer out there, it often delivers more value to yourself and, more importantly, to your clients.

## You should absolutely build a CMS.

So now you're feeling like you should never build your own CMS? Good. Now let's talk about the why I think you _should_ build your own CMS:

### 01: System-Wide Problem Solving

When you build your own CMS, you are forced to think about the system from end to end (if you're going to build it well). That means you have to consider the editing process and the experience for the _users_, but it also means you have to consider how to deliver the content they create securely and efficiently to the front-end application(s) that will consume and/or manipulate that data.

So, whenever you make a change or add a feature to the CMS, you have to consider the effect not just on your product, but on all the products that may be tied into yours.

This requires some serious system-level thinking and that's a massive benefit that comes out of working on a CMS project, because that is the type of thinking necessary to becoming a senior-level developer.

I painted #3 in the _Don't!_ section on the value of not needing to solve low-level problems, and that I do believe that. But, at some point, if you're going to move your career to the next level, you have to learn how to think at a strategic systems level, and a CMS project is a great means to learn and practice that skill.

### 02: Feature Control

When a product is yours, you can do whatever you want with it. You _should_ make decisions in the best interest of your users, but ultimately _you_ get the final word.

When you ask [Squarespace](https://www.squarespace.com/) for a new feature, they have to consider how that affects not just you, but each of their millions of users. On the other side, when you want a new feature for your CMS, you get to add it without asking anyone. (Or maybe you're on a team managing this CMS, but you still have more feature influence when you're building the product.)

### 03: It's Fun!

I wouldn't have continued to work on my CMS products over the years unless it was fun to do. I absolutely loved the creative problem-solving, the ability to control features I felt like made more sense to CMS users, and I loved seeing others use my product and then turn around and make it better based on their feedback.

_Fun_ is also the reason I rewrote the application from scratch multiple times. I would make attempts to clean up the current codebase and then expand upon it, and when it became no fun, I'd throw it all away and start over (which is really fun).

There are so many tools and projects and jobs in web development today that there's little reason to spend time doing something that isn't fun.

## What You Should (Actually) Do

You didn't come here just to read why you should and shouldn't build a CMS, right? You want to know what you should actually do with your time and money.

I think building a CMS is a great exercise for a developer. I firmly believe every developer who builds a CMS (mostly) on their own becomes a better developer because of it. And for that reason, every developer should attempt it (or something like it) at some point in their career (preferably early).

Yet it's equally important to understand how to work with modern CMS products. Practicing with a few different systems will arm you with the ability to choose the right tool for the job when a new job comes along.

So, when you're in the real world solving real problems for real people who are paying you, you should use a third-party CMS and focus on solving the client's problems. [Buying is often going to be cheaper and better for the end goal compared to building](/posts/four-key-factors-build-v-buy-software/). Similarly, if you think you're going to disrupt the market with the next great CMS, know you're in for a long, difficult, and expensive battle in a saturated market.

In other words, build your own CMS. Absolutely. Do it! But also, don't ever do that.
