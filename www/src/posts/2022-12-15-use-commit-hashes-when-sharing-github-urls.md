---
title: Use Commit Hashes when Sharing GitHub URLs
description: >-
  Sharing GitHub commit hashes directly works for ephemeral uses, but there is a
  safer way for links that need to last.
tags:
  - quick-tip
  - github
image: /posts/221215/use-commit-hashes-when-sharing-github-urls-fpHMt0Q1.png
seo:
  image: /posts/221215/use-commit-hashes-when-sharing-github-urls-3LqjvLDw--meta.png
---

{% youtube_embed id="2dED_-u9dKE" %}

By default, when you click through a repository on the GitHub website, you're browsing the default branch. This is often useful, as you may want the latest version of each file.

{% post_image alt="", src="/uploads/221215/branch-in-url.png" %}

(Notice below the `blob/main` segments — here `main` is the default branch.)

## Files Will Change

While this may be great when browsing, it's problematic when sharing the URL for a few reasons:

- Files can be deleted or renamed, which can lead to a 404 (page not found) error.
- The purpose of a file you've shared may change over the life of the project, and the context in which you originally shared it may not remain relevant.
- GitHub also lets you share specific lines in a file. This is particularly dangerous when using branch URLs — if code changes, the line numbers will likely no longer be relevant.

## Use Commit Hashes when Sharing

To overcome this issue, you can use commit hashes when sharing the URL. The easiest way to do this when looking at a file on the default branch is to replace the default branch in the URL with the latest commit for that particular file.

Fortunately, you can grab this while viewing the file, as the latest relevant commit for that file is listed on the page.

{% post_image alt="", src="/uploads/221215/use-commit-hash.png" %}

## Browsing Files at Commit

Alternatively, you can use the _Browse Files_ button (after clicking the commit hash link) to browse the entire project at that hash.

{% post_image alt="", src="/uploads/221215/browse-files-button.png" %}

You can do this from any commit screen. And generally, whenever a commit is shown in the GitHub app, it is a link leading to the commit detail view (shown above).
