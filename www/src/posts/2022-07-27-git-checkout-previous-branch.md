---
title: Git Checkout Previous Branch
description: Checkout the previous git branch without needing to remember or type the name.
tags:
  - git
  - quick-tip
image: /posts/220727/git-checkout-previous-branch-lH09d0gs.png
seo:
  image: /posts/220727/git-checkout-previous-branch-vPtuVgUI--meta.png
---

If you want to checkout the branch you were previously working on, run this command:

```txt
git checkout -
```

It’s magic! You don’t have to remember or type the branch you were just on.

## Example Git Merge Flow

Consider if I’m on a feature branch and I want to check out and update the main branch and merge changes into my feature branch. I can do this:

```txt
$ git checkout feature-branch

$ git checkout main

$ git pull origin main

$ git checkout -
# Now we're back on feature-branch, but let's check ...

$ git branch
* feature-branch
main

$ git merge main
```

(Technically, there’s a more efficient way to do this.) But the point is that I didn’t have to type “feature-branch” again. Instead, I changed back into the `feature-branch` branch automatically by running `git checkout -`.

Magic! 🪄
