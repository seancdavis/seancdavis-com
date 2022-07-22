---
title: Creating Parity Between CI and Jamstack Deployment Process
description: >-
  You can get to production faster by separating CI and build/deployment
  process. But there’s risk in it. Here are two approaches to help with the
  decision.
tags:
  - jamstack
  - testing
image: >-
  /posts/220701/creating-parity-between-ci-and-jamstack-deployment-process-Qr0czdHx.png
seo:
  image: >-
    /posts/220701/creating-parity-between-ci-and-jamstack-deployment-process-xsWv5xbA--meta.png
---

I’ve previously explored whether or not you should [run continuous integration (CI) during your production build process](https://www.seancdavis.com/posts/run-ci-during-build/). There are several factors to consider.

If you decide to separate the two, there’s scenario that immediately becomes a challenge: _How do you maintain parity between CI and the production build?_

## Why Parity Between CI and Build Matters

Before we answer that, we should consider _why \_having parity matters. The main reason is that there may be \_something_ that occurs within the CI process that suggests you shouldn’t publish the production build.

Given that, I see two approaches for configuring these two services:

1. Run in parallel, rollback on failure
1. Build without publishing, run CI, trigger build on success

Let’s briefly explore both ideas.

## 1. Rolling Back on Failure

This method suggests that both CI and production builds are happening in parallel. But if something goes wrong in CI, you would roll back your production build.

### Parallel Build Advantages

The main advantage of this approach is that you can get to production faster. The CI process is offloaded to another service.

### Parallel Build Risks

The downside is that you could send bad code to production. But, there are ways to mitigate that risk. For example, you could include your most mission-critical tests as part of the production build, and use CI for tests that you might still roll back, but that wouldn’t cause a major outage for your users.

## 2. Triggering Deployment

Alternatively, you could still run in parallel. But instead of _deploying_ the production build, you wait until CI completes, and then trigger the deployment.

### Non-Publishing Build Advantages

The main advantage of this is mitigating the risk in the scenario above. Here, regardless of the severity of the bug, if CI catches it, the build never makes it to production.

This also has the advantage of not needing to worry about which tests are mission-critical or not.

### Non-Publishing Build Challenges

The biggest challenge here is mainly that it’s complex. For example, you could do it with Netlify, but you’d likely have to build some automated service [using their CLI](https://docs.netlify.com/site-deploys/create-deploys/#netlify-cli). Thus, you lose _some_ of the magic of Netlify and take on that work yourself.

There’s also a risk here in that if your CI process runs longer than your production builds, it takes longer to get into production.

## Choosing the Best for You

I often say _choose the best tool for the job_. There is no universal best tool for any of this. You know your project better than I do. Weigh these two options, choose one that feels right and try it. If it doesn’t work, try the other. And if neither are working quite right, perhaps it’d be better to run CI and build/deployment on the same server.
