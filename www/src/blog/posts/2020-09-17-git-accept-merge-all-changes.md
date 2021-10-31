---
title: "Git Merge: Accept All Changes"
description: Have you encountered a large merge when you know you are going to
  accept all current or incoming changes? There's a way to achieve without
  stepping through each file.
tags:
  - git
image: /blog/default/default-blue-01.png
---

I ran into a scenario recently in which I had about 100 merge conflicts. It was going to be a daunting (and tedious) task. When that happens to me, I spend a little time brainstorming if there is a better way. To my surprise, this was as cool and relaxing as a walk in a park.

In this case, I knew I wanted to accept all current changes. In other words, I knew that all the files I had were the most updated versions of the files and could safely ignore any incoming changes.

The first step is to back out of the current merge or stash any active changes. If you don't have any active changes or aren't in the middle of a merge, you can ignore this step.

    $ git add .
    $ git stash

If stash doesn't work or you don't want to muddy your stash list, you can also reset. **Use this command with caution**, as it is destructive:

    $ git reset --hard

Then, restart the merge using a strategy option. In my case, I wanted to accept all current changes and ignore any incoming changes, which I could accomplish like this:

    $ git merge [branch] --strategy-option ours

_`[branch]` should be replaced with the name of the branch you are merging into your current branch._

If, instead, you know you want to overwrite any current changes and accept all conflicts from incoming changes, you can use the `theirs` strategy instead:

    $ git merge [branch] --strategy-option theirs

Once that's done, if you had stashed files, you can bring them back to life:

    $ git stash pop
