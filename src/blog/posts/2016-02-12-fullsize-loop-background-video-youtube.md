---
title: "Full-Size, Looping Background Video with YouTube Video"
description: "It seems looping background videos are the new thing. But you don't have to serve up the video on your server. Let's use a YouTube video to accomplish it!"
tags:
  - html
  - css
---

**UPDATE:** I have rewritten much of this article to incorporate the [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference), which is now the preferred method for doing this.

---

At some point we're going to want to (or be asked) to make a looping background video for a website. Everyone is doing it these days.

The thing is it seems simpler if you serve the video up yourself, on your server. To me, that's an unnecessary hassle. Why deal with video if you don't have to, right?

So, let's look at how to achieve the same effect, but with a YouTube video.

## 01: Video ID

First, you'll want to get the ID of the video, which is unique URL segment after the `/` in the share URL. For example, if the share URL is `https://youtu.be/LS-ErOKpO4E`, the video ID is `LS-ErOKpO4E`.

## 02: Base HTML/CSS

Once you have that, we can move on to the [HTML](/blog/wtf-is-html/). Let's keep it nice and simple:

`HTML` {.filename}

```html
<div class="bg-video">
  <div class="overlay"></div>
  <div id="player"></div>
</div>
```

Then we just need the styles. Now, what I've decided to do here is keep it _stuck_ (fixed) to the full size of the page. You may have different restrictions and have to alter this code a bit.

`CSS` {.filename}

```css
.bg-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}

.bg-video #player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
}

.bg-video .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
```

If you are just filling a container, then your `.bg-video` wouldn't be `fixed`, but `relative`. And the `width` and `height` of the interior elements would change to percentages. But your mileage may vary depending on what else you have surrounding the items.

## 03: Add Some Content

We can add a little content to sit on top, just to show you what it looks like.

`HTML` {.filename}

```html
<h1>Hello World</h1>
```

`CSS` {.filename}

```css
h1 {
  color: white;
  text-align: center;
  margin-top: 35vh;
  font-size: 64px;
  text-shadow: 1px 1px 3px black;
}
```

## 04: Hook Up The JavaScript

We're going to use [YouTube's IFrame API](https://developers.google.com/youtube/iframe_api_reference) to render the video, as that is currently the prefered method.

`JS` {.filename}

```js
// Loads the YouTube IFrame API JavaScript code.
var tag = document.createElement("script")
tag.src = "https://www.youtube.com/iframe_api"
// Inserts YouTube JS code into the page.
var firstScriptTag = document.getElementsByTagName("script")[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

var player

// onYouTubeIframeAPIReady() is called when the IFrame API is ready to go.
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "LS-ErOKpO4E", // the ID of the video (mentioned above)
    playerVars: {
      autoplay: 1, // start automatically
      controls: 0, // don't show the controls (we can't click them anyways)
      modestbranding: 1, // show smaller logo
      loop: 1, // loop when complete
      playlist: "kNizPk7xBbs" // required for looping, matches the video ID
    }
  })
}
```

That's it! [Here's the gist](https://gist.github.com/seancdavis/1badf83cc9db5a9c22dc) of the code all together.

### Preview

{% codepen
    user="seancdavis",
    id="ZEOgzqr",
    title="Full-Size, Looping Background Video with YouTube Video" %}

**References**:

- [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference)
- My original article was much closer to the approach in [this article](https://www.developphp.com/video/CSS/Video-Background-Tutorial-Plus-Youtube-Embed).
