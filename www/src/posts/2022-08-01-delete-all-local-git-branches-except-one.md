---
title: Delete All Local Git Branches Except One
description: Delete all local git branches except main, master, or your current branch.
tags:
  - git
tweet: Did you know you can clean up your local git branches with a single command?
image: /posts/220801/delete-all-local-git-branches-except-one-2ZVlk0sP.png
seo:
  image: /posts/220801/delete-all-local-git-branches-except-one-w94ezixT--meta.png
---

Let’s take a look at a few different ways of deleting a batch of branches in a git repo.

- Delete git branches following a pattern
- Delete all branches except main or master
- Force deleting branches
- Delete all branches except the current branch

## Delete All Git Branches Using an Exclusion Pattern

You can list all git branches except a specific branch using the `-v` option in the `grep` command. For example, let’s say you wanted to list branches that include `nodelete` in the name.

```txt
git branch | grep -v nodelete
```

Now, to delete all branches that were returned, pipe to the `xargs` command and run `git branch -d`.

```txt
git branch | grep -v nodelete | xargs git branch -d
```

{% callout type="note" %}
This command skips branches that are not fully merged, along with the current branch. It will output a message for every returned branch that it does not delete.
{% endcallout %}

## Delete All Git Branches Except `main`

For example, to skip the `main` branch, you could do this:

```txt
git branch | grep -v main | xargs git branch -d
```

{% callout type="note" %}
This will skip any branch with `main` in its name, even if it’s something like `new-domain`.
{% endcallout %}

### Targeting the `main` Branch Exactly

The easiest way to target the main branch is to first check it out, then target the asterisk in the name:

```txt
git checkout main
git branch | grep -v "^* main$" | xargs git branch -d
```

Here, the `v` means “begins with” and `$` means “ends with.” Therefore, we’re matching exactly `* main`, which is how the main branch will be printed when it is checked out.

### Getting Precise with the Branch List

If you don’t want to worry about checking out a branch, but want to be precise, you can choose to print the branches as a list with no whitespace. Keeping the example of main, here’s what you can do:

```txt
git branch --format='%(refname:short)' | grep -v "^main$" | xargs git branch -d
```

## Force Deleting Git Branches

What I really like about using `-d` when deleting branches is that it skips branches that are not fully merged. If you want to delete all returned branches, you’ll want to use `-D` instead:

```txt
git branch | grep -v "..." | xargs git branch -D
```

## Delete All Git Branches Except Current

Lastly, whether using the `-d` or `-D` option for deleting branches, you will not be able to delete the current branch. So you can technically just run through the entire list to delete everything except the current branch.

```txt
git branch | xargs git branch -d
```

Notice here that we don’t use the `grep` command because there’s nothing to filter from the response.
