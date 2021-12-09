---
title: "Use a Code Spell Checker"
description: "Spell-checking isn't just for documentation."
image: /blog/210301/orange--code-spell-check.png
tags:
  - quick-tip
  - vscode
---

{% youtube_embed
    id="Trhj3d9TK5k",
    title="Quick Tip: Use a Code Spell Checker" %}

We move fast as developers. It's one thing to make a spelling mistake in documentation. Spelling mistakes in your code can lead to bugs. Bugs that could have been easily avoided with the help of a code spell checker.

One of my favorite VS Code plugins is [Code Spell Checker](https://github.com/streetsidesoftware/vscode-spell-checker). It's been a total game-changer for me. It catches spelling mistakes by putting that blue little squiggly line underneath misspelled words.

{% post_image
    src="/blog/210301/spell-checker.png",
    alt="Spell Checker - Incorrect Word",
    maxWidth="lg"  %}

It's even smart enough that it uses casing to determine where word breaks should be. (Look at the example above and notice that only the misspelled `Compnoent` is underlined, while `My` is left alone.)

And there's also user and workspace dictionaries to capture those weird words that should be treated as actual words, like _Eleventy_.

Even if you don't use VS Code, there's likely a plugin to help you with code spell-checking in your editor of choice.
