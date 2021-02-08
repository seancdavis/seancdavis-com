---
title: "Delete Entire Word in Terminal and iTerm2"
description: Ever find yourself holding down the Delete key on the command line? Here's a way to work faster.
image: /blog/210208/git-push-graphic.png
tags:
  - productivity
  - quick-tip
---

When you type something you don't want to run on the command line it can be annoying to hold down `delete` until everything you want to remove is gone.

There is always the nuclear option, in which you cancel the current command with `ctrl`+`c` and start over.

But often it would be better to delete one word at a time, as you can in most text editing programs on Mac. The standard pattern is `option`+`delete`. But that doesn't work as expected out of the box with Terminal or iTerm2. Here's how you can set it up.

## Setting Up `option`+`delete` in Terminal

1. Open Terminal and go to preferences (`cmd`+`,`).
2. Navigate to Profiles, then the Keyboard tab.
3. Check _Use Option as Meta key_.

{% post_image
    src="/blog/210208/option-delete-terminal.png",
    alt="Option+Delete in Terminal",
    classes="mb-4" %}

## Setting Up `option`+`delete` in Terminal

1. Open iTerm2 and go to preferences (`cmd`+`,`).
2. Navigate to Profiles, then the Keys tab.
3. Choose _Esc+_ for one or both option keys.

{% post_image
    src="/blog/210208/option-delete-iterm2.png",
    alt="Option+Delete in iTerm2",
    classes="mb-4" %}
