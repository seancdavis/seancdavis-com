---
title: 3 things I learned using Claude as my creative director
description: >-
  I've begun using Claude as my creative director for a personal rebrand —
  defining my role as the client and letting the agent drive the work. This is
  what I've learned so far.
tags:
  - ai
  - design
  - figma
  - productivity
date: 2026-04-19T00:00:00.000Z
image: >-
  /posts/260419/3-things-i-learned-using-claude-as-my-creative-director-VLUuKDZk.png
seo:
  image: >-
    /posts/260419/3-things-i-learned-using-claude-as-my-creative-director-pvZS85oE--meta.png
---

I set out last week to work through a personal rebrand project. Simple enough concept. But here's the thing I kept running into every time I've tried this in the past: the blank canvas is paralyzing.

When you can do anything, you end up doing nothing well. I'd get so deep into execution details — fonts, specific hex values, whether a particular shade of blue felt right — that I'd lose sight of the bigger picture. I've rebranded before, and I've always landed somewhere I could work with. But I've never felt like the result matched the level of polish I knew I was capable of.

This time I tried something different. I put myself in the client seat and handed Claude the wheel as creative director.

Here's what I learned.

## Start with a project brief that defines the roles clearly

The most important thing I did upfront wasn't writing a great brief — it was being explicit about _who_ we each were in this project.

I told Claude: you're the creative director. You're driving. I'm the client. I want you to do the research, ask me specific questions, and guide me to the answers. My job is to react and decide. Your job is to push.

This framing changed everything about how the conversation went. Instead of Claude waiting for me to direct it, it went off and did homework — scraped my website and social profiles, built a picture of who I am publicly, and came back with pointed questions. Not "what colors do you like?" but "when you picture this brand living in the wild, what's the overall energy you want?" That's a creative director question. It got useful answers out of me because it wasn't asking me to already know what I wanted.

The brief I set up was short. Here's who I am, here's a social profile and my about page, and here's the scope: I want the beginnings of a look and feel I can apply to social profiles. Then I got out of the way.

### Have it ask specific questions before diving in

The research step mattered more than I expected. Claude came back with what it thought it knew about me, I corrected a few things, and _then_ it asked its questions. Because it had context, the questions were actually specific. And for every multiple-choice option it offered, I'd recommend ignoring the options entirely — just say "none of these, here's what I actually think." Any response with real texture is more useful than picking A or B.

## Use the eye doctor approach when you're starting from nothing

At some point in the conversation, Claude asked me if I had any visual references — sites or brands where I'd thought "I love how that feels."

I didn't. Not really. I had a vague sense, which is exactly what I've always worked with, and which is exactly the problem.

In the past, I'd have gone and done the research myself — spent an hour on Dribbble or Are.na, collected a bunch of screenshots, and tried to articulate what connected them. That's fine. But it's also slow, and the blank canvas problem follows you into that process too.

So instead, I told Claude: _you_ go find things. Show me a few different looks and feels, and I'll tell you what resonates. Then use that to figure out the next round.

I called this the eye doctor approach — "is it better with lens one, or lens two?" — and it worked really well. The key insight is that _any_ reaction is useful information. You don't need to land on "I love this." Even "A feels terrible, B feels slightly less terrible" or "I like this piece from A and that piece from B" gives a designer — human or AI — something to work with. The goal isn't to converge immediately. It's to keep narrowing.

We went through a few rounds of this before landing on a color palette I genuinely liked. I pushed back on a few things — I wanted a specific color in there that Claude kept talking me out of — and ultimately landed somewhere that felt right. That back-and-forth process is the actual work.

## Get real artifacts, not just vibes

The third thing I learned is about where you end up. A brand direction that lives only in conversation isn't useful. You need assets you can actually do something with.

Once we'd settled on a color palette, I asked Claude to build it out the way Tailwind does — all the shades and saturation levels for each brand color, so I'd have everything I'd eventually need for the web. It generated a `tokens.json` file and a markdown walkthrough for importing it directly into Figma.

I was skeptical this would work cleanly. In the past, getting a color palette properly into Figma as variables has taken me 60 to 90 minutes — I'm not fast in Figma, and setting up tokens manually is tedious. This took less than ten minutes, including working through one small import hiccup.

From there, Claude generated SVG mockups I could drag directly into Figma. They're not using the token variables — just raw hex values — but all the styles and variables are sitting in Figma now, and I can start building components from there.

### This is still an incremental process

I want to be clear: the rebrand isn't done. Not even close. It turned out to be a much bigger project than I'd scoped for a week, and I'm going to need real humans involved at some point to get to the level of polish I'm after. There are active threads in Claude right now for a wordmark, an avatar, and some card compositions. There's a lot more to come.

But the foundation is there, and the process felt different than it has before. Staying in the client role kept me from getting lost in execution details. The eye doctor approach got me out of the blank canvas paralysis. And I have actual Figma-ready assets to show for it — not just a mood board and a vague feeling.

If you're about to kick off a branding project — or honestly any creative project with a lot of open space — it's worth thinking hard about the roles before you start. Putting Claude in a specific seat and keeping yourself in a different one changes the quality of the output in ways I didn't expect.

I'll share more as this develops. It's still very much in progress.
