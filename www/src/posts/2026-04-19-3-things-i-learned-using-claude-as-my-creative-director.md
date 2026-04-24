---
title: 3 things I learned using Claude as my creative director
description: >-
  I'm using Claude as the creative director for my personal rebrand, where I
  play the client and Claude is the agency. This is what I've learned so far.
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

I set out to work through a personal rebrand project. This is something I've worked through multiple times over my career. And every time, it's really difficult to get started. The blank canvas can be a paralyzing place to work.

What I've found is that when I can do anything, it's difficult to focus. I fall back into my comfort zone: tiny execution details. Fonts, specific hex values, whether a particular shade of blue feels right. I lose sight of the bigger picture. As a result, I've never felt like the output has matched the level of polish I know I'm capable of.

This time I tried something different. I put myself in the client seat and handed Claude the wheel as creative director.

## Start with a project brief that defines the roles clearly

The most important thing I did up front was being explicit about the roles that both Claude and I were playing in the project.

I told Claude something like this:

```
You're the creative director. I'm the client. Your job is to do the research, ask me specific questions, and guide me to answers. You are the driver. My job is to react and approve.
```

Claude took that direction and got right to work. It scraped my website and social profiles to understand who I am publicly and came back with very focused questions. Not "what colors do you like?" but "when you see this brand living in the wild, what's the overall energy you want?" That's a creative director question. It got useful answers out of me because it wasn't asking me to already know what I wanted.

### Keep the brief... brief.

The brief I set up was short. I gave a one-paragraph summary of who I am, where you can find information about me on the web, the scope of our working relationship, and the next steps. And that was it.

### Prompt for specific questions before executing

The research step mattered more than I expected. Claude came back with what it thought it knew about me, I corrected a few things, and then it asked its questions. Because it had context, the questions were actually specific.

### The value of choosing other

If you set up your interactions this way, Claude will often present multiple-choice options. Choose other and add context to your answer. If you just pick one of the predefined options, the agent is still going to make a lot of assumptions. Help reduce those assumptions. Even if your answer is "I'm choosing A, and here's why," that's more valuable than just clicking A.

## Use the eye doctor approach when you're starting from nothing

At some point in the conversation, Claude asked me if I had any visual references, sites or brands where I'd thought "I love how that feels."

I didn't. Not really. I had a vague sense, which is exactly what I've always worked with, and which is exactly the problem.

In the past, I'd gone and done the research myself by clicking around Dribbble, collecting a handful of screenshots, and then trying to understand what connected them. It worked, but it was slow, and it fed into that blank canvas problem that ultimately led me down a path that lacked the polish I desired.

So instead, I told Claude: you go find things. Show me a few different looks and feels, and I'll tell you what resonates. Then use that to figure out the next round.

I started calling it the eye doctor approach: is it better with lens one, or lens two? It worked really well. The key insight is that any reaction is useful information. You don't need to land on "I love this." Even "A feels terrible, B feels slightly less terrible" or "I like this piece from A and that piece from B" gives a designer, human or AI, something to work with. The goal isn't to converge immediately. It's to keep narrowing.

We went through a few rounds of this before landing on a color palette I genuinely liked. I pushed back on a few things. I wanted a specific color in there that Claude kept talking me out of, and ultimately landed somewhere that felt right. That back-and-forth process is the actual work.

## Get real artifacts, not just vibes

The third thing I learned is about where you end up. A brand direction that lives only in conversation isn't useful. You need assets you can actually do something with.

Once we'd settled on a color palette, I asked Claude to build it out the way Tailwind does, with all the shades and saturation levels for each brand color, so I'd have everything I'd eventually need for the web. It generated a `tokens.json` file and a markdown walkthrough for importing it directly into Figma.

{% post_image alt="Figma tokens.json and import instructions", src="/uploads/260419/2026-04-19-figma-output.png" %}

I was skeptical this would work cleanly. In the past, getting a color palette properly into Figma as variables has taken me 60 to 90 minutes. I'm not fast in Figma, and setting up tokens manually is tedious. This took less than ten minutes, including working through one small import hiccup.

From there, Claude generated SVG mockups I could drag directly into Figma. They're not using the token variables, just raw hex values, but all the styles and variables are sitting in Figma now, and I can start building components from there.

{% post_image alt="Palette mockups for Figma", src="/uploads/260419/2026-04-19-palette-grid.svg" %}

### This is still an incremental process

The rebrand isn't done. Not even close. It turned out to be a much bigger project than I'd scoped for a week, and I'm going to need real humans involved at some point to achieve my desired level of polish.

But the foundation is there, and the process felt different than it has before. Staying in the client role kept me from getting lost in execution details. The eye doctor approach got me out of the blank canvas paralysis. And I have actual Figma-ready assets to show for it, not just a mood board and a vague feeling.

If you're about to kick off a branding project, or honestly any creative project with a lot of open space, it's worth thinking hard about the roles before you start. Putting Claude in a specific seat and keeping yourself in a different one changes the quality of the output in ways I didn't expect.

I'll share more as this develops. But for now, back to building.
