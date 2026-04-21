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
image: /posts/260419/move-claude-chat-project-to-cowork-JDOKQz79.png
seo:
  image: /posts/260419/move-claude-chat-project-to-cowork-IdYt2-3H--meta.png
---

On the surface, moving a Claude Chat project into Cowork looks simple. You go to Projects, click "Import," pick your project, and it comes right over.

When I tried that, the Cowork project had none of the context of the chat project.

That chat project had been going really well — I was happy with where we were. But we needed to transition to actually building some real assets, which meant moving that context over to Cowork was going to be crucial. It was immediately clear that I was going to have to rebuild that context for Cowork in order for it to be successful.

## Create a handoff doc before you migrate

Before you close out your Chat project, ask the agent to package up everything that matters. This is roughly what I asked mine:

```
I'm going to move this project over to Cowork. Is there a way for me to export
and copy the history? Including references to files you've created, questions
you've asked me with the answers, ETC.
```

The agent created a handoff doc in the chat project — a structured summary of all the decisions we'd made, the reasoning behind those decisions, and what the next steps were. It also dropped reference files into a folder alongside it so the new agent would have everything we needed.

## Onboard the new agent with the handoff materials

I moved that handoff documentation into the directory that got created when I spun up my new Cowork project, and then I told my agent to look through it to get a sense of what we were working with:

```
The project handoff docs are in the working directory. Look through the
directory, read these files, ask me any questions that you have, and then
let's move on to the next steps.
```

The agent reads through it, gets oriented, and I was up and running again without having to re-explain everything from scratch.

## A handoff doc is a synthesis, not a transcript

One thing that's important to note: we didn't end up exporting history. Claude in the chat project had all the necessary context, and I wanted a paper trail — but specifically on decisions, not on details that aren't going to matter in the future.

That's an important distinction. You can give too much context in these processes, especially if it's a project that's been running for a while. In this case, I wanted the history of the Q&A because that represented the critical inflection points — the reasoning that was going to give the new agent what it needed to hit the ground running. Not every detail, just the decisions.

If you'd been building up content over the course of a month and then migrating, that's a totally different story — you'd probably want to be more deliberate about what you include. The goal is to give the Cowork agent the minimum amount of information it needs to be successful, not a data dump. Depending on the volume of history you're working with, you may have to guide your agent a bit more than I did.

## The handoff doc isn't just for Chat → Cowork

The concept applies any time one agent is handing off to another and context matters. Switching tools, starting a new session after a long break, spinning up a second agent on a project that's been in progress — the same idea holds. Ask the current agent to synthesize what's most important, hand it to the next one, and you're ready to go.

Take this, run with it, and hopefully it helps you work more effectively with your AI agents.
