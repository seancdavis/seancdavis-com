---
title: Change Back to Previous Directory
description: >-
  Navigate to the directory you visited previously without the need of
  remembering or typing the name.
tags:
  - quick-tip
tweet: >-
  “cd -” is a trick I use constantly to quickly change into the previous
  directory without having to remember or retype the name.
image: /posts/220723/change-back-to-previous-directory-J3Ad9uPJ.png
seo:
  image: /posts/220723/change-back-to-previous-directory-5BzDyMno--meta.png
---

There’s a super fast and easy-to-remember way to return to the previous directory.

```txt
cd -
```

This is useful when you need to go into another directory on your machine and then come back to where you were working, without needing to type in the full path.

## Changing into Previous Directory Example

For example, say I change into some working project directory.

```txt
cd ~/workspace/my-new-project
```

But then I want to switch to the machine’s `tmp` directory to run a quick test.

```txt
cd /tmp
```

Now if I want to go back to the project directory, all I have to do is this:

```txt
cd -
# ~/workspace/my-new-project
```

And since `-` represents the previous directory, I could run it again to get back to the `tmp` directory:

```txt
cd -
# /tmp
```

## Tip: Make Using Full Paths a Habit

Note that this trick is less beneficial if you tend to change directories in multiple commands. For example, rather than run `cd ~/workspace/my-new-project`, I’ve seen developers do this:

```txt
cd ~
cd workspace
cd my-new-project
```

Although inefficient, it works and will get you where you need to go. But it makes this trick less desirable. Following those commands, if you were to now run `cd -`, you would end up in `~/workspace`, rather than wherever you were prior to running `cd ~`.
