---
title: "The Jamstack Journey: A Guide on Transforming an Idea into a Website"
description: It takes a lot to bring an idea to life on the web, even for the simplest of sites. Follow this guide for a detailed look at moving from concept to a website deployed to your domain.
image: /posts/210908/210908--idea-to-website.png
canonical_url: https://www.stackbit.com/blog/jamstack-journey-transforming-idea-to-website/
tags:
  - repost-stackbit
  - eleventy
  - html
  - jamstack
---

At its core, Jamstack was a revolution. It took the best part of the first 25+ years of website development and combined them into a powerful pattern that is used widely today. It has created an explosion of ideas and innovations that have helped developers across the world build websites that are more performant, more secure, less expensive, easier to scale, and (most importantly) fun to build!

Instead of taking you on a theoretical journey and digging into the technical nuances of the Jamstack, we're going someplace else. We'll take a more tangible journey, as we step through the entire process of building a Jamstack website, from the little light bulb in your brain all the way to a physical website that real people can visit.

These are the stops we'll make along the way:

1. Bring the design to life
2. Find a developer
3. Build the site (write the code)
4. Review and test the site
5. Deploy, edit, and repeat, repeat, repeat
6. Or ... do it the Stackbit way!

Buckle up. Here we go!

## Stop #1: Design

The first stop on the Jamstack journey is design — the process of visually representing your ideas.

### From Spec to Delivery

The way this typically works is that you provide some form of _spec_ to a designer. The designer then takes that spec and turns it into one or more design files that show what should be built. That can include page layouts, individual components, or global patterns like colors, fonts, and typography.

### Delivering a Good Spec

The "spec" you provide the designer should be more then, "I need a website." Before you bring a designer into your project, consider spending time to gather the following:

- A list of pages on the site, along with the purpose of each page. Bonus points if you also include content, as you'll reduce the variability of the design when it is transformed into code.
- Brand assets or other visual specifications you have — logos, colors, typography, etc.
- A list of websites that you really like and why you like them. The designer will want you to be happy, and the more you can tell them what you like, the higher the chance that they will deliver on your vision.
- A list of competitors. Even if the designer doesn't use inspiration from your competitors' sites, it's nice for them to know where the competition stands and what it'll take to be noticed in the crowd.

The designer may ask you for more information, but this is a good start to get the conversation rolling.

### Locating the Right Designer

If you have a designer already working with you, that's a bonus! If not, the cost and abilities of designers vary _widely_. You could use a service like [Fiverr](https://www.fiverr.com/) and have a decent-sized website designed for a few hundred dollars (USD). Or you could hire a fancy agency and spend tens of thousands of dollars.

Generally speaking, cost tends to be _somewhat_ proportional to experience and the quality you're going to get back. But that doesn't mean the inexpensive designer is going to provide an awful design. This is how I usually think about it:

- If I hire a designer on the cheap, I'm going to have to do more work if I want to get something worthwhile out of it. I'll have to drive the process. I'll have to deliver a super tight spec so that they give me exactly what I'm looking for.
- If I hire a fancy and expensive firm, I should expect to still have to put in time and effort, but should be led through the process and be left with something truly great.

### Looking Toward Development

What's interesting about this process is that while design tends to be a fraction of the cost of development, it's also largely responsible for determining the complexity of the build. Granted, a developer can spend your money in a silly way and _over-engineer_ a website for you. But, _most of the time_, the time a developer is going to spend building your site is determined by _their specification_ — the design files.

The more interactive the design, the more it's going to cost to develop. The more unique each page is from the others, the more it's going to cost to develop.

You don't have to be a fortune teller. Instead, leave a little room in your budget for going back to the designer after consulting with your developer. If the developer says you can save a thousand dollars by changing a feature, maybe you'd want to spend another hundred to have the designer reimagine and simplify it.

### The Deliverable

After going through the design phase, you're left with the _deliverables_ — artifacts you can pass on to the developer as their specification. [Here's an example for a simple site](https://github.com/seancdavis/stackbit-jamstack-journey/tree/main/01-design) that includes just four files:

- [Home page for large screens](https://raw.githubusercontent.com/seancdavis/stackbit-jamstack-journey/main/01-design/unmute--homepage--desktop.png)
- [Home page for small screens](https://raw.githubusercontent.com/seancdavis/stackbit-jamstack-journey/main/01-design/unmute--homepage--mobile.png)
- [Interior pages](https://raw.githubusercontent.com/seancdavis/stackbit-jamstack-journey/main/01-design/unmute--content-page.png)
- [Style tiles](https://raw.githubusercontent.com/seancdavis/stackbit-jamstack-journey/main/01-design/unmute--style-tiles.png) (i.e. global style definitions)

And this is an example of what a style tiles spec might look like:

{% post_image
    src="/posts/210908/unmute--style-tiles.png",
    alt="An example of style tiles — styles that apply to all (or most) pages on the site" %}

_(This example is from [Unmute](https://www.unmutedstories.com/), a side project I'm involved with.)_

## Stops #2-4: Development

_Toot toot!_ This train keeps on rolling. The next several steps encompass the development phase of the project. Our Jamstack train makes three stops here because there are _usually_ three steps in this process, though the amount to which you are involved in each will vary depending on the developer you hire.

### The Process

This process itself is similar to the design process in that it goes through these steps:

1. **Locate & Estimate:** Developer provides estimate based on specification.
2. **Build:** Developer _builds_ the site.
3. **Review:** The developer delivers the code and you review to make sure it works.

### Locate a Developer

You can go through much the same process as you did with design. If you have an in-house developer, great! If not, you can use a service like Fiverr and hire devs on the cheap. Or you can look to a more formal agency or dev shop to suit your needs.

In this case, you don't have to build a spec for the developer. You already did that! The design files are your specification.

Finding the right developer is crucial to this process, as well. And that's why I've broken out the build portion (below) as three steps. Some developers (usually those you hire on the cheap) may only complete the first step in the process. But for you to truly achieve a useful and powerful Jamstack site, you'll want someone who can take you through all three.

### The Build

These are the steps in the process:

1. Static build
2. Templatizing the code
3. Separating content from presentation

You can spend very little on web development and still get something that you can deploy out of it. Often, that means the developer only went through the first step and gave you static files. That's totally fine, but it will make adding new pages or editing existing content super difficult.

The second step — _templatizing_ — aims to take the static code and turn it into modular pieces that can be reused. This process is explained in great length and technical detail [in this guide](https://www.stackbit.com/blog/jamstack-journey-templatize-static-html/).

After the code has been modularized, it can be further adjusted to extract all the content and put it in a single place, such as a content management system. This process is explained in great length [in this guide](https://www.stackbit.com/blog/jamstack-journey-separate-content/).

And the end of these three steps, you'll be left with a system that you can use to edit content without worrying about messing up the code. In fact, you ought to be able to edit the content without even _seeing_ the code.

### Reviewing the Site

While the review process for design was more conceptual, with development, it's up to you to actually test that the website behaves as you'd expect. In other words, you're _trying to break it_. The developer should respond by fixing any bugs discovered within a certain timeframe.

While the developer may not _deploy_ the code for you, they ought to be able to help you get it running so that you can test and send notes back to them.

## Stop #5: Deploy & Use!

At this point you have a site that is ready to go to production, so that's the next step. I recommend using that same developer to help you through that process, but I've broken it out here because it tends to require more effort from you than the development phase of the project.

Here are a few of the crucial steps in this process:

- Choose a host and setup an account
- Buy and/or configure a domain name
- Add analytics tooling
- Add SEO content
- Use it!

Let's look at each of these briefly.

### Hosting

The term "Jamstack" was coined by a startup called [Netlify](https://www.netlify.com/). And they continue to lead the way in terms of deploying and hosting Jamstack websites. But there are other great tools out there, like [Vercel](https://vercel.com/), [GitHub Pages](https://pages.github.com/), [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/), and many more.

Whatever you choose, you'll want to set up an account for yourself. Most of these services have a free (or low cost) tier that is enough to accommodate small websites.

Once you have an account, you can add your developer, and they will hook it up so that the code is deployed. And then you will have a working website!

### Domain

You'll want a domain name for your site, otherwise you'll be left with default names from your hosting provider. If you already have one, that's great!

Your developer can tell you what you need to do to point the domain to your host, and then you'll be able to use your domain name to access your new website!

### Analytics

Analytics is a crucial piece of the puzzle, because you want to know who is visiting your website. Some hosting providers (like Netlify) offer what they call server-side analytics, which tend to be the most accurate, though there are limitations to them. But if you're just getting started, it's easy enough to start with [Google Analytics](https://marketingplatform.google.com/about/analytics/).

Tell your developer you want to install Google Analytics and they can help you through that process.

### SEO

Of all these pre-launch steps, perhaps the trickiest to deal with is SEO. Usually I'd expect a developer to prepare my site to support SEO. That means automatically generating a sitemap file and providing the ability to customize SEO meta values for any given page. (It would be worthwhile to mention this when first setting up the arrangement with the developer so that they are prepared.)

You'll want to:

1. Register your site (and sitemap) with [Google Search Console](https://developers.google.com/search). This will help provide you with analytics on where you land in search results. It'll also help Google know where your site is and what its pages are.
2. Add custom SEO values for every page on your site, including adding an image.

If you don't feel confident in this step, you can also hire an SEO expert to help you through the process. These types of consultants also have a huge price range, from Fiverr to big agency. If you're just getting started, I recommend toward the cheaper option — just have someone give you a quick audit and make the changes they suggest.

(Insider secret: Mostly what these SEO pros are doing is using some expensive tool, hooking up your site, running a report, and giving you the output of that report. The funny thing is, some of the people are often less expensive than buying the tools and doing the work yourself.)

### Editing

When all of those last bits are in place, you should have a live site and it's time to start promoting it and keeping it up to date. Make a few changes to the content. Tell the world about it. and give yourself a pat on the back.

BUT WAIT! Before we wrap this up, I want to spend a little time giving you what I think is a better way to get started.

## Stop #6: An Easier Approach

If you're new to the world of creating websites, I think you should take a look at [Stackbit](https://www.stackbit.com/)! (Of course I do, I work there and am writing on their blog.)

Stackbit is a site builder that specializes in Jamstack websites.

Instead of going through that entire process (the first five stops on the Jamstack journey), you could do it all yourself in much less time for much less money. After [creating an account](https://app.stackbit.com/login), Stackbit will give you a list of templates from which you can build your site. You'll then walk through the process of customizing it just for you.

The catch here is that Stackbit isn't just another WordPress or Squarespace, even though it may feel like it at first. Stackbit works to be super transparent about where your code and content live. What that means is that you can start this journey on your own, without a designer or a developer, at no cost other than your time. And you'll still have access to the code and content that powers your site. Once you're up and running, if you need a little help, _that's_ when you can bring in a designer, developer, or SEO expert to make some suggestions or additions to your new site.

If that sounds like a walk in the park, [give it a try](https://app.stackbit.com/create)!

In any case, I hope you've enjoyed your ride, and I'd love to learn more about your _Jamstack Journey_. [Let's chat](https://twitter.com/seancdavis29).
