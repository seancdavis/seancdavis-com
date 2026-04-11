---
title: How I built a video-to-published pipeline with Claude Cowork
description: >-
  A walkthrough of the automated publishing pipeline I built this week: drop a
  video in a folder, and Claude handles transcription, YouTube upload, thumbnail
  drafting, blog post generation, and social scheduling — with me as editor.
tags:
  - ai
  - productivity
  - developer-advice
date: 2026-04-11T00:00:00.000Z
image: >-
  /posts/260411/how-i-built-a-video-to-published-pipeline-with-claude-cowork-PBOUO8ri.png
seo:
  image: >-
    /posts/260411/how-i-built-a-video-to-published-pipeline-with-claude-cowork-68Lac9Ut--meta.png
---

I've been producing videos for a while. And even when I'm keeping things intentionally loose — minimal edits, live-adjacent delivery — going from a raw recording to something published and promoted has consistently taken me two to four hours. That's the kind of friction that makes you record less, share less, put less out into the world.

My hypothesis going into this week: most of that time is spent on repeatable execution tasks, not judgment calls. And if that's true, a lot of it should be delegatable to an AI co-pilot.

So I built a pipeline with Claude Cowork to test it. Here's how it works.

## The goal

I want to record for 15–20 minutes, do a light editing pass, and be completely done — video live, blog post drafted, social posts sent or scheduled — in under an hour total. That's the hypothesis. This week was the first real attempt at it.

I'm not trying to hand the whole thing to an AI and walk away. I want to stay in every loop. The reason is simple: this is my voice, my ideas, my audience. AI can handle the execution. The judgment — what angle to take, whether a draft actually sounds like me, which ideas are worth emphasizing — that stays with me. What I'm optimizing for is getting *more* of my thinking out into the world, not a faster way to ship content I haven't really looked at.

## The setup

I have a project folder in Claude Cowork with a single inbox directory. When I'm done with a light edit, I export the video and drop it in that folder. Then I start a session and say go.

The pipeline runs through six phases, and I'm involved at specific checkpoints.

### Phase 1: Intake

Cowork picks up the video from the inbox, derives a slug from the filename, creates a dated working directory, and moves the file in. This is pure bookkeeping and takes a few seconds. When it's done, the folder is ready and the inbox is empty.

### Phase 2: Transcription and planning

The first real step is transcription. Cowork runs the video through Whisper locally and produces a transcript. For a 20-minute recording, this has taken about a minute — fast enough that it doesn't feel like waiting.

With the transcript in hand, Cowork proposes a YouTube title and description, a blog post title and description, and a note on whether the blog should take a different angle than the video. That last part matters. A 20-minute rambling conversation has a lot of threads in it. A blog post works better when it's making one argument. So sometimes the blog title and frame diverge from the video's, and that's intentional.

I review these proposals, iterate back and forth until they're right, and give the go-ahead. Only then does anything else happen.

### Phase 3: Blog post and PR

Once I approve the plan, Cowork drafts a full blog post in my voice — first-person, conversational, structured around the approved angle. It saves the draft to the working directory, then creates a branch in my `seancdavis-com` repo, commits the post file, and opens a pull request. I get a link to review the draft in GitHub.

I don't merge the PR at this point. That's another deliberate checkpoint. I'll read the draft, edit what needs editing, and merge when it's actually ready — not just when it's generated.

### Phase 4: Thumbnail and YouTube upload

In parallel with the blog post, Cowork opens Figma in the browser, finds my thumbnail template, duplicates the most recent frame, drops it into the current month's column, and updates the text with the approved title. It takes a screenshot and sends it to me: here's the thumbnail draft, make any tweaks, tell me when it's ready to export.

Once I confirm, it exports the thumbnail as a PNG and uploads it to YouTube alongside the video — using the YouTube API with credentials I've set up in a project folder. Title, description, tags, and thumbnail all get set in one shot. It sends me the YouTube URL.

This is the phase that surprised me most. I expected it to be clunky. It was not. Having a co-pilot handle the YouTube upload, which I genuinely dislike doing manually, while I do something else — that alone felt like a real unlock.

### Phase 5: Social post drafts

With the YouTube URL in hand, Cowork writes a social-posts markdown file structured into two sets:

- **Set 1** — posts about the video, to go out immediately
- **Set 2** — posts about the blog, to be scheduled for the next business day

Each set has drafts for X, Bluesky, and LinkedIn. The tone varies by platform: punchy for X, link-card-optimized for Bluesky, more reflective and long-form for LinkedIn.

I open that file in VS Code, edit what I want to change, and reply saying it's ready.

One manual exception: X video posts. The video embeds better when it's posted natively, which requires me to do it myself. Cowork writes me the suggested copy and I handle that one.

### Phase 6: Post and schedule

Cowork posts the Set 1 content immediately — Bluesky via the AT Protocol API, LinkedIn via browser automation against the shadow DOM. For the scheduled Set 2 content, it uses Twitter's and LinkedIn's built-in scheduling UIs for those platforms, and for Bluesky (which has no native scheduling), it creates a one-time scheduled task inside Cowork that fires at the right time.

That last part is genuinely clever. Cowork scheduling itself to post something later, because the platform doesn't support it natively. It handled all of this during our first real run.

## How it went

The first run wasn't perfect. The transcript looked great. The YouTube upload worked. The blog draft needed edits — the initial version tried to cover two different threads from the video and I split it into two separate posts. The Bluesky posting required a few iterations before it got the link card preview working right. The LinkedIn post went through cleanly.

Total time from recording to published: longer than an hour this first time, mostly because I was working through the setup while building it. That's fine. The point of week one was to get the mechanism in place, not to hit the time goal yet.

Week two is where the actual test starts. Recording every day, targeting four to five hours total across the whole week, and seeing if I can come away with four to five distinct assets — video and written — actually out in the world. I think the answer is yes. I'll find out.

## What I'm not doing

I want to be clear about what's not happening here. Cowork is not writing for me. It's writing *from* me — from transcripts of me talking, from direction I give it in the chat, from edits I make before anything goes live. My voice doesn't go away because an AI is handling logistics. It stays in the work because I'm in every approval loop, and nothing ships without me having read and signed off on it.

The goal isn't to produce more content automatically. It's to remove the execution overhead so that the time I spend on content is spent on things that actually require my judgment — the ideas, the framing, the editing pass — rather than YouTube upload queues and social scheduling UIs.

That feels like the right way to use these tools. More of my thinking in the world, less of my time spent on the parts of publishing that a computer can handle. We'll see if the hypothesis holds.
