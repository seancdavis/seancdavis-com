---
title: Node.js Memory Error on Mac Using M1
date: 2021-02-08
description: How to fix Node.js memory error on Mac OS X using Apple M1 chip.
image: /blog/210217/210217--next-prev-path.png
tags:
  - repost-grouparoo
  - node
canonical_url: https://www.grouparoo.com/blog/apple-m1-js-memory-error
---

I was working with our fancy new CLI tool with my fancy new MacBook Pro with the M1 chip when I came across this scary error, courtesy of Node.js:

    FATAL ERROR: wasm code commit Allocation failed - process out of memory

It began occurring regularly enough that I started digging. I've since come across two methods for solving this issue.

## Method #1: Upgrade to Node v15

I found [this discussion](https://forum.ghost.org/t/cant-get-ghost-running-on-apple-m1-chip/19526/5) which noted that Node.js versions prior to v15 do not natively support the Apple M1 chip. (At least not _yet_.)

Our team uses [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to install and manage multiple node versions. I happened to be working with v12.

    $ nvm ls
    ->     v12.20.1
            system
    default -> 12 (-> v12.20.1)
    ...

So I gave v15 a shot.

    $ nvm install 15
    $ nvm use 15
    $ nvm alias default 15

_Voila!_ It _seemed_ to do the trick. I even tried v14 just to see what would happen, and sure enough, I also ran into issues with it.

I still run into intermittent issues with v15, so I don't feel like this is a foolproof solution. But it's a quick path to try.

## Method #2: Run in Compatibility Mode

Another option is to run your terminal in compatibility mode using [Rosetta](https://developer.apple.com/documentation/apple_silicon/about_the_rosetta_translation_environment). Rosetta is a environment that translates executables to be able to run on the Apple M1 chip. It's build specifically to ease the transition to Apple's new chip.

To run your terminal application in compatibility mode, set it to _Open using Rosetta_, then reinstall node versions. [See here for more info](https://stackoverflow.com/q/64899827/2241124).

After going down this route, it's felt _safer_. But, starting the process was opening a can of worms. It wasn't just a matter of open Terminal differently and reinstalling Node. Because Node relies on other libraries, I also needed the appropriate versions of those libraries, too. But [Homebrew](https://brew.sh/) updated for the new chip and now installs libraries in a different location.

It became a whole thing and, because I had just opened my computer, I ended up wiping it and starting clean. I'm confident I would have eventually gotten to a working situation using Rosetta. Starting over just felt like a simpler path for me with a new machine.

My advice to you is to start with the first method and see how far it gets you. If it doesn't solve the problem, then move on to this second method, but be prepared to go down a rabbit hole in the process!
