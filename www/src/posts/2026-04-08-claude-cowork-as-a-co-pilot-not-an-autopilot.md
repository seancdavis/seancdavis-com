---
title: Claude Cowork as a co-pilot, not an autopilot
description: >-
  After six months of building furiously with AI, I finally have a mental model
  that makes sense of all these tools — and Cowork fits in a very specific spot.
tags:
  - ai
  - productivity
  - inspiration
  - developer-advice
image: /posts/260408/claude-cowork-as-a-co-pilot-not-an-autopilot-wxRov2qo.png
seo:
  image: >-
    /posts/260408/claude-cowork-as-a-co-pilot-not-an-autopilot-ls-mCMmw--meta.png
---

A few weeks back I took some PTO — part of it a solo camping trip, the kind where you actually get to sit with your thoughts for a while. And one of the things I kept turning over was this tension I'd been feeling about how I use AI.

I'd spent six months just hammering. Building apps, spinning up agents, pushing as fast as I could. The tools had genuinely changed how I work — [AI coding finally clicked for me](/posts/ai-coding-finally-clicked/), and I'd hit that flow state I wrote about. But somewhere in there I started to notice a ceiling. Not in what I could build, but in how clearly I could think about what I _should_ build. Moving fast stops being useful when you're moving fast in every direction at once.

I came back from that trip with a clearer head and [a new approach to creating and sharing](/posts/my-new-approach-to-creating-and-sharing/). Weekly themes. Video-first content. Spending max one hour a day to produce something publishable. But that plan immediately raised a new question: how do I actually use these AI tools to make that happen?

That's what I've been figuring out this week.

## The problem with "just use AI"

I use a lot of AI tools. Claude Code for heavy development. A thin wrapper I've built around the Claude API — I'm calling it OpenClaw — for async capture from anywhere (it runs via Telegram, which means I can use it from my phone at 6am without sitting down at a computer). A custom agent team called RockTree for certain async coding tasks. And now Cowork.

The thing I kept bumping into was that I didn't have a clean mental model for _when_ to reach for which one. And without that mental model, every tool starts to feel like overhead. You spend cognitive energy deciding whether to open this app or that app, and the tools that were supposed to make you faster start making you slower.

So I spent a chunk of yesterday mapping it out. And I think it breaks down cleanly along two axes: **where you are** and **how synchronous the work is**.

### OpenClaw: anywhere, async, quick capture

OpenClaw lives on my phone via Telegram. That's its whole value. It doesn't matter if I'm on a walk, in the car, at a coffee shop — I can send it a message and it goes into my system with the rules already set up. I use it right now primarily as a food journal, but the point is that it's _available_. The cost of capture is basically zero.

That's the job. Quick, async, available everywhere.

### Claude Code: at the computer, heavy dev

When I need to actually build something serious — multi-file changes, complex architecture, anything that requires sustained back-and-forth — that's Claude Code. It's synchronous in the sense that I'm in the driver's seat the whole time, but it's also capable of running without me looking at it every thirty seconds. I offload heavy cognitive work to it.

### Cowork: at the computer, co-pilot

And then there's Cowork. And this is where I've landed on what I think is the most important piece of the mental model.

Cowork is a _co-pilot_, not an autopilot.

Your co-pilot is not going to fly the plane without you. You're both in the cockpit. You just need some help getting from point A to point B. That's the whole thing. Cowork makes sense for work where I'm already in front of the computer and I want to move faster — repeatable processes, things with a lot of steps, anything where the bottleneck is my own bandwidth rather than my judgment.

For me right now, that means the content engine: recording a video, transcribing it, writing a blog post, creating a thumbnail, uploading to YouTube, posting on socials. Every step of that requires human judgment at the key moments, but the execution is something I can offload. That's a Cowork job.

## Replacing an app with a workflow

The other thing I want to talk about is paredown — a little social media filtering app I built. The idea was to ingest posts from my Twitter lists, run them through AI-powered filters, and surface only what was actually relevant to me. It worked. Kind of. It was clunky, it depended on a scraping service I was paying $30/month for, and the lists had to be public, which was its own problem.

I'd been noodling on how to improve it, and yesterday I realized: this is a better Cowork job than an app job.

Part of what pushed me toward rebuilding paredown as an app originally was the [era of the personal app](/posts/era-of-the-personal-app/) mentality — and I still believe in that. But the more time I spend with Cowork, the clearer the distinction becomes. Build an app when you need to collaborate, distribute, or share the mechanism with other people. Build an app when the thing needs to run on a schedule you're not around for. 

But when you're already sitting at your desk and you want to do a quick review of what's worth your attention? That's a co-pilot job. I can just say: _hey, let's look at what's out there this morning_ — and it goes and does it, shows me the results, and I decide what to do with them.

I rebuilt that workflow in Cowork yesterday morning. It's not just reading my lists anymore — it also does dynamic discovery based on whatever I tell it to look for that day. It flags potential new accounts worth following. It keeps memory across sessions. And because I'm sitting there with it, I can redirect it in real time. No app needed.

## Why I was skeptical and why I changed my mind

I'll be honest — I initially wrote Cowork off as not for developers. I figured it was a productivity tool for non-technical users and I could just use Claude Code for everything. That was wrong.

What I missed is that Cowork fills a gap that Claude Code doesn't. Code is for _building_. Cowork is for _doing_ — executing multi-step workflows where the work itself isn't software development. There's a whole category of stuff I do every day that falls into that bucket, and I'd been either doing it manually or ignoring it.

The content engine I'm building this week is a perfect example. Writing a blog post, creating a thumbnail in Figma, uploading a video to YouTube, posting on three social platforms — that's not a development task. It's a repeatable workflow. And having a co-pilot run alongside me while I do it is genuinely faster than doing it alone.

I don't know exactly where this goes. I'm on day one. But it has me excited in the same way that Claude Code got me excited about a year ago — this sense that the ceiling just got a lot higher. And yeah, I'm still figuring it out. But I'll keep you posted.

We'll see how this goes.
