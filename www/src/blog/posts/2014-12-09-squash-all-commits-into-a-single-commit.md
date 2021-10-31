---
title: Squash all Commits into a Single Commit
tags:
  - git
description: Sometimes it makes sense to start over in Git's history while
  maintaining the current state of your code.
image: /blog/default/default-pink-03.png
---

Git has many built-in tools to [rewrite history](http://git-scm.com/book/en/v2/Git-Tools-Rewriting-History). But, sometimes, you just want to take where you are in history, squash _everything_ into a single commit, and move forward from there.

While you could go through the interactive rebase methods, it's easier to just wipe out git and start over. You do this by removing the `.git` directory and reinitializing the repo.

Here are the commands to run from inside your repository.

    $ rm -rf .git
    $ git init
    $ git add .
    $ git commit -am "You restarting commit message"

**CAUTION**: _This method will remove the entire git history. This means branches, tags, etc. are all gone. If you're worried about the effects this may have, you can do a test run by renaming your `.git` directory first, and not deleting until you reinitialized repository looks good. Of course, ideally you've already pushed this repo to a remote location, so anything you mess up locally can be undone._
