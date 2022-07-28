---
title: Custom Embeds
description: Support for custom embedded elements.
tags: []
tweet: "This is a test. Test #3."
---

## Video

Videos are native, but only YouTube videos are supported.

{% youtube_embed id="Ljj1wGFJqPY" %}

## Tweets

This is a twitter embed that should be supported. Captions add no additional functionality at this time.

<blockquote class="twitter-tweet">
  <p lang="en" dir="ltr">
    Every time I get close to wrapping up a project working with a new designer,
    I’m reminded of the benefit of considering extremes early on. We require so
    much flexibility and variability today that it’s impossible to capture a
    single, idealistic design. https://t.co/qTphiBEbNf
  </p>
  &mdash; Sean C Davis (@seancdavis29)
  <a href="https://twitter.com/seancdavis29/status/1550468441533870080"
    >July 22, 2022</a
  >
</blockquote>
<script
  async
  src="https://platform.twitter.com/widgets.js"
  charset="utf-8"
></script>

## Stackblitz

Code playgrounds should be rendered using a shortcode, since they don't require accessing an API to render.

{% code_playground url="https://stackblitz.com/edit/nextjs-ehvtnq?ctl=1&embed=1&file=components/Link.jsx" %}
