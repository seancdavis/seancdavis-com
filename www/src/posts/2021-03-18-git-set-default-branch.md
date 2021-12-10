---
title: 'Git: Set Default Branch to "main" on "init"'
description: "Tired of remembering to rename the master branch after running git init? This option will help you!"
image: /posts/210318/pink--git-generic.png
tags:
  - git
---

Okay, so we're starting to standardize on `main` as the default branch. Super!

My gut says Git will update to some other default branch sometime soon or make you choose. But, for the time being, the default is still `master`.

You may seen the solution that you can run this command on an existing repo to rename `master` to `main`.

    $ git branch -m main

That's all well and good and not that painful, but it's still _another thing to remember_ when starting a new project.

But, now Git has a newer config option available in which you can set the default branch on the `init` command for your machine:

    $ git config --global init.defaultBranch main

{% callout type="note" %}
You need to be on a newer version of Git for this to work. [See here for determining if you have the option available](/posts/git-list-all-config-options). If you don't and the command doesn't work for you, you likely have to upgrade Git. [Here's a nice guide](https://medium.com/@katopz/how-to-upgrade-git-ff00ea12be18) on how to do that on Mac.
{% endcallout %}

And now every time you run `git init`, the branch Git will provide you will be `main`!
