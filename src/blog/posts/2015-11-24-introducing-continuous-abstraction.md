---
title: Introducing Continuous Abstraction
description: Abstract core components of related challenges to make solving future challenges easier and faster.
image: /blog/151124/13519151904_dc4672d377_h.jpg
attribution:
  - name: Patrick Metzdorf
    url: https://www.flickr.com/photos/batjko/
    license: CC BY 2.0
tags:
  - productivity
---

_"You just did X, so can't you use that to create Y?"_

We've all been asked (or told) this at some point in our career.

This question is phrased in such a way to suggest the questioner doesn't understand the technical details of what it takes to accomplish X and Y (which can cause other problems, but we'll leave that alone for now). For someone who doesn't understand the technical details, this _seems_ like a logical approach.

While sometimes the answer to the question is, "No," most of the time it's something like, "Yes, but ..." And it's the _but_ I want to focus on here, because the logic behind this question is not an efficient way to solve problems.

Let's see why.

## Repurposing

The question of interest -- using something to create something else -- is a concept called _repurposing_. Repurposing feels like a good idea on the surface. It has the appearance of reducing waste by minimizing the amount of time you spend redoing tasks. And it can happen in virtually any industry.

But, repurposing isn't good enough. It's a lazy way to make yourself (or your team) feel like you are being efficient, while what you're doing can lead to duplicated effort and mistakes.

### Why It Doesn't Work

When we speak about efficiency, we're often attempting to identify tasks or components within a system that create waste. It's easy to spot some inefficiencies. For example, [writing an email and then talking to someone about that email without adding new information](/blog/did-you-get-that-email-i-literally-just-sent-you) creates waste (doing the same thing in two different ways is a form of duplication). It's an obvious inefficiency.

What can be more difficult to identify are those items that mask their inefficiencies, or items that are harmful to the system while concurrently providing the illusion of being a benefit. Said another way, it can be difficult to identify issues with the global system when they tend to benefit a local component within the system.

That's the problem with repurposing. From one project to the next, you save time when comparing your repurposing efforts to _starting from scratch_. When we do this, we often only consider a minuscule subset of history. We compare a few previous projects to one another and ignore those we think are either irrelevant or we simply don't know about. That is because repurposing relies on the accuracy and relevance of specific, historic use cases. This requires historic knowledge if you or your team don't have some intelligent retrieval mechanism in place. These attributes make repurposing inefficient and error-prone.

## An Improved Process

A better approach to repurposing work is what I am calling _continuous abstraction_. Continuous abstraction avoids duplicating efforts by abstracting the core components of a solution into an engine, which is stored in a centralized and normalized repository. This engine subsequently arms current and future team members with the tools to solve related business challenges in a repeatable and efficient manner.

Continuous abstraction is achieved by recognizing similarities in business challenges and proactively investing time in the abstraction process.

This still maintains that every business challenge is unique, and continuous abstraction doesn't attempt to refute that. Instead, it considers that challenges and solutions, while unique, can be related and solved via an engine built to support a similar group of challenges.

It works like this:

### #1: A Unique Solution

The first time you are presented with a challenge, **solve it**. Always solve the first instance of a challenge directly because you can't be sure it will occur a second time. And even if you know you are going to be presented with a related challenge in the future, you probably can't yet guarantee the requirements of that solution.

As [Eric Ries](https://en.wikipedia.org/wiki/Eric_Ries) mentions his [The Lean Startup](http://theleanstartup.com/) movement, to attempt to solve problems you don't yet know exist is a form of waste in itself. Therefore, **it is inefficient to consider solutions to problems that don't yet exist**. That's why we don't start the abstraction process right away.

### #2: Abstraction

The second time you have to do a task, **abstract its core components**. In other words, take only the components that will be reused and create a generic product out of it. Then, put that product in a centralized and normalized location. The product becomes the _engine_ by which you solve future, related challenges.

Ideally, items within your centralized repository should be able to be intelligently retrieved by all current and future team members. This could mean documentation, tagging, or other approaches to facilitating and normalizing the retrieval and usage processes.

The abstraction step doesn't come without doubts and variations. It is the abstraction process that will make you feel like you are taking a step backward. And it is almost always a leap of faith, based on the logic that **if you do something once, you might not have to do it again, but if you have to do it twice, you'll need to do it a third time**.

If you invest the time to abstract early, you are left with an engine that is built to solve future related challenges that don't yet exist. That's power!

Because of the doubts and variations embedded within this step, it's important to keep these two ideas above all:

First, remember that **abstracting too early risks spending time on something you didn't need to do (a form of waste), while abstracting too late means you will end up duplicating work**.

And second, **never guess new features your engine needs**. Your engine should always only contain features/functionality that were added to solve specific problems. For example, if you abstract the second time you solve a related challenge, your engine should not contain anything that didn't directly support solving either your first or second challenge.

_Confused? Not to worry. There are real-world scenarios coming up after we get through the theory._

### #3: Benefit

The third time (and every other time) you have to solve a related challenge, **begin by updating or enhancing the abstracted item to incorporate any new or necessary core components**. Then plug your engine into your current project, publish the new version of the engine, then build on top of it to create your unique solution to your unique-but-related challenge.

If you have an abstracted engine by the third time you are presented with a related challenge, you're going to start to see efficiency improvements. If you haven't abstracted yet, this is when you may start to feel frustration from duplicated efforts.

This is also where documentation and repository normalization comes in handy. Suppose the team member(s) who originally created the engine have moved on to save the world in other ways. If the engine is easily-accessible and well-documented, new team members should have no problem using it. This is precisely why continuous abstraction works so well, but also why a lack of documentation destroys its efficiency improvements.

## Real-World Examples

After putting words to this idea of continuous abstraction, I realized I have been practicing it for years. I want to share two past experiences with two different companies in two different roles. I used continuous abstraction with my team in both cases. And in both cases there were flaws in my team's methods. Let's look at how continuous abstraction was significantly better than repurposing in each experience, but how not staying firm to the abstraction process can hurt the overall system in the long run.

### The Proposal Writer

At one point I held a job writing proposals for a construction management firm. In the construction industry, just like many other industries, requests for proposals (RFPs) often ask for examples of previous projects that are similar to the proposed project.

When I first started, it was kind of a nightmare. The proposal group had a shared network drive that acted as their repository for past proposals and related assets. There were 120,000+ assets in there, and I couldn't tell you how many of those were duplicates.

At that time, the process of finding similar projects was to repurpose pages from past proposals. To do so, you needed to first know which past projects were similar in scope to the proposed project. But even if you had that knowledge, you then had to know where to find that proposal. It's not as easy as you'd think. I tend to pick new things up pretty quickly, but it took me three weeks before I was comfortable navigating the treacherous waters of their _I-Drive_.

So, that was bad. And that's obvious. We knew it. And that's why we were already working on a solution. We were in the process of purchasing and implementing a [digital asset management](https://en.wikipedia.org/wiki/Digital_asset_management) (DAM) system. During that time, we also had an engineer assigned to help us create project description sheets for all of the current, and a handful of past projects.

Fast-forward a year or two, and we had a shiny new DAM system, full of project description sheets and other important (some abstracted) assets. And with all the effort we put in to get this system up and running, we could now run searches and say something like, _Give me all the project description sheets from projects in the health care industry between $10-20 million in project cost that contained an MRI_. And we'd get a pretty accurate result. We were very, very quickly chipping away at the 1,000 hours we put into implementing this system.

This story sounds complete now, doesn't it? We went from a terrible system built around repurposing, to a new system and some supporting processes that promoted continuous abstraction. We even wrote docs that outlined the process of adding content to the engine after adding them to your project.

While I know nothing about how they use or maintain the system today, there were two significant flaws in our abstraction and engine maintenance processes.

First, our process was to abstract new content _after_ we added it into the proposal. This rarely happened. Whether we forgot, were forced to jump immediately into the next project, or were so burnt out we didn't care, it was rare that any one of the team members would abstract new information into our engines. In fact, many times we were lucky if the team member would even archive the finished proposal into the system.

What we should have done was to make the abstraction process part of the proposal writing process. So, as soon as you get new, _relevant_ information, you add it to the engine before adding it to your proposal.

Our second flaw was in not taking metadata seriously. Granted, this stems from another issue, which was that we made our custom metadata far too complex. Nevertheless, we had a system, and after we implemented it, we got lazy with maintenance. If a new project description sheet was to be added to the system, often that task was looked at as trivial, so it was passed on to an intern -- someone who had no involvement in creating it. And with no quality assurance process in place (or at least not one anyone followed), tags and other metadata were often missing or incorrect. So, while our search engine has the appearance of being powerful and accurate, it quickly unwound, and we found ourselves double checking on data or, worse, repurposing sheets and disregarding our engines.

Understanding the need for and implementing an abstraction process is far less important than properly using and meticulously maintaining it.

### The Web Developer

Another segment of my career was spent developing web applications. When I began this job, I inherited management of a project that allowed users to place hotspots on PDFs or image drawings. The hotspots could be dragged around, such that the end-user would be able to click them and see a modal window with information relating to that hotspot. It worked similar to pins on a mapping application.

A year or so later, I had to do a similar sort of thing, but with (what seemed to me) a very different set of requirements (looking back, they really weren't that different).

It wasn't until the third request came around that I decided to create a [ruby gem](https://rubygems.org/) that could handle managing hotspots on an image or canvas. By that time, I had two projects to pull from, but they were two projects built in very different ways (remember, I inherited the first one).

While this ruby gem (our engine) now grows following the abstraction process, I recognized a few mistakes I made along the way.

Again, the first one is obvious. I abstracted on the third challenge, not the second. Therefore, I spent time taking parts of my second solution and working them into my third, when I could have avoided that if I already had a working engine.

The second mistake is around refactoring and documentation. Now, refactoring happens all the time in web development. It's how we keep our code nice and shiny. So, whenever features are added to an abstracted engine in the development world, there will likely be some refactoring. But, by not refactoring or documenting along the way, I left myself with a mess of code to clean up after the engine was already working for the third solution. At that point, it felt like a new project, and that is not the point of continuous abstraction.

That being said, I pull some positives from this project. In this case, I could make the engine public (an open-sourced ruby gem). This means the development community can contribute to it if they have a related challenge. Being able to share your engine with the public doesn't have to be unique to the development world, but it's also not always necessary. However, it can provide a free way of having others help you make your engine even more powerful, and that's a cool thing.

## Avoiding System Failure

Using theory and examples, you can see how continuous abstraction is a powerful way to solve related challenges. But you also can see how not staying true to its process can have damaging effects on its potential. Let's continue this introduction to continuous abstraction by looking at the principles and practices you need to take with you.

Remember, continuous abstraction creates a solution engine. And just like you would with any engine, there are important practices to maintaining a healthy and working vehicle.

### Be Fuel-Efficient

Build your engine efficiently, over time. Every time you go back to add a feature or function to your engine, do so specifically to **solve a problem that already exists**. Just as you wouldn't buy a car with a 600 HP engine if you only do city driving, why would you add abilities to your engine that you aren't sure you're ever going to use? (If you would drive a 600 HP car in the city, there are likely other human complexes involved that we just don't have time to address here.)

Before you solve a new problem, add features related to that problem to your engine, and get busy solving. It's okay to think about how the new features will be used in the future, and to design them accordingly, but **to add features that don't solve an existing problem is an unnecessary leap of faith**.

### Unlock Your Hood & Simplify The Latch

You need to keep your hood unlocked -- make sure your entire team has access to your engine. In some cases, you might want to grant access to an entire community. And with whomever you grant access, ensure it's easy to get to your engine. Do what makes the most sense for you and your team.

### Draw & Maintain Detailed Schematics

And when people do get to your engine and want to do some work on it, make sure they know what they are looking at. Not everyone is an expert mechanic. And even expert mechanics don't always want to spend time learning every nuance of how you built your engine. Make sure the relevant pieces of your engine are well-documented.

And be smart about when you document your engine. Staying organized and documenting on the fly will minimize the refactoring period, and it will keep the documentation process feeling more like part of the building process and less like a separate project.

## Wrapping Up

I must admit, when I sat down to write about continuous abstraction, I didn't know where it was going to go. Frankly, I had just come up with the term a few days prior. As is usually the case for me, when I sit down to write about something, I end up fleshing out details and nuances I never thought were part of the original topic.

I'm happy to say that sticking to this process is working well for my current team. I would suspect that many of you reading this are already doing some form of continuous abstraction. I hope that by adopting the nuances of my methods into your existing processes, you can become even more efficient.

That being said, the process is a great distance from being perfect. I want you to share with me. Send me ideas. Send me results data.

Most of all, and as always, thanks for reading.
