---
title: Safely Force Pushing in Git
description: "If force-pushing is part of your git workflow, here's a tip that can help you avoid disaster."
image: /posts/210722/green--git-push.png
tags:
  - git
---

Force pushing can be dangerous, as you could remove code from your remote repository that you don't have locally. For example, if another developer pushed code to the remote branch that you don't have locally, that code could be lost.

Below you will find a _safer_ way to force push to a remote repository.

{% callout type="tldr" %}
If you use [the `--force-with-lease` option](https://git-scm.com/docs/git-push#Documentation/git-push.txt---no-force-with-lease) when pushing, it will be rejected in there are commits in the remote branch that don't exist locally. Read below for more context on when this is particularly useful.
{% endcallout %}

## Setting up the Example

Let's say that code was merged into the main branch, resulting in a commit that we don't have in our feature branch. It looks like this:

{% post_image
    src="/posts/210722/210621--git-feature-branch.png",
    alt="git feature branch",
    flatten=true %}

The main branch has two commits: `A`, which we have in our current branch, and `B`, which is only in the main branch. Our feature branch has a commit `C` that occurred _after_ commit `B`.

## Bringing our Feature Branch up to Date

To bring our feature branch up to date, we use rebase after updating our local copy of the main branch:

    $ git checkout [MAIN]
    $ git pull origin [MAIN]
    $ git checkout [FEATURE]
    $ git rebase [MAIN]

(Replace `[MAIN]` and `[FEATURE]` with the names of your branches.)

That results in a landscape that looks like this:

{% post_image
    src="/posts/210722/210621--git-remote-rebase.png",
    alt="git remote rebase",
    flatten=true %}

Now we have commit `B` on our _local_ feature branch, but it's still not in the remote feature branch. And notice that commit `B` occurs _behind_ `C` since it happened earlier. This is the result of the rebase.

That means we have a different history. So if we tried to push, the remote repository won't let us do it.

{% post_image
    src="/posts/210722/210621--git-remote-rebase-fail.png",
    alt="git remote rebase fail",
    flatten=true %}

That's because the remote branch has commit `C` but not `B`. And it is protecting itself against rewriting history. You have to tell it you know you want to rewrite the history.

For years, I did this with this command:

    $ git push origin [FEATURE] --force

But that's dangerous! If there is work in the remote branch that I don't have locally, I'm going to overwrite it.

## Force with Lease

Instead, there is a fantastic option called [_force with lease_](https://git-scm.com/docs/git-push#Documentation/git-push.txt---no-force-with-lease).

    $ git push origin [FEATURE] --force-with-lease

This is what it means in technical speak:

> This option allows you to say that you expect the history you are updating is what you rebased and want to replace. If the remote ref still points at the commit you specified, you can be sure that no other people did anything to the ref. It is like taking a "lease" on the ref without explicitly locking it, and the remote ref is updated only if the "lease" is still valid.

In other words, this will allow the remote branch to rewrite its history, but it expects that its latest commit is commit `C`, which it is. So in our current scenario, `--force-with-lease` will work perfectly fine.

## Force with Lease Failure

Force with lease has the added benefit that if there are commits ahead of `C` on the remote branch, your push will fail.

Imagine a scenario in which you've gone through the process of rebasing against the main branch, but during that time another developer push a commit newer than `C` to the remote branch. We'll call that commit `D`.

In this case, if you ran `git push --force` you would lose commit `D`. But if you use `--force-with-lease` instead, you'll get a failure and know that you have to pull before pushing again with `--force-with-lease`.

{% post_image
    src="/posts/210722/210621--git-remote-force-lease-fail.png",
    alt="git remote force lease fail",
    flatten=true %}

This is a great option because it enables you to work with the rebase and squashed merges workflows without having to worry about overwriting work when pushing.
