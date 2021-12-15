---
title: Collaborate On A GitHub Gist
description: GitHub gists are designed to be user-specific and not for team
  collaboration. But you can make it work with a little finagling.
tags:
  - git
  - github
image: /posts/default/default-yellow-02.png
---

GitHub gists are typically used to share a snippet or series of snippets with
others. They are built for collaboration.

Typically if you want to collaborate on a project with code, you'd create a repo
in your GitHub user or organization account. Then you can add all the
collaborators you want and you have the benefit of working with great features
like the Issue Tracker and Pull Requests.

But sometimes that's overkill. Sometimes you need to work on just a small set of
flat files, but you want to share collaboration of that code with others.

Well, one nice feature with gists is that [they are git
repos](https://help.github.com/articles/about-gists/), so we can still
collaborate. Granted, we won't have pull requests and one person will be the
source of truth, but it _can_ work.

## Step 01: Create The Gist

First, [create the gist](https://gist.github.com/). Note that **the gist must be
public** if you're going to share access to it.

## Step 02: Clone The Gist

Gists are git repos, so you can clone them. After you've created the gist, look
at the last segment of the URL:

    $ git clone git@github.com:gist-id my-gist

Replace `gist-id` with the last URL segment and `my-gist` with what you want
the name of the directory to be. For example:

    $ git clone git@github.com:a00baf1c59d60219ac87d87d71a26d46 ruby-dir-script

You can push and pull within that directory just like any other git repo.

## Step 03: Add Collaborators

Adding a collaborator is a two-step process:

First, share the link to your gist with your collaborator(s). They can fork the
gist and then clone it themselves.

After cloning their fork, they should add your fork as their upstream remote:

    $ git remote add upstream git@github.com:gist-id

(Again, change `gist-id`.)

When your collaborators are all set up, you'll want to add a remote for each of
them. Each of their forked gists will have their own ID, so you can take a
similar approach. Usually I'll name the remote with the name of the person. For
example:

    $ git remote add sarah git@github.com:gist-id

(Seriously, the `gist-id` -- change it.)

Repeat for each collaborator.

## Step 04: Merge Collaborator Changes

When a collaborator has made a change you want to add into the gist, you fetch
and then merge their remote `master` branch. For example, if we're going to
merge in Sarah's changes:

    $ git fetch sarah
    $ git merge sarah/master

And then you can push back up to GitHub.

    $ git push origin master

## Step 05: Staying Up To Date

Just like working with forks in other repos, your collaborators are going to
have to keep themselves up to date with your code. If they've properly setup
your gist as their upstream remote, they can stay updated like so:

    $ git fetch upstream
    $ git pull upstream master

---

The biggest issue with this approach is their is a bottleneck with the user who
created the gist in that they have to do all the merging. But I'd really only
recommend this approach for simple use cases. Anything more complicated than a
small, temporary set of flat files warrants its own repo.

---

**References**

- [This SO Answer](https://stackoverflow.com/a/24316203/2241124)
- [And A Gist](https://gist.github.com/maglietti/498638aa208e25c4ef40)!
