---
title: "Change CSS within an iFrame"
description: "When you have access to the code inside an iFrame, you can manipulate its DOM that can lead to style changes."
tags:
  - html
  - javascript
---

This is a more specific (and perhaps more useful) case built from [my base article on communicating with an iFrame](/manipulate-iframe-content.html). (That article has some base content, but it's not required to understand this article.)

To quickly recap, as long as you have access to the source of the iframe (the code and domain on which the iframe is hosted), then you can communicate with it and, therefore, adjust its content (i.e. manipulate its DOM).

## Demo

The case we're going to create is that we need to adjust the theme of what is inside the iframe by clicking a button outside the frame.

We'll have two buttons, one to activate the light (default) theme and the other to activate the dark theme.

<iframe src="/blog/change-css-iframe/demo" frameborder="0" height="300" class="shadow-md"></iframe>

## Your Site's Code

First, let's start with the code on your site. Your site will hold the buttons and the iframe that we want to manipulate.

The markup may look something like this:

```html
<button data-theme="light">Light Theme</button>
<button data-theme="dark">Dark Theme</button>

<iframe src="/location/of/iframe" frameborder="0" id="my-iframe"></iframe>
```

Our main focus in the script will be to toggle the theme within the iframe. To do this, we're taking advantage of the [`postMessage` method on the `window` object](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

```js
// Send message to the iFrame with the theme we want to activate.
function activateTheme(theme) {
  var iframe = document.getElementById("my-iframe")
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(theme, "*")
  }
}
```

_Note: If you're using this exact approach, you may want to add some sort of active toggle to the buttons to show which theme is currently active._

You'll want an event listener to the button clicks and also activate the default theme once the iframe is ready. That looks like this:

```js
// Load the light them when the iFrame is ready.
$("#my-iframe").on("load", function () {
  activateTheme("light")
})

// Listen for clicks on buttons with a "data-theme" attribute, and activate that
// theme on click.
$("button[data-theme]").on("click", function (event) {
  activateTheme($(this).data("theme"))
})
```

Altogether, we have:

```js
;(function () {
  $("#my-iframe").on("load", function () {
    activateTheme("light")
  })

  $("button[data-theme]").on("click", function (event) {
    activateTheme($(this).data("theme"))
  })

  function activateTheme(theme) {
    var iframe = document.getElementById("my-iframe")
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(theme, "*")
    }
  }
})()
```

_Note: Using the anonymous function approach (`(function() {})()`) avoids placing `activateTheme` into the global namespace, which we do not want._

## iFrame Site's Code

The site with the iFrame will be _receiving_ your posted message.

For toggling the theme, we may choose to place a class on the body and adjust the theme that way. A very basic example may have [CSS](/wtf-is-css) that looks like this:

```css
body,
body.theme-light {
  background-color: #ededed;
  padding: 1rem;
}

body.theme-dark {
  background-color: #444;
  color: #fff;
}
```

And then the JavaScript would listen for a message to be posted and set the appropriate class:

```js
window.addEventListener(
  "message",
  function (event) {
    if (event.origin === window.location.origin) {
      $("body").attr("class", "theme-" + event.data)
    }
  },
  false
)
```

_Note: We checking that the origin of the message is on the same domain as this iframe so we don't accept messages from other domains._

---

That's it.

The basics of it are pretty simple. Although the problem you're solving may be more involved, I hope this base can help get you started.

---

**References**

- [Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
