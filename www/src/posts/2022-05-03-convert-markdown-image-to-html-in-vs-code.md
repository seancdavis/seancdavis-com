---
title: Convert Markdown Image to HTML in VS Code
description: >-
  Make a bulk conversion of markdown images to HTML strings using a regex find
  and replace with VS Code.
tags:
  - javascript
  - markdown
  - vscode
tweet: >-
  One of my favorite features of VS Code is that you can do a find and replace
  using regex groups.


  Here’s an scenario I ran into recently where VS Code came to the rescue.
image: /posts/220503/convert-markdown-image-to-html-in-vs-code-AM5lS5Pd.png
seo:
  image: /posts/220503/convert-markdown-image-to-html-in-vs-code-BsveLpLv--meta.png
---

There are times when the syntax for an image in markdown may not be enough to generate the HTML you desire.

The cases for this can vary significantly, but are often born from wanting additional HTML attributes that your markdown processor does not support and that may not make sense to manually build into the processor.

## Example: Adding a Class

Consider the case of adding a class to your image. While there are markdown processors out there that support classes, let’s assume you’re not using one of these. And you want to add a `border` class to your image.

Your markdown code looks something like this:

```md
![My Image](/path/to/image.jpg)
```

But what you want is this:

```html
<img src="/path/to/image.jpg" alt="My Image" class="border" />
```

## Bulk Replace with VS Code

Making changes like this manually is fine when there are a select few cases. But when you want to make a change like this on a broader scale, it can quickly become a tiresome process.

However, VS Code has a find and replace feature in which you can use [regex](https://code.visualstudio.com/docs/editor/codebasics#_case-changing-in-regex-replace) to [find and replace](https://code.visualstudio.com/docs/editor/codebasics#_find-and-replace) content in your code. And you can do this within a single file or across multiple files.

### Markdown Image Regex Replace

The regex to target markdown images is this:

```txt
^!\[([\w\d\s']+)\]\(([\w\d\-\.\/]+)\)
```

And that will be replaced with this string:

```html
<img src="$2" alt="$1" />
```

The reason this works is because the parentheses in the regex code become [groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges) that can be used when replacing the content. The first group (`$1`) is the alt text, which is the content inside the square brackets. And the second group (`$2`) is the path to the image, which is found inside the parentheses in the markdown syntax.

### VS Code Preview

This is what it looks like:

{% post_image alt="Use VS Code find and replace feature target markdown images with regex and turn them into HTML strings", src="/uploads/220503/vscode-find-replace-markdown-image.png" %}

Here is a brief explanations about the annotations:

1. Trigger to open the Find and Replace panel.
1. The _find_ regex value. This doesn’t work properly without #5 below.
1. HTML string with the regex groups that will be the _replace_ value.
1. Tells VS Code to do a case-sensitive find, which I prefer for more control over the results.
1. Tells VS Code to use regex for the find query. Otherwise, it assumes a plain text string.
1. (optional) Target a specific group of files. Here we’re saying anything within the `posts` directory.
1. Preview of results.

When you’re ready to make the change, you can click the icon below #5 (to the right of the replace value) and confirm that you wish to make the changes.

### Git Bonus!

And because you’re making changes to local files, if you’re tracking changes with Git, you get a second chance to look to see everything was right before committing.
