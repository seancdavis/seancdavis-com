---
title: An updated mental model for choosing the right AI tool
description: >-
  After six months of building furiously with AI, I've developed a revised
  framework for when and how to work with each AI tool.
tags:
  - ai
  - productivity
  - developer-advice
date: 2026-04-08
image: /posts/260408/claude-cowork-as-a-co-pilot-not-an-autopilot-wxRov2qo.png
seo:
  image: >-
    /posts/260408/claude-cowork-as-a-co-pilot-not-an-autopilot-ls-mCMmw--meta.png
---

I took some time off in March and was able to sit for a while with my thoughts. And one of the things I kept turning to was this tension I'd been feeling about how I use AI.

I'd spent six months just hammering. Building apps, spinning up agents, pushing as fast as I could. The tools had genuinely changed how I work — [AI coding finally clicked for me](/posts/ai-coding-finally-clicked/), and I'd hit that flow state I wrote about. But somewhere in there I started to notice a ceiling. Not in what I could build, but in how clearly I could think about what I _should_ build. Moving fast stops being useful when you're moving fast in every direction at once.

I came back from that trip with a clearer head and [a new approach to creating and sharing](/posts/my-new-approach-to-creating-and-sharing/). Weekly themes. Video-first content. Spending max one hour a day to produce something publishable. But that plan immediately raised a new question: _How do I work with these AI tools to make that possible?_

## The problem with "just use AI"

At any given moment, I might trigger an AI task through a Telegram message, a GitHub issue, a Raycast command, a Google search, Claude directly, Claude Code CLI, and more. Each one feels reasonable in isolation, but together they create too many entry points and too many different ways of working. It makes me feel inefficient — like my head is scattered across too many modes at once.

What I wanted was a stronger mental model. One where, based on the working mode I'm in, I have a clearer, more singular entry point — and the right tool waiting there.

After spending some time mapping this out, I think it breaks down cleanly along two axes: **how synchronous the work is** and **what the artifact looks like**. Those two things together largely determine which tool is the right fit.

### OpenClaw: async, structured capture

OpenClaw is an open-source project I've built for async capture from anywhere and everyday conversations. It runs via Telegram, so it's available whether I'm on a walk, in the car, or at a coffee shop at 6am. I use it for a food journal, personal journaling, building better habits, recording events and scenarios in a structured and predictable way — anything where I want to get something into my system without sitting down at a computer.

The artifact is always structured content stored somewhere I can access and evaluate it later. And once I post the message, I don't need to be there. That's the whole point.

### Claude Code CLI: synchronous, heavy development

When I need to build something serious — multi-file changes, complex architecture, anything that requires sustained back-and-forth — that's Claude Code CLI. I offload heavy cognitive work to it, but I have to be mentally in that working mode to get the most out of it. If I'm not, it feels less effective. It's synchronous adjacent: even when Claude is running, I'm close by.

### rocktree and Netlify agent runners: async coding tasks

There's a category I haven't talked much about yet: async coding tasks. These are coding jobs I want done without sitting in the driver's seat.

For my work at Netlify, I use Netlify's agent runners — a tool we're constantly improving to optimize that async workflow. For side projects, I've stood up a custom agent team I call rocktree. Its source of truth is a GitHub Projects board: it checks for issues that are ready to work, follows a series of defined tasks to get the job done, and sends it back to me for review.

The artifact is a pull request — concrete code output I can review and ship.

### Cowork: synchronous, repeatable workflows

And then there's Cowork. What I've landed on: Cowork is a _co-pilot_, not an autopilot. You're both in the cockpit. It's there for work where I'm already at my desk and the bottleneck is bandwidth, not judgment.

One example is the content engine I'm building — recording a video, transcribing it, writing a blog post, creating a thumbnail, uploading to YouTube, posting on socials. Another is filtering the noise out of social media timelines, which I wrote about in [my first experiment with Claude Cowork](/posts/my-first-experiment-with-claude-cowork/). Every step requires human judgment at the key moments, but the execution is something I can offload.

## Still refining

This model is designed to minimize the cognitive overhead of choosing and to keep me focused on getting work done based on the mode I'm in. When I'm capturing on the go, I reach for OpenClaw. When I have async coding work, rocktree or Netlify's agent runners handle it. When I'm building something serious, I open Claude Code CLI. When I'm executing a multi-step workflow at my desk, I open Cowork.

There are still edges I'm working out. But having the model at all has already reduced the friction of just getting started — I'm not spending five minutes deciding which tool to open. I just start.
