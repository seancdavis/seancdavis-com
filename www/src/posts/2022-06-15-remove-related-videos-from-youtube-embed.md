---
title: Remove Related Videos from YouTube Embed
description: >-
  Hide the “more videos” section on an embedded YouTube video with this quick
  tip.
tags:
  - quick-tip
tweet: I’ve forgotten this trick enough times that it was time to write it down.
image: /posts/220615/remove-related-videos-from-youtube-embed-2dNUejzt.png
seo:
  image: /posts/220615/remove-related-videos-from-youtube-embed-uBzxx6bj--meta.png
---

Something I find obnoxious is when I embed a video in an article that is meant to be helpful and it recommends _related_ videos when paused or ended. This is often distracting to the purpose of embedding some specific video. And it puts a lot of blind trust in YouTube to find videos that would supplement the one I’m sharing.

Fortunately, there’s a way around this. You can append `?rel=0` to the embed URL and the related videos will not appear.

For example:

```html
<iframe
  src="https://www.youtube.com/embed/Ljj1wGFJqPY?rel=0"
  title="YouTube video player"
  frameborder="0"
  allowfullscreen
></iframe>
```

Here’s the difference:

{% post_image
  alt="Embedded YouTube Related Videos Comparison",
  src="/uploads/220615/youtube-video-rel-comparison.png",
  classes="border-t border-b my-6" %}

## Demo

You can see this in action [here](https://codepen.io/seancdavis/pen/OJQdmwB). Play and pause both videos. You’ll see related videos in the top one, but not the bottom one.
