---
title: "Delete Multiple Local Git Branches"
description: Learn how to use a single command to delete multiple git branches.
image: /posts/210621/lime--git-branch-delete.png
tags:
  - git
---

Ever get yourself caught in a situation where you have a whole mess of branches and you want to _get_ cleaned up?

The process is actually quite simple. All you need is some regular expression pattern to target the branch names, and then you sweep through them.

The command looks like this:

    $ git branch | grep [PATTERN] | xargs git branch -D

These are three commands piped together. Here's how they work:

1. `git branch` prints a list of branches. It precedes the current branch with an asterisk.
2. `grep [PATTERN]` searches the list and returns those lines that match the pattern.
3. `xargs` gives us the returned list from `grep`, and then we pass those to `git branch -D`, which deletes the branch.

## Test It First

It can come in handy to give the first two commands a whirl so you know what you're going to delete. For example, to see a list of all branches, excluding the current branch, you could run this command:

    $ git branch | grep "^[ ]"

## Establish a Pattern

Having a pattern for how you name branches can come in handy when cleaning up like this. For example, I often precede branches with a number when they are addressing a specific issue. To provide a list of branches that begin with a number, I can run this command:

    $ git branch | grep "^[ ]\+\d"

      150/license
      41/medium-03
      57/gulp-babel

## Gotcha!

There are two things to look out for here:

1. I'm using the `-D` flag for `git branch`, which is an alias for `--delete --force`. If you don't want to force delete, you can use the `-d` flag instead.
2. There are two spaces at the beginning of every branch in the list that isn't your current branch. When searching for the beginning of a string, don't forget about these spaces. That always seems to trip me up.
