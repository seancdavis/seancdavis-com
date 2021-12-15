---
title: "VS Code Spell Checker Not Working"
description: "Did your squigglies disappear?? Here's the most likely culprit."
image: /posts/210302/orange--code-spell-check-x.png
tags:
  - vscode
---

{% youtube_embed
    id="Trhj3d9TK5k",
    title="Quick Tip: Use a Code Spell Checker" %}

[I ❤️ Code Spell Checker](/posts/use-code-spell-checker) plugin for [VS Code](https://code.visualstudio.com/). It has led to fewer stupid mistakes in my code.

I've been working a lot with [MDX](https://mdxjs.com/) and I realized that the spell checker wasn't working. I wasn't sure if I disabled it globally. I re-enabled it, but that didn't seem to fix the trick.

Eventually I found that the issue was that `mdx` was not in the list of languages that the plugin (`cSpell`) was targeting.

Here's how to fix it:

## Option #1: The UI Way

You can find this in your user or workspace settings as _C Spell: Enabled Language Ids_.

{% post_image
    alt="VS Code Spell Checker - Language IDs",
    src="/posts/210302/cspell--language-ids.png" %}

Scroll to the bottom of the list and add `mdx` (or the language that isn't working for you).

{% post_image
    alt="VS Code Spell Checker - New Language",
    src="/posts/210302/cspell--new-lang.png" %}

## Option #2: The JSON Way

Or in your JSON user or workspace settings, adjust the value of `cSpell.enabledLanguageIds` to include the language causing the issue.

**Note that if you do this, you'll want to include all the other languages you want targeted.** Using this setting overrides all the defaults.
