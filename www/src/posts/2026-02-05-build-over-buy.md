---
title: The era of build over buy
description: >-
  The buy vs. build needle has moved. Here's why I'm building directly on
  foundational tools instead of reaching for the next hyped-up abstraction.
tags:
  - ai
  - developer-advice
---

We're in what I've been calling [the era of the personal app](/posts/era-of-the-personal-app/). Anybody can build anything they want — very specific to them, their workflows, their preferences. And if something doesn't work exactly the way you want it to, you can probably just rebuild it.

## The buy vs. build needle has moved

You still need to make the buy versus build decision. That hasn't gone away. But for most builders, the needle has moved. Or will move soon.

For me, it's moved significantly. Instead of buying less-than-ideal solutions because of time and money constraints, I find myself reaching to build the precise solutions I want on top of a foundational layer of tooling that I buy.

## The current stack of foundational tools

Here's what I consider foundational right now — the base layer that everything else gets built on top of.

### Application frameworks

Frameworks are still essential. While we may see that decrease over time, they remain critical — even in the era of AI coding agents. They help agents create applications faster and cheaper. And that's unlikely to go away soon. It's especially true at scale, where you still want to minimize the number of moving pieces you have to manage.

### A platform for building and deploying

You _could_ spin up and manage a VPS. You _could_ wire and orchestrate all of your AWS services. But why? Even when you're working through an AI agent, there are a lot of very low-level moving pieces that you have to manage — or rely on your agent to understand.

There's so much complexity and so many variable costs baked into that approach. I'm biased, but I love Netlify because it handles a ton of that complexity for a very low cost. Even in the world of AI, that's a huge burden off the shoulders of a builder.

### A database service

As more people build dynamic applications, database services are absolutely essential. They're another piece of removing all that low-level complexity — offering services you would otherwise have to monitor, that you now don't have to monitor as much.

You still own the product. You just own less of the infrastructure. And you can spin up more products around this common set of infrastructure. I most frequently reach for Netlify DB, which is a wrapper around Neon. Supabase is another great option here.

### File hosting

A lot of applications need file hosting. Fortunately, because I'm already on Netlify, it's pretty trivial to configure Netlify Blobs and Netlify Functions to essentially build my own file service. The lower-level stuff I don't need to worry about.

### LLM coding agent and client

This is the big one. The LLM and client — this is the thing that is actually doing the writing of the code you're managing today. It's the tool that has fundamentally changed the speed and economics of building software. As these models keep improving, the value of everything else in this stack compounds.

### Tools I use but don't consider foundational

There are still tools and libraries that I — or that my agent — reaches for that I'd consider essential today, but they're less about infrastructure and more about code. They could eventually morph into my own solutions.

Authentication is one. Today I tend to use Neon Auth because I'm already using Netlify DB. Tailwind is another — it's a great, robust library, and agents work really well with it. But these aren't infrastructure. They're software. And in a world where building custom software is getting cheaper by the day, I don't consider them foundational the way I do the tools above. I do, however, use them on just about every project.

## Building directly on my stack

As a builder with a deep history in software development, that's the stack I want to build with. Every time.

If what I want to build requires a specific workflow or integrations into other tools, I don't need another layer on top of that stack. I can just build it. And it's now trivial to make it completely customized to exactly what I need.

It's so much faster than it was before. And it's constantly getting faster.

If I were to pick up a tool to help me build something today — when I understand how these pieces in my stack fit together — I'm not sure I wouldn't want to throw that tool away in a month. And I'm not sure it would solve exactly what I need in exactly the way I want it. So I invest my time and energy into the tools I think are here to stay, and build on top of that.

## Lower-level development isn't for everyone

I want to be clear: this is not how I think everyone should operate today. But I do think it's something folks with a technical background should experiment with. I think most of us would be surprised to learn how easy it is to go quite a bit lower level than we have in the past and still move faster — ending up with something completely customized in less time than it would have taken to invest in a generic solution.

But for now — and probably for a long time to come — there's a huge market for tools that sit slightly above that foundational layer. These tools have been essential over the last year because they enable folks without that technical background to get started building something through agents that is completely customized to what they need. And it's very likely that many of these tools will stick around for a long time as a front door — a first step into creating custom software for people who have no background in it.

I'm not naming any names here intentionally. I don't want to discourage use of tools that I've chosen not to use. If something's working for someone, I think they ought to keep using it. My point here is to push folks with that deeper technical understanding a little further in anticipation of what's to come.

## The convergence is coming

We're very quickly going to see a convergence — upward from the platform and downward from individual human capability.

Foundational tools are adding features at breakneck speed right now. They're bolstering their offering what seems like every month. And while they may not ever offer a full layer of abstraction on top of their products, I expect they'll provide tools that make it easier to build AI workflows and work with AI agents that you want to control.

Anthropic is going to keep pushing new features. Netlify is going to keep pushing new features. Frameworks and databases — all the things I mentioned in that stack — they're all going to keep moving, and they're all going to keep moving quickly.

At the same time, that work will have the residual effect of making it easier to build what you want at a lower level. The bar for where you can enter will shift. I fully expect that developers get pushed a little higher level from where I am today. And I also expect the entry points for people without technical backgrounds to give them access to more capabilities from day one.

## The joy of building with control

AI development has opened up a whole new world of moving at lightning speed with the same level of control that developers are used to. We'll likely get to a point where developers don't need to go as low level as they have before. But they will always need — and want — the level of control they've always had.

And that's why AI development feels so good to me right now. I can create things so fast, and I never feel like something's been taken away from me. Instead, I have a new tool that has pushed me one step further up the path of convergence.

That will probably continue. But the joy of creating, the speed of creating, the level of control in creating — those things are not going away. If anything is going to change, they're only going to increase.

That's why I'm having so much fun building today. And it's why I'm really excited for the future of software development.
