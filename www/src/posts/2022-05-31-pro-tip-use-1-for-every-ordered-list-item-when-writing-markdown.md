---
title: "Pro Tip: Use “1.” for Every Ordered List Item when Writing Markdown"
description: A quick tip for making ordered lists in markdown easier to write.
tags:
  - quick-tip
  - markdown
image: >-
  /posts/220531/pro-tip-use-1-for-every-ordered-list-item-when-writing-markdown-gT1C8rSL.png
seo:
  image: >-
    /posts/220531/pro-tip-use-1-for-every-ordered-list-item-when-writing-markdown-HNY2dT75--meta.png
---

When authoring an ordered list, I have a natural tendency to add the proper integers that set the order. Like this:

```markdown
1. Do this first.
2. Then this.
3. Do this third.
4. And this last.
```

And, as you might expect, that compiles to the following HTML:

```html
<ol>
  <li>Do this first.</li>
  <li>Then this.</li>
  <li>Do this third.</li>
  <li>And this last.</li>
</ol>
```

Do you notice a funny discrepancy? Although we specified the order of the items, Markdown compilers lead to markup that designates the structure. The proper number values are set by the browser interpreting the HTML.

## Number Values Don’t Matter for Ordered Lists

That’s right! According to [the original spec](https://daringfireball.net/projects/markdown/syntax#list):

> It’s important to note that the actual numbers you use to mark the list have no effect on the HTML output Markdown produces.

This means you can use any numbering and still get the same result. If you do this:

```markdown
1. Do this first.
1. Then this.
1. Do this third.
1. And this last.
```

Or even this:

```markdown
5. Do this first.
6. Then this.
7. Do this third.
8. And this last.
```

You end up with the same resulting HTML.

## Start with Number 1

That said, it’s still important to start with `1.`. Per the spec:

> If you do use lazy list numbering, however, you should still start the list with the number 1. At some point in the future, Markdown may support starting ordered lists at an arbitrary number.

## Use Number 1 Exclusively

Given the above, I personally love to use `1.` exclusively for ordered list items.

```markdown
1. Do this first.
1. Then this.
1. Do this third.
1. And this last.
```

I like this because it reduces the amount of cognition needed to both read _and_ write markdown. If I see `1.` I know it’s an ordered list. My brain knows the items are sequential. Most of the time, that’s good enough.

I also find it easier to edit. Just as with unordered lists, you can move items around and not need to change the character that dictates its structure. This is just as it would be if you were authoring HTML, and the whole point of markdown is that it’s an easier way to write content that is transformed into HTML code.

### Exceptions to the Rule

That said, there is a primary exception to this pattern. If the value of the number is significant, then I number accurately. This usually means if I’m going to reference the number itself in content, then I want to write that number out.

This is technically still error-prone and not a foolproof solution, but it becomes a trigger to me to do more careful editing.
