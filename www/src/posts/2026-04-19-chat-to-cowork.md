---
title: Using a handoff doc to move a project from Claude Chat to Cowork
description: >-
  A quick workaround for preserving context history when wanting to move a
  project from Claude Chat to Cowork.
tags:
  - ai
  - claude
  - cowork
  - ai-workflow
  - productivity
date: 2026-04-19T00:00:00.000Z
image: /posts/260419/chat-to-cowork-yVnCjA6Z.png
seo:
  image: /posts/260419/chat-to-cowork-Y44oMnMC--meta.png
---

On the surface, moving a Claude Chat project into Cowork looks simple. You go to Projects, click "Import," pick your project, and it comes right over.

Except when you open it, there's nothing there. No decisions, no history, no context — just a blank slate.

I ran into this with a personal rebranding project. The back-and-forth had been going really well — we'd worked through a color system, landed on a palette I was happy with, and I was ready to start actually building things out. That meant moving to Cowork, where I could have the agent write to files, create assets, run a real project. And when I made the switch, the new agent had no idea any of it had happened.

The import feature just doesn't carry your conversation history. That might change eventually. For now, here's what I do.

## Create a handoff doc before you leave

Before you close out your Chat project, ask the agent to package up everything that matters. What I asked mine was roughly:

> "I'm going to move this project over to Cowork. Is there a way for me to export and copy the history? Including references to files you've created, questions you've asked me with the answers, et cetera."

It created a handoff document — a structured summary of all the decisions we'd made, the iterations on the palette, the reasoning behind choices, what was still open. It also dropped the reference files into a folder alongside it so the new agent would have everything it needed.

That's the whole thing. Two minutes, maybe.

## Drop the folder in and point the new agent at it

Once you're in Cowork, drop that folder into your working directory and tell the agent where to look:

> "The project handoff docs are now in the working directory. You can see we have a final palette — that's locked in. But you should see the full history of the decisions made. Now we've got to nail down the typefaces. Let's pick it up from there."

The agent reads through it, gets oriented, and you're moving again without having to re-explain everything from scratch.

## Claude synthesizes — it doesn't just dump a transcript

One thing I've come to appreciate about this approach: when you ask Claude to create a handoff doc, it's not just writing out a raw transcript. It's distilling what actually mattered — the decisions, the open questions, the reasoning that led there. That compressed version is more useful to a new agent than a chat log would be, because it's organized around what matters rather than the order things happened.

I've started using this pattern beyond just Chat → Cowork migrations. Any time I'm picking up a thread in a new session, I'll ask the previous agent to write a brief summary of where things landed. It keeps things coherent without requiring you to re-litigate decisions you've already made. (I wrote about [the full publishing pipeline I've built around this kind of workflow](/posts/how-i-built-a-video-to-published-pipeline-with-claude-cowork/) if you want more context on how it all fits together.)

## Context continuity is still an unsolved problem in AI tools

There's a real gap in AI tooling right now around carrying what you've learned and decided across sessions, tools, and agents. The handoff doc is a workaround — but it points at something worth thinking about: the value of a project isn't just in the output files, it's in the reasoning and decisions that led there. Preserving and reusing that reasoning is one of the more underrated parts of working effectively with these tools.

For now: ask for the handoff doc before you move. It takes two minutes and it's reliable.
