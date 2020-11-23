---
title: "Manipulate iFrame Content"
description: "When you can communicate with the code inside an iFrame, you can make any change you want to the code within that iFrame."
tags:
  - html
  - javascript
---

We've all been there. You need to make a change within an iFrame (from the outside), and it just won't work. Change a class, add some text, adjust [CSS](/blog/wtf-is-css/). It just won't work.

Well, I have good news and bad news (more of a _GOTCHA!_, really) for you.

The good news is it's possible.

The bad news is you have to have access to the source of the code within the iFrame. In other words, you can't take someone else's website, render it in an iFrame, and then manipulate it in some (obviously clever) way.

But, when you have access to the content within an iFrame, you can use the [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) function in JavaScript to communicate with it.

## Demo

Here's the demo. The grey background is the iFrame and the input field is what would be on your site. Type a message in the input field on your site and see it appear within the iFrame.

_Note: If you're inspecting the page or viewing its source, this may feel a little strange. I use iFrames to render demos in the site. So, the entire example is in an iFrame, and then there's another iFrame inside of that._

<iframe src="/blog/manipulate-iframe-content/demo/index.html" frameborder="0" height="248" class="shadow-md"></iframe>

## Your Site's Code

First, let's start with the code on your site. Your site is going to post to the site within the iFrame.

First, the markup:

```html
<input
  type="text"
  id="my-message"
  placeholder="Type message ..."
  onkeyup="sendToFrame(event)"
/>
<iframe src="/location/of/iframe" frameborder="0" id="my-iframe"></iframe>
```

And the associated script that will post the message:

```js
function sendToFrame(event) {
  var iframe = document.getElementById("my-iframe")
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(event.target.value, "*")
  }
}
```

Note the use of the asterisk (`*`). This is meant to be the target origin of the other window. In other words. It should match the source of your iframe if you only want it posting to one origin. In this case, we only have one iFrame on the page and we're targeting it directly, so we're okay to use the asterisk.

## iFrame Site's Code

The site with the iFrame will be _receiving_ your posted message.

Here's the markup:

```html
<p>
  <strong>Message:</strong>
  <span id="my-message"></span>
</p>
```

And the associated script that will receive the message:

```js
window.addEventListener(
  "message",
  function (event) {
    if (event.origin === window.location.origin) {
      $("#my-message").text(event.data)
    }
  },
  false
)
```

Two important points to note here:

1. We're checking that the origin of the message is on the same domain as this iframe so we don't accept messages from other domains.

2. The data passed with the message is available on the `event` object as `data` (i.e. `event.data` contains the message from the input field in this example).

---

That's it. Pretty simple, right? Now, assuming you have access to both the origin site and the source of the iframe, you can manipulate content within the iFrame by some action occurring outside of it.

---

**References**

- [Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
