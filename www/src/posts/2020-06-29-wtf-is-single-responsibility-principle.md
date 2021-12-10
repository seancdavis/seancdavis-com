---
title: WTF is the Single-Responsibility Principle?
description: "I often talk about the single-responsibility principle in the
  articles I write. What does it really mean? (Spoiler: It's probably exactly
  what you think.)"
tags:
  - wtf
image: /posts/default/default-pink-03.png
---

The single-responsibility principle is somewhat self-explanatory. It means that, in programming, everything — e.g. a class, function, module, plugin — should do one thing.

Some benefits to this approach include:

- It's easier to test code that has a primary purpose, making it more likely to be solid and stable.
- If multiple responsibilities are combined and one needs to change, it's more likely to break other responsibilities. By keeping functions and responsibilities separated, it increases the stability of the other parts within the larger system.
- It's often easier for a new developer to jump into the code and understand what the code is doing. However, there's a tradeoff in that by taking this approach, you're likely to introduce more dependencies to any given piece of code, which can also increase complexity.

Because the idea is for code to stay focused on one thing, I often describe this principle as _a chunk of code should do one thing and do it well_. I say that because I find an implication that by breaking up code into individual responsibilities, the resulting code should be better — more solid and stable, easier to read and understand — than it would have been if responsibilities were combined.
