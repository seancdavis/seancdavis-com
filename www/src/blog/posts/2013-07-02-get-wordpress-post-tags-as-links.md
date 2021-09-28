---
title: Get WordPress Post Tags as Links
tags:
  - wordpress
description: How to extract post tags and make them into links while in The Loop.
---

When you're making your way through [The Loop](http://codex.wordpress.org/The_Loop "The Loop"), a lot of post data is available to you with very simple PHP functions. Tags are one of the few items not so easily gathered. And, in most cases, when you want tags, you want their links associated with them. Why? Because their links take visitors to a page that prints the all posts using that tag (i.e. it's a great way to *keep interested visitors on your site longer*). Here's how you do it:

```php
<?php $posttags = get_the_tags();
if ($posttags) {
  foreach($posttags as $tag) { ?>
    <a href="<?= get_tag_link( $tag->term_id ) ?>">
      <?= $tag->name ?>
    </a>
  <?php }
} ?>
```

Note the following with this code: - This code **must be used within The Loop**. - I'm using PHP shorthand for echo -- `<?= ?>` -- this won't work if your Apache server is not configured to do so. If it doesn't work, use `<?php echo ?>` instead.
