---
title: Edit Files Efficiently in SharePoint
tags:
  - sharepoint
description: Eliminate the need to duplicate files across site collections.
---

Whether your SharePoint site uses one site collection or many, there are ways to make your design and development more efficient. See below for some best practices I've developed.

## Use the root to store global files

It's good practice to work under the practice of **_one file, one location_** where possible. SharePoint tends to treat site collections as silos, and that can be nightmare for a designers. To match look and feel across multiple site collections you have to perform the same action multiple times. Typically that means duplicating files and data. Therefore, whenever you create a file that may be used across multiple site collections, it is best to _save them in one place and work from the same file_. That will means changes are reflected immediately across all site collections.

I recommend using a library in the root site collection as your global location. I just use one library and break it up by file type using folders (see below).

{% post_image src="/blog/121201/Capture.png", alt="sp global library" %}

Using this method I can share icons, scripts, and mini apps across several site collections.

## Use Windows Explorer to edit files

What I find most annoying when editing/updating JavaScript or CSS files in the process of re-uploading then refreshing the page. You can eliminate the re-uploading step by going to the library in which the file you want to edit lives and click *Open with Explorer*.

{% post_image src="/blog/121201/Capture1.png", alt="open-with-explorer" %}

This opens your library and all its files in a Windows Explorer window.

{% post_image src="/blog/121201/Capture21.png", alt="sp open with explorer" %}

At this point you're able to open your files with you editing program, and upon save the file will automatically be updated to the SharePoint library. In addition, if you create a new file and overwrite any file in the library, it will be reflected in SharePoint.
