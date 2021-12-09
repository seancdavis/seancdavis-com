---
title: WTF is the DOM?
description: A brief introduction to the DOM with a quick example on
  manipulating it, and a link to digging in deeper.
tags:
  - html
  - wtf
image: /blog/default/default-orange-03.png
---

A web page is just a file, or a _representation_ of a file. Usually an [HTML](/blog/wtf-is-html/) file. The DOM, or _document object model_, is the API through which that file's HTML code can be accessed and manipulated.

The DOM is _technically_ separate from [JavaScript](/blog/wtf-is-javascript/), but is often seen in use through JavaScript. For example, the following code gives us a list of all links (anchor tags/) on the page:

```js
const allLinks = document.getElementsByTagName("a")
```

It is through the DOM that the contents of the HTML page can be manipulated. For example, I could take the `allLinks` object from above and make them all red.

```js
for (let link of allLinks) link.style.color = "red"
```

Run those two lines in the browser after the page has been loaded and it will turn the links on the page red!

{% post_image src="/blog/200728/make-links-red.gif", alt="Make Links Red" %}

That's a very brief introduction to the DOM, but that's all it is at a very high level — a programmatic representation of the HTML code that is the basis for what you see on screen when viewing a web page.

If you'd like to learn more MDN has [an excellent introductory page](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) on the DOM that goes into a lot of detail.
