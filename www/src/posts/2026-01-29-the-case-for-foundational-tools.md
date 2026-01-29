---
title: The case for foundational tools
description: >-
  Why I'm sticking to boring basics rather than jumping on new all-in-one AI app
  builders. Owning the orchestration layer is the sweet spot.
tags:
  - ai
  - developer-advice
  - architecture
---

I spent the better part of two full days last week absolutely hammering on Claude. Further than I've ever pushed it before. I hit my token limit on the max plan — which I didn't even know was possible until Friday.

And my brain did something interesting in that time. It transported me back to about a decade ago, to my Rails days. The first time in a long, long time that I felt truly obsessed with what I was doing. Head in the sand, absolutely cranking. Hitting walls and getting pissed off because I wanted the thing to work and I wanted it to work _right now_.

In the midst of all that, I had some realizations about tools. Specifically, about the ones I'm choosing to build on.

## The buy vs. build needle has moved

We're in what I've been calling the age of the personal app. Anything anybody wants to build, they can build. Very specific to them, their workflows, their preferences. In this world, most apps are a dime a dozen.

But you still need to make the buy versus build decision. That hasn't gone away. It's just that the needle — for most people — has moved. Or will move. Or continues to move.

For me, it's moved significantly. And here's where I've landed: there are foundational tools that I want to use because I don't want to manage the infrastructure, the product, or the code underneath. Either I don't want to, or I can't.

## What I mean by foundational tools

Here's my current stack of things I consider foundational:

- **Frameworks** — still essential. They're less essential than they were, and we might see that decrease over time. But they are absolutely essential now, especially if you want to build something serious. I've been reaching for more stripped-down versions lately, but they're still the starting point.
- **A platform for building and deploying** — yeah, you _can_ spin up a VPS. You _could_ wire and orchestrate all your AWS services. But you don't want to do that. You don't want an AI agent to do that. There's so much complexity and so many variable costs baked into that approach. I don't think we're going to get to a world where you don't need a platform that sits atop low-level infrastructure. Which is part of why I feel so passionate about Netlify.
- **A database service** — I'm using Netlify DB, which wraps around Neon. Services like Neon and Supabase also ship with auth or a wrapper around auth.
- **The model and the client** — Claude for crafting the code that helps me move fast.

With that combination, I generally don't need anything else. Maybe Tailwind. Eventually I'll probably spin up my own design system. But that's mostly it.

## Owning the orchestration layer

My point is this: there's a low level of tools I need to do my job. And then there are services that sit _on top_ of that. There's some amazing work being done in that space — tools like Replit and others.

But here's my view of the world right now: that base layer is what I want. And then I want to _orchestrate_ everything else around it.

Anthropic's going to keep pushing new features. Netlify's going to keep pushing new features. Frameworks adapt. Databases adapt. That combination is all I need to orchestrate exactly what I need.

If I pick up something else — some new abstraction — I don't have a lot of confidence that I'm not going to want to throw it away in a month. That's not entirely wrong. But I can invest my time and energy into the tools I think are here to stay, and then build on top of that.

## This isn't for everyone

Look, I get that this view of the world isn't what all builders should have. Especially folks who don't have a developer background.

I've got that developer background. I want to manage a little bit more. I want to control these workflows. And I feel like I have the knowledge to build the abstraction layer between the code that Claude is writing for me and the tools I rely on. To do that fast, alongside the other work I'm doing.

I don't think that's for everybody. Tools like Replit are very valuable for a large portion of the population. They solve real problems for people who want to build without wiring things together themselves.

## The convergence is coming

Here's what I think is probably going to happen: you'll see this converge from both sides.

On one side, foundational tools are going to continue getting more featureful. They'll level up their layers of abstraction. They're not going to add a _whole_ layer of abstraction, probably. But they'll provide tools that make it easier to build AI workflows, in a way that you want to control.

On the other side, it's going to get easier to build what you want at a lower level. The bar will shift.

So we're going to come together. I just happen to be on one side of it today.

## Where I'm landing

So for now, I'm staying with the boring stuff. Netlify. Frameworks. Databases. Auth. The tools that have proven themselves.

And I'm using AI to orchestrate all of it — to write the code, to connect the pieces, to move faster than I've ever moved before. That's the sweet spot for me. Foundational tools plus AI orchestration.

Maybe in a year or two, I'll feel differently. Maybe the new abstractions will have earned my trust. Maybe that convergence will mean I'm comfortable owning more of the abstraction process.

I guess we'll find out.
