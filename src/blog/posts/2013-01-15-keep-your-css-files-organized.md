---
title: Keep Your CSS Files Organized
tags:
  - css
  - organization
description: CSS files are notorious for very quickly growing long, jumbled and confusing. Here's how I stay organized
---

CSS files are notorious for very quickly growing long, jumbled and confusing. I'm not formally trained in design/development, so I don't know of the accepted way to keep a CSS file organized, but I know how I do it, and it works for me. So it just may help you, too.

# Pick Your "Style"

You need to adopt a *style* for your CSS syntax, and then you need to stick to it. As long as the syntax is correct, your pages are going to render to what you've designed, but you are the one who needs to navigate them, so make it easy to do so. Check out these examples:

```css
body{color:#fff;}

body{
  color:#fff;
}

body{
color: #fff;
}

body {
  color: #fff;
}
```

All of these are saying the same exact thing. And they'll all work. So, pick your style and stick with it.

There may be factors that affect what you choose. In other words, pay attention to what your text editing program does by default, and take advantage of that. For example, if after hitting '{' your application indents the next line, then you probably should de-indent the line. But if it doesn't indent by default, is it worth it to you to indent every line?

# Make a Table of Contents

Yes! Believe it or not, a table of contents can really come in handy once you see your CSS file for your simple website has 1,000 lines.

To make it effective, you should: - Create some indicating character so a *Find* function in your text editor will help you quickly reach that section. I use an equal sign. - Keep it organized. I like to organize by section of a page, from top to bottom.

So a TOC and its section headers may look like this:

```css
/*
Table of Contents
---------------------------
=Globals
=Header
=Main Menu
=Content
=Footer
*/


/* =Globals
---------------------------- */
html {
  margin: 0;
}


/* =Header
---------------------------- */
#header {
  background-color: transparent;
}
```

Again, feel free to accomplish this however you'd like. I'm just showing you what I use, and it's worked pretty well for me up to this point.
