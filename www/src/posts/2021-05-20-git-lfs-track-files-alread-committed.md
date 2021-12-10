---
title: Use git-lfs on File Already Committed
description: Using Git LFS on a file that is already being track without it requires an extra step.
image: /posts/210520/pink--git-lfs-help.png
tags:
  - git
---

I ran into an issue where I wanted to use [Git Large File Storage](https://git-lfs.github.com/) on a file I had already committed to a repository without using `git-lfs`.

Let's say my file is some beefy design file that I saved to `design/mockups.sketch`.

## Setup Git LFS

If you haven't already setup your repo to use `git-lfs`, that's where you should start. Tell Git you want to use LFS to track this file:

    $ git lfs track desgin/mockups.sketch

This will place a `.gitattributes` file in your repo (if you didn't already have one). Commit this file:

    $ git add .gitattributes
    $ git commit -m "Use lfs on design mockups"

## Track Already-Committed File

If you look at what LFS is currently tracking, it doesn't give you any feedback:

    $ git lfs ls-files

That's because it's not tracking anything yet.

What we need to do is remove the file from Git's cache, then recommit it:

    $ git rm --cached design/mockups.sketch
    $ git add design/mockups.sketch
    $ git commit -m "Begin tracking mockups with lfs"

And now if we look at what LFS is tracking, we see the file:

    $ git lfs ls-files
    036310e243 - design/mockups.sketch

**References:**

- [`git-lfs-example.sh` gist](https://gist.github.com/MichaelCurrie/02d7838f79b94cd8459c7fa3e63b97ed)
