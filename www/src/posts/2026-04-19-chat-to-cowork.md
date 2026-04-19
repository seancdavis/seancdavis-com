---
title: "The Handoff Doc: How to Move a Claude Chat Project to Cowork Without Losing Context"
description: >-
  When you move a Claude Chat project to Cowork, the import feature doesn't carry your conversation history. Here's a simple workaround using a handoff doc to preserve the context that matters.
tags:
  - claude
  - cowork
  - ai-workflow
  - productivity
---

If you've been working in Claude Chat and hit the point where you need more than conversation — you want file output, a working directory, an agent that can actually *build things* — the natural move is to take that project to Cowork. And on the surface, Claude makes it look easy. You go to Projects, click "Import," pick your Chat project, and done.

Except it's not done. What you actually get is a blank Cowork project with none of your history.

I ran into this with a personal rebranding project I'd been working on. Weeks of back-and-forth with a Chat agent: color palette decisions, brand direction Q&A, iterations on the visual language. We'd landed on a palette I was really happy with, and I was ready to start building actual assets. That meant moving to Cowork. And when I did, the new agent had no idea any of it had happened.

Here's what I do instead.

## The Handoff Doc

Before you leave your Chat project, ask the agent to create a handoff document. Something like this works well:

> "I'm going to move this project over to Cowork. Can you create a handoff document with the full history of our work — decisions we've made, questions you've asked me with my answers, files we've created, and anything the next agent needs to know to pick up where we left off?"

The agent will pull together a structured summary of everything meaningful from your conversation. In my case it included the final palette, the iterations we'd gone through, the reasoning behind the choices, and notes on what was still open. It also dropped the reference files — palette exports, mood board notes — into a folder alongside the document.

That's it. That's the whole trick.

## Picking It Up in Cowork

Once you're in the new Cowork project, you drop that folder into your working directory and tell the agent where to look:

> "The project handoff docs are in the working directory. The final palette is locked in, but you'll see the full decision history. Let's pick up from typeface selection."

The agent reads the handoff doc, gets up to speed, and you're moving again without having to re-explain anything.

It's a manual step, but it takes about two minutes. And it's a much more reliable way to carry context than hoping the import feature does what you expect — at least right now.

## Why This Works

Claude is really good at synthesis. When you ask it to create a handoff doc, it's not just dumping a transcript — it's distilling the meaningful stuff: the decisions, the open questions, the artifacts. That compressed context is actually more useful to a new agent than a raw chat log would be, because it's organized around what matters rather than the chronological order things happened.

I've started using this pattern beyond just Chat→Cowork migrations. Any time I'm starting a new conversation on a topic I've explored before, I'll ask the previous agent to write a brief summary of where we landed. It's a lightweight way to build continuity across sessions.

## The Bigger Picture

Right now there's a real gap in AI tooling around context continuity — carrying what you've learned and decided across sessions, tools, and agents. The handoff doc is a workaround, but it points at something important: the value of a project isn't just in the output files, it's in the reasoning and decisions that led there. Finding ways to preserve and reuse that reasoning is one of the more underrated parts of working effectively with AI tools.

For now though: before you move projects, ask for the handoff doc. Your future self will thank you.
