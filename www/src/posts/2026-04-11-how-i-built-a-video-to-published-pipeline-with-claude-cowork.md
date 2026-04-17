---
title: How I built a video-to-published pipeline with Claude Cowork
description: >-
  A walkthrough of the pipeline I built with Claude Cowork: I drop in a video,
  Claude handles distribution and promotion, and I stay in the loop as editor.
tags:
  - ai
  - productivity
  - developer-advice
date: 2026-04-11T00:00:00.000Z
image: >-
  /posts/260411/how-i-built-a-video-to-published-pipeline-with-claude-cowork-Qdu0M4K6.png
seo:
  image: >-
    /posts/260411/how-i-built-a-video-to-published-pipeline-with-claude-cowork-OqfD8bzO--meta.png
---

I've been producing various types of videos for many years. And even in the most streamlined scenarios — where I'm minimizing edits and treating the recording as though it were live — going from nothing to a published, distributed video is usually going to take three to four hours.

With that level of commitment, it's hard to produce as much as I want to. The work tends to span several days, so getting one video done in a week starts to feel like an accomplishment. That's not the pace I want.

After tinkering with Claude Cowork, I developed a hypothesis: if Cowork could handle a lot of those repeated tasks and I could keep my time focused on the recording and the things that require human judgment, I might just be able to record and publish daily.

## The one-hour daily goal

The goal I've established is to get through the recording, editing, distribution, and promotion process in about an hour — so I can do that essentially every day.

But to do that without sacrificing my voice — which is exactly what happens when I'm not careful about the process — I need to stay in the loop. Cowork handles the execution and proposes direction. I handle the judgment: the overall angle, the editing, making sure the voice that comes through is actually mine across every channel.

The point isn't to produce more content for its own sake. It's to get more of my actual thoughts into the world. There's a real difference between that and putting out content that's masquerading as me. This feels like the future of what it means to distribute your voice — more presence, less execution overhead.

## The video production pipeline

I have a project set up in Claude Cowork with a directory dedicated to this workflow. The pipeline runs through six phases, and I'm in the loop at each one.

### Phase 1: Recording

I record a video. I try to keep it to 10–20 minutes. If there were major goofs — a bug I'm waiting on, a long awkward pause, something egregious — I note the timestamp and cut it. Otherwise I treat it as though it were live and just go with it. Then I drop the exported video into an inbox folder inside my Cowork project directory.

### Phase 2: Cowork setup

Cowork picks up the video from the inbox, generates an appropriate slug for the project, creates a dated working directory, and moves the file in.

### Phase 3: Transcription and planning

Cowork runs the video through Whisper locally to produce a transcript. For a 20-minute recording, this usually takes a minute or two — fast enough that it doesn't feel like waiting.

Once the transcript is ready, Cowork proposes a YouTube title and description, a blog post title and description, and a general summary of the direction to take in the blog post to complement the video.

That last piece matters. While I might ramble in a video — jumping between threads, circling back, digressing — there's usually a more cohesive story that can be extracted for blog format. Staying too close to an off-the-cuff transcription tends to produce something erratic and unfocused. In some cases, there might actually be two blog posts worth of material in a single recording.

I review these proposals, give the go-ahead or push back and iterate, then approve to continue.

### Phase 4: Blog post draft

With the direction approved, Cowork drafts a full blog post following the style guide and rules I've established — to keep the structure consistent and ensure the voice is authentic to me, drawn directly from the transcript. It then submits that draft for review via a pull request on my repository, so I can see the deploy preview on Netlify and come back in chat with comments.

To comment, I typically record a voice note and share the transcription back in the chat thread with the agent. We continue to iterate until the post is ready to publish.

### Phase 5: YouTube video and thumbnail

In parallel with the blog post, Cowork opens Figma in the browser, finds my thumbnail template, and uses it to generate a proposal for the thumbnail for this particular video. I usually need to make a few tweaks, then export and drop the finalized version into the project directory. Once it's there, I tell Cowork it's ready — and it uploads the video with the appropriate title, description, and thumbnail, then sends me the YouTube URL.

### Phase 6: Social media promotion

Now with the video and blog post published, Cowork writes social promotion post drafts in a Markdown file in two sets. The first promotes the video and goes out immediately. The second promotes the blog post and gets scheduled for the following business day.

Each set has drafts for X, Bluesky, and LinkedIn. The tone varies to suit each platform without sacrificing my voice — punchy for X, link-card-aware for Bluesky, more reflective and long-form for LinkedIn.

I open that draft, make my edits, and tell Cowork when it's approved. Then it gets to work. For the platforms where it can post and schedule natively, it does that. For Bluesky — which has no native scheduling — it spins up a custom scheduled task that fires at the right time. Scheduling a platform that doesn't support scheduling. That part is genuinely clever.

## Early results

I've been through this process a few times now, and every time there's something small to tweak in the system. So it's definitely still taking more than an hour for each body of work.

At the same time, it feels really good. A lot is happening, and the foundation gets stronger each time. I'm still quite a ways from proving the hypothesis, but I don't think it's out of the question.

This feels like the future — getting more of what is actually my voice and my thinking out into the world, across various mediums, without needing to do as much of the execution myself. Like having a personal assistant throughout the entire video production process. I'm not quite there yet, but I'm excited about the prospect.
