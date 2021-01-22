---
title: Using jQuery and CoffeeScript in WordPress
tags:
  - coffeescript
  - javascript
  - jquery
  - wordpress
description: "The standard ready function doesn't always work in WordPress plugins. Here's a workaround."
---

If you're properly enqueuing [scripts](http://codex.wordpress.org/Function_Reference/wp_enqueue_script "wp_enqueue_script") and [styles](http://codex.wordpress.org/Function_Reference/wp_enqueue_style "wp_enqueue_style") into your WordPress plugins and themes, you may have noticed this doesn't work:

```js
$(document).ready(function () {
  alert($(".container").length)
})
```

## jQuery

The solution, using jQuery, is this:

```js
jQuery(document).ready(function ($) {
  alert($(".container").length)
})
```

You have to pass the `$` to the ready function before you can effectively use it.

## CoffeeScript

The CoffeeScript equivalent to this is:

```coffee
jQuery(document).ready ($) ->
  alert $('.container').length;
```

Short, simple, but a frustration saver.
