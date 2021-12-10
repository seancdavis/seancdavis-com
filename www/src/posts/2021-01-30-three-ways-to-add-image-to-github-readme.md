---
title: "3 Ways to Add an Image to GitHub README"
description: "Images often come in handy alongside documentation. Here are a few methods for adding them to your README and other markdown files."
image: "/posts/210130/orange--github-image.png"
tags:
  - github
  - quick-tip
---

{% youtube_embed
    id="Ljj1wGFJqPY",
    title="3 Methods for Adding Images to GItHub README Files" %}

Images can be a great way to enhance your documentation in README files or other markdown documentation. While there is a standard way to add an image in markdown, the nuance is in the image's source. Here are three methods for adding images to markdown files in a GitHub repository.

## Markdown Syntax

The [original documentation](https://daringfireball.net/projects/markdown/syntax#img) specifies that images should be written like so:

```md
![Alt text](/posts/path/to/img.jpg "Optional title")
```

HTML code is also valid within most markdown renderers, including [GitHub's flavor](https://github.github.com/gfm/#raw-html). That means you could also render an the image above like this:

```md
<img src="/path/to/img.jpg" alt="Alt text" title="Optional title">
```

This is a great option if you want to add a little custom styling to your image. For example, if you want to control the size or alignment of the image, you might do something like this:

```md
<img
  src="/path/to/img.jpg"
  alt="Alt text"
  title="Optional title"
  style="display: inline-block; margin: 0 auto; max-width: 300px">
```

## Method #1: Local File

The first method is to commit the image directly to your GitHub repository. When you do that, you can use a path to that file for the `src`, which should be relative from the markdown file.

In other words, if you place an image file in the root your project as `my-image.jpg`, you could then render the image in your projects main `README.md` file like this (`title` omitted for simplicity):

`README.md` {.filename}

```md
![My Image](my-image.jpg)
```

Let's say the image file was instead in an `images` directory. Then your code in the project's main README file would look like this:

`README.md` {.filename}

```md
![My Image](images/my-image.jpg)
```

Now, let's say that you have another README file in your `src` directory, but your image is still in the `images` directory. Then your relative path looks like this:

`src/README.md` {.filename}

```md
![My Image](../images/my-image.jpg)
```

This approach is a quick and easy option, as long as you don't have too many images to manage. If you end up using a lot of images, I'd consider another route ...

## Method #2: Remote File

Another option is to use some external file hosting service to provide your image, such as [S3](https://aws.amazon.com/s3/) or [Dropbox](https://www.dropbox.com/). In this case, you could get the direct and full URL to the image and then use that.

`README.md` {.filename}

```md
![My Remote Image](https://www.dropbox.com/s/.../my-remote-image.jpg?dl=0)
```

## Method #3: Uploaded File

Lastly, you could use GitHub to host the image for you. This one is a little goofy, but it totally works!

The trick is to add them to some comment — an issue, pull request or discussion — and then grab the resulting URL.

{% post_image
    alt="Upload Image to GitHub Issue",
    src="/posts/210130/upload-github-image.gif" %}

You can drag and drop the image from your computer to a comment field in GitHub. Wait for the file to upload and then the URL to the image is right there! You don't even have to submit the issue if you don't want to (although that may limit the image's lifespan).

Unlike the other two options, I see two issues with this approach:

1. On its own, it becomes difficult to know the source of the image. Maybe that's not a big deal, or maybe you have a way to streamline it — e.g. all your images go into a single "Images" issue that stays open.
2. The purpose of images in comments is technically to serve the comment. It's possible GitHub changes these URLs without notifying you.

## Inspiration & Resources

This post was originally inspired by [this tweet](https://twitter.com/DavidDarnes/status/1351139946728464385) from [@DavidDarnes](https://twitter.com/DavidDarnes):

<blockquote class="twitter-tweet">
  <p lang="en" dir="ltr">Haha nice! FYI if you upload those readme images in a new GitHub comment and it&#39;ll give you the image paths back to put them in your readme, then you won&#39;t have them cluttering the repo 😶</p>
  &mdash; Dave 🧱 (@DavidDarnes) <a href="https://twitter.com/DavidDarnes/status/1351139946728464385?ref_src=twsrc%5Etfw">January 18, 2021</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I ended up being more comprehensive than just this singular suggestion, which came to be more in-line with [this StackOverflow question](https://stackoverflow.com/q/14494747/2241124).
