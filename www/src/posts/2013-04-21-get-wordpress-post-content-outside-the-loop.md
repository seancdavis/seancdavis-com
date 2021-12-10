---
title: Get WordPress Post Content Outside the Loop
tags:
  - wordpress
description: Some WordPress functions only work when you're inside The Loop. But
  you can still get to the post content when you're outside The Loop.
image: /posts/default/default-blue-02.png
---

When developing for WordPress, you have to be cognizant as to whether you're inside or outside of [The Loop](https://codex.wordpress.org/The_Loop) when performing tasks. Several WordPress functions will work only within The Loop. I've had issues getting content and other post data when working outside The Loop.

Here's how you would echo the post content, grabbing the post object using its ID.

```php
<?php

  // you need to know the post ID
  $id = 1234;
  // retrieves post object
  $post = get_post($id);
  // do something with the post, e.g. echo its content
  echo $post->post_content;

?>
```

Thought this may seem obvious, the _gotcha_ is that you need to know the ID of the post you want to retrieve.

---

**References**

- [WordPress' `get_post()`](http://codex.wordpress.org/Function_Reference/get_post "WordPress get_post()").
