---
title: "Run CI During Site Build Process: To Do or Not To Do"
description: Four considerations when deciding to run continuous integrations with production builds or as a separate workflow.
image: /posts/220112/220112--ci-build-process.png
tags:
  - jamstack
  - testing
---

When your website's front end is decoupled from its back end or data source(s), updates to the site are often made by _rebuilding_ the website, or _compiling_ the front end code. This is a common practice of site generators like [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), or [Next.js](https://nextjs.org/), and was popularized by the emergence of [Jamstack](/posts/wtf-is-jamstack/).

## Customizing the Build Process

The compilation of the front end code is often referred to as _the build process_. This process is _usually_ run by the service you're going to deploy and host the website, like [Netlify](https://www.netlify.com/) or [Vecel](https://vercel.com/).

Typically a site generator has built-in commands to handle the build process. But that's just a script that you specify to the build platform when building the project. That means you can customize that command to be anything you want. Some services like Netlify make that process even easier by adding [build plugins](https://www.netlify.com/products/build/plugins/).

## Using the Build Process to Run CI

You can do pretty much anything you want during the build process. This is a common place to generate a sitemap, check for bad links, and compress HTML, alongside many other options.

One such option is to run CI, or [continuous integration](/posts/wtf-is-continuous-integration/), which means to programmatically and automatically run your test suite.

This is often done using a CI-specific service, like [CircleCI](https://circleci.com/), [Travis CI](https://travis-ci.org/), or [GitHub Actions](https://github.com/features/actions), among many more. Let's explore why you might or might not want to run your test suite during your build process by exploring four potential effects from that decision.

## 1. Cost

If you choose to run the test suite alongside the build process, you might see costs increase. While build platforms like Netlify tend to have a generous free tier, the costs increase pretty quickly as you begin using more _build minutes_ — the amount of time you run the build processes.

CI services also tend to have usable free tiers. When you have a relatively small test suite, you may benefit by splitting up your test runs between these two types of services because it increases the free minutes available to you.

However, if you're running integration tests as part of your test suite, you'll have to run a build anyways before running the tests. This is another spot for costs to increase.

## 2. Build Time

If you run tests during the build, the build takes longer to run. That may not be preferable if content editors are waiting on the outcome of the build to be able to preview their work.

One potential way to get around that is by _conditionally_ running the test suite based on whether you're building a preview of production or actually publishing to production.

## 3. Confidence

If you run the tests during the build process and if your tests are written well enough to give you confidence in your code, then you maximize your confidence by running the tests alongside the build.

If you're running tests using a CI service and they fail, you need to figure out how to then rollback changes that may have been deployed to production. Either that, or hold back the build until CI finishes, but then your build time increases even more.

## 4. Maintenance

The last area to consider is the development work involved. It may not seem like much, but it's absolutely less overhead and maintenance to work with a single service (running CI and build together). As mentioned above, if you decouple CI from build and deploy, you're going to want to wire the two together in some way (to make a failing test meaningful and actionable), and I haven't found a plug-and-play way to do that yet.

## Making the Decision

Stepping back, there are challenges no matter what you decide. Cost will increase over time anyways, but you may be able to hold off on that for a bit by coupling the two together. Confidence increases (good) when coupling, but so does build time (bad, usually). And is coupling worth less maintenance?

In general, I've found that a solid choice is to run the test suite alongside the build until it becomes problematic to do, usually either because of cost or build time (which tend to be related).

But, how you make this decision really depends on your specific situation. I've outlined three scenarios and what I'd do in each today.

### Personal Site

If I am building a site for myself, then I'm going to run the tests during the build. Presumably I'm editing content where I can see a preview if I really need to, so it doesn't matter how long the build takes, assuming I can keep cost within my comfort level.

Here I maximize confidence while minimizing maintenance. If I can do that without drastically increasing cost, that seems like a no-brainer.

### Client Marketing Site

When I add in a non-technical content editor, things get a little trickier. If I'm using a service like [Stackbit](https://www.stackbit.com/), where the client can preview the content in real-time, then I'd be fine with the build taking longer, and I'd include the test suite with it.

If the client can't preview the content ahead of time, then it comes down to the size of the site. If the site is small and I can test and build quickly, I'd still keep them together. I might even try to conditionally run the tests based on whether we're building for production or not.

But as the site grows more complex, I may start to look at decoupling the tests.

### Large Business Site

With a large business site, I'd probably use a hybrid approach. I'd run the tests that were critical to my businesses success right alongside the build. That way if another test failed, I could rollback later, but my business wouldn't suffer.

The remaining tests I would run separately, and if they failed, I'd programmatically roll back the site to a previous build at which the tests were passing. This part would be complex to pull off, but necessary for large, complex sites.

## It's Your Call

I hope this helped you make the decision for yourself and your project. If you want to talk more about your specific situation, [find me on Twitter](https://twitter.com/seancdavis29).
