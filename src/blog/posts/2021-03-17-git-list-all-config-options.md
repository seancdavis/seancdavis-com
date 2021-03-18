---
title: "Git: List All Config Options"
description: "See all the options available to you, and also learn how to filter them."
image: /blog/210317/pink--git-generic.png
tags:
  - git
---

Git has a plethora of configuration options. Most of the time you only need a few, typically when [first setting up git](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) on a new machine. (Related: [New Mac Setup Guide](/blog/new-mac-dev-guide))

To see all the configuration options available to you, you can [use the reference manual on the website](https://git-scm.com/docs/git-config). Or, if you have an updated version of Git running locally, you can use the following command:

    $ git help -c

_Note: If this command doesn't work for you, you likely have to upgrade Git. [Here's a nice guide](https://medium.com/@katopz/how-to-upgrade-git-ff00ea12be18) on how to do that on Mac._

### Filtering the Results

Notice that there are _a lot_ of options. If you'd like to filter the results, you can _pipe_ to the `grep` command and search for some segment. For example, if I wanted to see all config options with "init" somewhere in the name, I could run the following command:

    $ git help -c | grep init

That should return a much shorter list for you.
