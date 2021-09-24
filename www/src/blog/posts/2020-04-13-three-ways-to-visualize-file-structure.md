---
title: Three Ways to Visualize File Structure in Documentation
description: There are several methods for representing file trees. Here are three, along with some quick pros and cons for each.
tags: []
---

I was writing some documentation for an [Ample](https://www.helloample.com/) internal project a few weeks ago in which I wanted to show the way a project's files and directories were organized.

Many prefer to visualize this structure in a tree format. For example, here's the _List_ view in Mac's Finder application:

{% post_image src="/blog/200413/mac-finder-list-view.png" %}

As I wrote the doc, I considered the ways in which I have achieved this type of visualization in the past.

## Method 1: Bullets

The very first way I learned to represent file structure was by using bullet points. Here's an example, pulling from the screenshot above:

- `src/`
  - `images/`
    - `image-01.jpg`
    - `image-02.jpg`
  - `templates/`
    - `page.html`
    - `post.html`
  - `index.html`
- `package.json`
- `README.md`

I've also done something similar but made it look more _official_ by putting it in a code block:

```
- package.json
- README.md
- src/
  - images/
    - image-01.jpg
    - image-02.jpg
  - templates/
    - page.html
    - post.html
  - index.html
```

That's not too bad. It's good in a pinch because it's easy to move quickly. But it's not great to read — I get lost when nested a few levels deep.

## Method 2: Screenshot

I've also taken the approach of simply sharing a screenshot, as I did above. Visually, it works well. It gets the point across and is really quick to throw together.

The problems with the screenshot approach are twofold:

1. Anyone who wants to adjust the documentation in the future needs to take a new screenshot, which means they must also have the files on their computer.
2. It's an image (not text), so readers can't copy the contents but would have to retype.

## Method 3: Linux Tree

When I was writing this latest set of documentation, I really wanted it to shine. I wanted to look back on it and think, _Gosh, that's the best stale doc that ever existed!_

I'd seen fancier versions of tree structures around, so I decided to dig in. Ultimately, I decided to follow inspiration from [Linux's `tree` command](http://mama.indstate.edu/users/ice/tree/), and went with this approach:

```
my-project/
├── src/
│   ├── images/
│   │   ├── image-01.jpg
│   │   └── image-02.jpg
│   ├── templates/
│   │   ├── page.html
│   │   └── post.html
│   └── index.html
├── package.json
└── README.md
```

The visualization above uses four key characters to represent structure:

- `├`
- `└`
- `│` (not the same as the pipe character: `|`)
- `─` (not the same as a hyphen: `-`)

These characters are considered [box-drawing characters](https://en.wikipedia.org/wiki/Box-drawing_character), and [they go back a long time](https://theasciicode.com.ar/extended-ascii-code/box-drawing-character-single-line-lower-left-corner-ascii-code-192).

To build the structure, we combine the characters together. This makes it a little it easier to read. It works like this:

- `│` is used to show we're nested multiple levels deep.
- `├──` (`├ + ─ + ─`) points to a file or directory as a direct descendant of the current directory.
- `└──` (`└ + ─ + ─`) points to _the last_ file or directory within the current directory.

It takes quite a bit longer to type this in this format manually, but the result is easy to read and worth the effort (if there aren't too many files). It also takes less effort to co-write and to maintain over time because it's just text.

And — **BONUS!** — if you have the files stored locally, you could actually _use_ the `tree` command. (On mac, [it's available through Homebrew](https://formulae.brew.sh/formula/tree).) Then you get the best of both worlds — it's fast to create, but easier to maintain compared to a screenshot.

---

Any one of these methods will work fine. After learning about the Linux tree approach, that's become my preference, _especially_ if I have the files stored locally. I will really only use the screenshot approach if I want my doc to have some visual stimulus and if readers are unlikely to copy the text. And still, in a pinch or a less formal setting, bullets can still do the trick for me.
