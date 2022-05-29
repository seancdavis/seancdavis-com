---
title: Use a Preceding Space in Terminal to Hide from History
description: >-
  This is a trick to running commands that you don’t want to be saved in your
  history.
tags:
  - quick-tip
image: >-
  /posts/220529/use-a-preceding-space-in-terminal-to-hide-from-history-cbHrQ9A7.png
seo:
  image: >-
    /posts/220529/use-a-preceding-space-in-terminal-to-hide-from-history-DVDn_ohY--meta.png
---

You may want to run a command that isn’t stored in your history. You can do this with a preceding space.

```bash
# no preceding space
someCmd --key ABC123

history
# 98 ...
# 99 someCmd --key ABC123

# with preceding space
 anotherCmd --key ABC123
cd ~

# notice `anotherCmd` is missing
history
# 98 ...
# 99 someCmd --key ABC123
# 100 cd ~
```

A common scenario may be when using sensitive values a single time (i.e. where you don’t want to take the time to set environment variables).
