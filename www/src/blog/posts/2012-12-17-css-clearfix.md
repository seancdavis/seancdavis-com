---
title: CSS clearfix
tags:
  - html
  - css
description: In working with CSS you're going to come across a class called "clearfix" at some point.
---

In working with CSS you're going to come across a class called "clearfix" at some point.

When you float an element, it is subsequently removed from the flow of elements on the page. If you've played around with floats, you know exactly what I'm talking about; and it's pretty frustrating.

There are several formulas for fixing this - for clearing elements following the floated element. The best one I've found is over at [webtoolkit](http://www.webtoolkit.info/css-clearfix.html). You would insert this code into your stylesheet:

```css
.clearfix:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}

.clearfix {
  display: inline-block;
}

html[xmlns] .clearfix {
  display: block;
}

* html .clearfix {
  height: 1%;
}
```

Then you just add the *clearfix* class to the appropriate elements. And if you need to know how to assign multiple classes to an element, [check this out](http://thepolymathlab.com/2012/12/17/multiple-classes-on-an-html-element/ "Multiple classes on an HTML element").
