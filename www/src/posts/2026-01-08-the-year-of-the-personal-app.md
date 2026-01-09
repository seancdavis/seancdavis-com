---
title: The era of the personal app
description: >-
  AI has advanced beyond silly little demos. It's now enabling anyone to build
  personal software catered to their unique needs and preferences.
tags:
  - ai
  - developer-advice
image: /posts/260108/the-year-of-the-personal-app-rlJeXZ0d.png
seo:
  image: /posts/260108/the-year-of-the-personal-app--JTYip_N--meta.png
---

I read [Matt Biilmann's predictions for 2026](https://biilmann.blog/articles/predictions-for-2026/) and it got me thinking about where we're headed.

I have one specific take: we're on the precipice of the era of personal software.

## The problem with software today

When we have a problem that can be solved with software, we generally reach for an existing app. Both the [Google Play Store](https://www.androidheadlines.com/2013/07/google-play-store-beats-apples-appstore-to-1-million-apps-available.html) and App Store hit 1 million applications back in 2013. People have been reaching for software to solve specific problems for a long time.

But there have always been two opposing challenges with this model.

### 1. Software built for the masses, not for you

You find an app that somebody else built, and it either doesn't have everything you need, isn't customizable enough, or requires workarounds to fit your workflow.

It's not built _for you_ — it's built for a lot of people _like_ you. You end up adjusting how you work to fit the tool.

Even enterprises have spent hundreds of thousands of dollars or more on software because it has been more cost-effective than building and maintaining custom software.

### 2. Generic tools require manual work

When there's no app that fits, or it's too expensive, or it's just not quite right, people reach for generic tools. Spreadsheets. Notion databases. Google Docs.

These tools offer flexibility, but you either need to be a power user to customize them, or you end up doing a lot of manual work. They're not designed for your specific case. You're just using a generic tool and layering your own (unoptimized) process on top.

Neither option is ideal. One forces you to bend to the software. The other forces you to do the work the software should be doing.

## AI makes personal software viable

We've seen an explosion in tools like Bolt and Lovable over the last year. People building little projects, silly things, games, basic websites.

[My seven-year-old built an app](/posts/my-7-year-old-daughter-built-a-full-stack-application/) in a couple hours. Amazing! She had a specific thing she wanted to do, and we worked together to use Bolt to bring it to life.

But a lot of what's come out of these tools has been just that — demos, experiments, goofy side projects. Not super serious tools.

That's changing.

I'm seeing more and more people really relying on AI to write their code. More converts to this new way of working. I just caught this from Ben Holmes yesterday:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">A lot of developers are using agents to write their code these days. I was a hold-out... but Claude Opus 4.5 finally cracked me.<br><br>So, I made a video walking through how I write code with agents end-to-end. We&#39;ll talk plans, rules, and everything else in my setup! <a href="https://t.co/6BlgRwbUXQ">pic.twitter.com/6BlgRwbUXQ</a></p>&mdash; Ben Holmes (@BHolmesDev) <a href="https://twitter.com/BHolmesDev/status/2008601602500997376?ref_src=twsrc%5Etfw">January 6, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### The personal app becomes viable

As tools like Claude Code, Codex, and Gemini become more capable of building real software, the personal app becomes viable.

It's not just _I can build my own silly little website_. It's _I have a problem I need to solve, and now I can build an application specifically designed to enable me to work the way I want to work_.

### As your needs change, you can change the software

You don't have to bend to the current tool or consider scaling up to some enterprise plan with features you don't need. You can just change the software whenever your needs change. And this can be a matter of minutes to hours, not days to months to years.

### Agents baked into your tools

It's becoming trivial to build custom agents into these applications — automated workflows baked right into tools designed for exactly how you operate. It's not just building catered workflows to serve how you've worked in the past, but adding AI into those flows to elevate how you work going forward.

## Two examples I'm planning to build

I have two projects I want to build on an [upcoming live stream](https://www.youtube.com/@seancdavis29/live). Both are things I currently do in Notion. Both work fine. Neither is ideal.

### Weekly goals

Back in 2020, I started running my personal life in mini sprints. Every week, I create a new entry in Notion with a list of what I want to get done. It's been so effective that I've kept it up for almost five years.

But it's manual. Every Monday I open a new sheet, do a quick retro on the previous week, carry over tasks, delete the ones that didn't make it, start fresh. When new ideas come up mid-week, I have to dump them somewhere — but they end up distracting me from the current week. I don't have a good system for deciding when something should drop off. The retros are messy.

In an hour or less, I could build an application designed for exactly how I handle weekly goals. A clean way to capture upcoming ideas without cluttering the current week. Better data than Notion gives me today.

And I can add AI into the application to help me understand how many tasks I should be adding to hit my completion target every week. It could also include suggestions based on history and auto-generate retro summaries.

There is so much opportunity to make this process better, to build it for exactly how I want to work.

### Earworms

Almost every day, I wake up with a song stuck in my head. The house is dark and quiet, and there's music playing in my brain. Weird, right?

Years ago, I thought it would be interesting to record these. I actually built a Rails app at one point that would search a music API and pull everything into a database. It was a pain to build and maintain, so eventually I moved to Notion.

The current process is:

1. Find the song on Spotify and copy the link.
2. Create a new database entry in Notion. Paste the link and convert it to an embedded Spotify player.
3. Manually write the artist and title of the song and today's date.
4. Inspect the iframe of the embedded Spotify player to get the artwork for that song's album.

It works, but it's tedious. And honestly, building a custom tool to streamline this was never high enough priority to justify the effort.

But today, in one session, I could build an app where I just type a song name — or even some lyrics — and an agent goes and finds the Spotify link, the song title, the artist, the album art. Done. All that data gets captured with almost no friction. I could also build visualizations that are interesting to me.

These examples are silly, but they're fun and they're useful to me. They also enable me to do what I want to do more productively. And that's what I mean by the personal app.

## The web isn't going anywhere

I'm not someone who thinks everything is going to become a chatbot. That's boring. People like beautiful things. The web and UIs aren't going away anytime soon.

The web is such a powerful platform. And now we have the tools to build exactly what we need on top of it, without the months of effort it used to require.

Notion might remain my back end for some of these things. But standing up custom front ends is becoming trivial. Maintaining them is also becoming trivial — when something breaks, you just give the agent the error and it gets fixed.

It has me mildly overwhelmed, but mostly excited. So let's go build!
