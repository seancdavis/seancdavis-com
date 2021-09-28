---
title: CSS !important - What is it?
tags:
  - css
description: Learn what the !important flag does in CSS.
---

There are two important points to note regarding how a CSS (Cascading Style Sheet) is read.

First, they  **cascade**. But what the heck does that mean? Let's say you have this code in your stylesheet:

```css
div {
  background-color: #000;
}

div {
  background-color: #fff;
}
```

The sheet is read from the top down, so if there are conflicting styles, then the one lower in the sheet takes precedence. So in this  case, your divs' background color will be white (#fff). In a similar case, HTML files are read top-down, so if you have this code in your HTML file:

```html
<link rel="stylesheet" type="text/css" href="stylesheet-1.css" />
<link rel="stylesheet" type="text/css" href="stylesheet-2.css" />
```

then, with any conflicting styles, those in `stylesheet-2.css` will take precedence.

The second important note is that **styles with higher specificity take precedence**. Again, what the heck does that mean? Specificity goes in the order of _element_ > *class* > _ID_. So, let's say this code exists in your HTML file:

```html
<div id="this-div" class="all-divs">
  <span id="this-span" class="all-spans">What size is this font?</span>
</div>
```

And you have these styles in your CSS file:

```css
div {
  font-size: 12px;
}

div span {
  font-size: 13px;
}

#this-span {
  font-size: 14px;
}

.all-spans {
  font-size: 15px;
}

.all-divs {
  font-size: 16px;
}
```

What size will the font be? It will be 14px because the span ID holds the highest specificity.

But if your CSS reads this instead:

```css
div {
  font-size: 12px !important;
}

div span {
  font-size: 13px;
}

#this-span {
  font-size: 14px;
}

.all-spans {
  font-size: 15px;
}

.all-divs {
  font-size: 16px;
}
```

Your font size will be `12px`. The `!important` note overrides all styles, even if they conflict, even if they are more specific. Of course, if there are two `!important` notes on conflicting classes, then the regular CSS rules take place.

So now that you know what it means, when would you use it? I think [this post](http://css-tricks.com/when-using-important-is-the-right-choice/) over at CSS Tricks has some good use cases.
