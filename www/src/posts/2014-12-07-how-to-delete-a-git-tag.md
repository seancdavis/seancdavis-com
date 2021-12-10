---
title: How To Delete a Git Tag
tags:
  - git
description: It's easy to delete a git tag from your local and remote repositories.
image: /posts/default/default-green-02.png
---

Let's say you created tag `v1.0` too early. You can delete it from your local repository by running the following command.

    $ git tag -d v1.0

If you've already pushed the tag, you can remove it from your remote repository with this command.

    $ git push origin :refs/tags/v1.0

Then, if you want to create it and push it again later, you can go right ahead and do so.

    $ git tag -a v1.0 -m "My new tag"
    $ git push origin --tags
