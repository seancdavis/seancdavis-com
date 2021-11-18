---
title: Design your stack for the new developer
description: The Jamstack approach will help you onboard developers more quickly, and increase your overall efficiency. Ample's Sean Davis will tell you how.
tags:
  - repost-ample
  - jamstack
image: /blog/190621/190621--new-dev-stack.png
canonical_url: https://www.ample.co/blog/design-your-stack-for-the-new-developer-and-increase-your-onboarding-speed
---

Ever get, "the look"?

When I lead a new developer through the onboarding process, I throw a _ton_ of information at them. Around about the point where I start to dig into the weeds of the client's overarching front-end architecture, _I see it_:

_The Look._

Every new developer's face wears it during this discussion, and it always says the same thing:_‍_

_"Huh"?_

Attempting to make them feel better, I say, "It's okay, this will make sense eventually, I promise. It only took me three months until I felt comfortable working in this space."

And then I think to myself, _WTF? Three months? It only took me one month to learn to play a song on the guitar._

Typically I'd leave these conversations feeling bad for the new developer. I still remember being in that position, and it's intimidating. Ample has a (well-earned) speed- and quality-based reputation to uphold. And here I am, asking this person to take on the responsibility of that reputation quickly and within a complicated ecosystem.

Recently, I noticed that something had changed with the last few developers that I've onboarded. At first, these new devs moved _really_ slow, just as I expected. But that only seemed to last three or four weeks. And then — _voila!_ — they were up to speed and operating at a similar level to the other (more experienced) developers on the team.

But _why_?

I had to ask myself why these devs were moving so much faster than I did. Could it be that they are three times better than I was?

Fortunately for my ego, there's more to it than that. You see, our onboarding process is completely different than it was just two years ago, when I was new to the team.

Back in my day, the client's entire website was written in one giant [AngularJS](https://angularjs.org/) application. It took anywhere from 5-15 seconds to load the JS bundle — i.e. to see any real content on the screen. It also took about 30 minutes for the project to build and deploy to production.

I'll give you a minute for your anxiety to subside...

### Welcome back!

For me to add something to that massive repository, I had to find my piece of the puzzle somewhere in the messy mix of stinky old Angular code. Then I'd make a change, save the file, and..._farts!_ Some obfuscated disaster of an error message with no meaningful trace appeared on the screen. So I'd go track down some other dev contractor who I thought could help me. A few hours later I'd be writing code again. After finally resolving the error, my continuous integration tests would fail. So, next, I'd receive the pleasure of figuring out how to navigate the delight that is [TeamCity](https://www.jetbrains.com/teamcity/). And if my change was a hotfix that needed to go into production, forget it! I didn't have access (or understanding) of how to work with the cluster of [kubernetes](https://kubernetes.io/) instances and [Docker](https://www.docker.com/) containers.

And then...and then...and then it was three months later and I was comfortably frustrated with every line of code I was writing for this client.

I wasn't alone in my frustrations; every developer at Ample felt this way in those formidable days. It's why the Ample team stepped up to the challenge, spending months tirelessly convincing the client that it would be a good idea to pull apart the Angular repository in favor of a [micro front-end architecture](https://micro-frontends.org/). As of about a year ago, this client's front-end architecture was entirely built upon the [Jamstack](https://cobwwweb.com/wtf-is-jamstack).

Today the architecture is still unavoidably and undoubtedly complicated. That's okay — it serves a large, complex organization. But that explains why I still get _The Look_ when onboarding new devs.

It's probably because I say something like this:

> "Our CMS is [Contentful](https://www.contentful.com/). The front-end applications are hosted on [Netlify](https://www.netlify.com/). Everything is routed through a single Netlify project. If the route doesn't exist there, it is proxied on to one of dozens of other applications also hosted on Netlify. And then there's [AWS Lambda](https://aws.amazon.com/lambda/), which provides our microservices framework and helps with a few back-end tasks. Except, there's that one team that went rogue and implemented [Firebase](https://firebase.google.com/) and [Google Cloud Functions](https://cloud.google.com/functions/). Oh yeah, and we have some shared libraries and utilities that are [NPM packages](https://www.npmjs.com/), but they may also be [Ruby gems](https://rubygems.org/). Some of them are both."

‍
_Right._

Anyone's head would be spinning.

But the beauty of this conversation is that _it's just context_. What it really says is that this client's architecture is now designed in such a way that it promotes a [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns). In other words, while there are _a lot_ of pieces to the puzzle, every piece does its one thing and (hopefully) does it well.

So now, when the new dev and I move from the architecture discussion into their first task, all we have to talk about are one or two (small) projects that are relevant to that task. And when that new dev runs into an error they can't figure out — an inevitable part of being a developer — someone on our team will be able to help them. That's because we don't need years and years of context to know what any one particular application is supposed to do.

This approach also means that we can put developers on projects that play to their strengths. If a dev is stronger in JavaScript than Ruby, then we know where to put them (and, consequently, where to challenge them).

So it makes total sense, then, that onboarding and efficiency have increased _at least_ three times over. It has nothing to do with comparing new dev to new dev. It has everything to do with a decoupled and focused front-end architecture, driven by the Jamstack.
