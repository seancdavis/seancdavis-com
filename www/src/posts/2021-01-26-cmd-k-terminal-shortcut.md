---
title: "Use Cmd+K Terminal Trick to Stay Organized"
description: "Aside from opening new tabs, the Meta+k shortcut is the one I use most frequently when working on the command-line."
image: /posts/210126/210126-cmd-k-terminal-shortcut.png
tags:
  - command-line
  - organization
  - quick-tip
---

One of the shortcuts I use the most when working on the command line is `Cmd`+`k`, where `Cmd` is your meta key.

This shortcut clears the terminal screen and removes the ability to scroll up. That makes it effectively a new starting point, though it doesn't create a new session. And you can even use this shortcut while a command is in progress.

I typically use this shortcut when I want [a new start](https://arresteddevelopment.fandom.com/wiki/ANUSTART). It then becomes trivial to find that point in time by scrolling up as far as possible. I often make use of this when restarting a development server.

## Comparing `Cmd`+`k` to `Ctrl`+`l`

There's a related shortcut in `Ctrl`+`l`, which is more like running `clear` in the terminal. [Here is a nice explanation of the difference between the two](https://superuser.com/a/819605):

> One difference is that `Cmd`+`k` clears the scrollback buffer as well as the screen. `Ctrl`+`l` only clears the screen, effectively moving what is on it "up" into the scrollback buffer.
>
> Another difference is that Ctrl+L is performed by the process running inside Terminal. For instance, bash will clear the screen and redraw the prompt, including any unfinished command there. Other programs might not do anything, or might refresh the screen without clearing it.
>
> `Cmd`+`k`, on the other hand, is performed by Terminal itself, regardless of what's running in the window, so it might hide the output from the program.

What are your favorite terminal shortcuts? [Let's talk](https://twitter.com/seancdavis29).
