---
title: The era of build over buy
description: >-
  The buy vs. build needle has moved. Here's why I'm building directly on
  foundational tools instead of reaching for the next hyped-up abstraction.
tags:
  - ai
  - developer-advice
related_posts:
  - ai-cant-read-your-thoughts
  - the-push-toward-async-work
  - finding-balance-with-context-switching
image: /posts/260205/build-over-buy-nqT5lJ_u.png
seo:
  image: /posts/260205/build-over-buy-X-2d8YbW--meta.png
---

We're in what I've been calling [the era of the personal app](/posts/era-of-the-personal-app/). Anybody can build anything they want — very specific to them, their workflows, their preferences. And if something doesn't work exactly the way you want it to, you can probably just rebuild it.

## The _buy vs. build_ needle has moved

You still need to make the _buy vs. build_ decision. That hasn't gone away. But for most builders, the needle has moved. Or will move soon.

For me, it's moved significantly. Instead of buying less-than-ideal solutions because of time and money constraints, I find myself reaching to build the precise solutions I want on top of a foundational layer of tooling that I buy.

## The current stack of foundational tools

Here's what I consider foundational right now — the base layer that everything else gets built on top of.

### A platform for building and deploying

You _could_ spin up and manage a VPS. You could wire and orchestrate all your AWS services. But why? Even when you're working through an AI agent, there are a lot of very low-level moving pieces that you have to manage — or rely on your agent to understand.

There's so much complexity and so many variable costs baked into that approach. It's just not worth it.

I'm biased, but I love Netlify because it handles a ton of that complexity for a very low cost. Even in the world of AI, that's a huge burden off the shoulders of a builder.

### Application frameworks

Frameworks are still essential. While we may see that decrease over time, they remain critical — even in the era of AI coding agents. They help agents create applications faster and cheaper. And that's unlikely to go away soon. It's especially true at scale, where you still want to minimize the number of moving pieces you (and your agent) have to manage.

### LLM coding agent and client

The thing that is actually doing the writing of the code you're managing today has become essential. It's the tool that has fundamentally changed the speed and economics of building software. As these models keep improving, the value of everything else in this stack compounds.

### A database service

As more people build dynamic applications, database services are absolutely essential. They're another piece of removing all that low-level complexity—offering services you would otherwise have to monitor, but now don't have to monitor as much.

You still own the product. You just own less of the infrastructure. And you can spin up more products around this common set of infrastructure. I most frequently reach for Netlify DB, a wrapper around Neon that is really fast to configure. Many developers also love Supabase, which [Bolt offers as a starting point](https://support.bolt.new/cloud/database#use-supabase-instead-of-bolt-database) today.

### File hosting

Many applications require file hosting. Fortunately, because I'm already on Netlify, it's pretty trivial to configure Netlify Blobs and Netlify Functions to essentially build my own file service. The lower-level stuff I don't need to worry about.

### Tools I use but don't consider foundational

There are still tools and libraries that I (or that my agent) reach for that I'd consider essential today, but they're less about infrastructure and more about code. They could eventually morph into my own solutions.

Authentication (Neon Auth is my go-to) and design systems (Tailwind is my go-to base layer) that are robust, and agents know how to work with them. But they aren't infrastructure. They're software. And in a world where building custom software is getting cheaper by the day, I consider them absolutely essential today, though they risk being replaced by personal solutions before anything else above.

## Building directly on my stack

As a builder with a deep history in software development, I want to build with that stack. Every time.

If what I want to build requires a specific workflow or integrations into other tools, I don't need another layer on top of that stack. I can just build it. And it's now trivial to make it completely customized to my exact needs.

It's so much faster than it was before. And it's constantly getting faster. I've been [running multiple projects at once](/posts/finding-balance-with-context-switching/) and building custom solutions in less time than it used to take to evaluate off-the-shelf alternatives.

And yet, it seems like there's a new tool on the market daily that sits above these services. I've struggled adopting these because they just feel like software that can be recreated to work exactly the way I want to work. (That may be completely wrong.) 

As a result, I've found myself investing my time and energy into the tools I think are here to stay, and I'm building custom solutions that fit my exact needs on top of them.

## Lower-level development isn't for everyone

This is not how I think everyone should operate today, though I do think it's something folks with a technical background should experiment with. Most developers would be surprised to learn how easy it is to go much lower-level than we have in the past and still move faster, resulting in something completely customized in less time than it would have taken to invest in a generic solution.

But for now (and probably for a long time to come), there's a huge market for tools that sit slightly above that foundational layer. These tools have been essential over the last year because they enable folks without a technical background to get started building something through agents that is completely customized to their needs. And it's very likely that many of these tools will stick around for a long time as a front door into creating software.

For the record, I'm intentionally not naming any names here. I don't want to discourage the use of tools that I've chosen not to use. If something's working for someone, I think they ought to keep using it. My point here is to push folks with that deeper technical understanding a little further in anticipation of what's to come.

## The convergence is coming

We're going to see rapid convergence — upward from the platform and downward from individual human capability.

Foundational tools are adding features at breakneck speed. They're bolstering their offering every month. And while they may never offer a full layer of abstraction on top of their current products, I expect they'll provide tools that make it easier to build AI workflows and work with AI agents you want to control.

For example, Anthropic will continue to push new features. Netlify will continue to push new features. Frameworks and databases — all the things I mentioned in my go-to stack — are all going to keep moving, and they're all going to keep moving faster than they ever have before.

At the same time, that work will have a residual effect, making it easier to build what you want at a lower level. The bar for entering will shift. I fully expect that developers get pushed a little higher level from where I am today. And I also expect the entry points for people without technical backgrounds to give them access to more capabilities from day one.

## The joy of building with control

AI development has opened up a whole new world of moving at lightning speed with the same level of control that developers are used to. We'll likely get to a point where developers don't need to go as low-level as they have before. But they will always need (and want) the level of control they've always had. And that control starts with [the thinking you do before prompting](/posts/ai-cant-read-your-thoughts/) — knowing what you want to build and why.

And that's why AI development feels so good to me right now. I can create things lightning fast, and I never feel like something's been taken away from me. Instead, I have a new tool that has pushed me one step further up the path of convergence.

That push will continue. But the joy of creating, the speed of creating, the level of control in creating — those things are not going away. If anything is going to change, it's that the speed and joy will increase.

That's why I'm having so much fun building today. And it's why I'm really excited for the future of software development. Once you have a strong foundation, the key is learning [when to stay hands-on and when to hand things off](/posts/the-push-toward-async-work/).
