---
title: Wait Until All Images are Loaded
description: When you don't want to perform an action until the browser has
  downloaded all appropriate images.
tags:
  - html
  - javascript
image: /blog/default/default-lime-02.png
---

Not know the state of images being loaded can have several side effects.

At the very least, you can run into the (classic) jagged and unpredictable loading behavior:

{% post_image alt="Jagged Image Loading", src="/blog/180603/jagged-image-loading.gif" %}

But it can lead to more serious problems, too. One I've run into in the past is looking for an images dimensions and getting `0` as the result because my function fires before the image is on the page and has physical dimensions.

No matter your use case, it can be important to know when all the images on the page are loaded.

## The Simple Case

In the simplest scenario, you can do something like this (assuming the use of jQuery):

```js
$(document).ready(function () {
  // When we begin, assume no images are loaded.
  var imagesLoaded = 0
  // Count the total number of images on the page when the page has loaded.
  var totalImages = $("img").length

  // After an image is loaded, add to the count, and if that count equals the
  // total number of images, fire the allImagesLoaded() function.
  $("img").on("load", function (event) {
    imagesLoaded++
    if (imagesLoaded == totalImages) {
      allImagesLoaded()
    }
  })

  function allImagesLoaded() {
    console.log("ALL IMAGES LOADED")
  }
})
```

All this does is look at _all_ the images on the page and once they are all loaded, it fires the `allImagesLoaded()` function which simply prints a message to the console.

**GOTCHA!** There's a problem with this approach. Can you spot it?

## The Safer Way

The problem is in our assumption -- the assumption that when this ready function is fired no images have loaded (`var imagesLoaded = 0;`). In reality, we can't be sure this is _always_ going to be the case.

For example, if you wrap this functional script in a `setTimeout` function, you'll almost certainly never see the "ALL IMAGES LOADED" message in your console, because by the time you get to processing the script, at least some of the images will have already loaded.

But, we can get around this!

To do so, we're going to clone every image behind the scenes (i.e. without rendering it to the DOM) and then listen for it to be loaded. Here's what the new script might look like:

```js
$(document).ready(function () {
  // Images loaded is zero because we're going to process a new set of images.
  var imagesLoaded = 0
  // Total images is still the total number of <img> elements on the page.
  var totalImages = $("img").length

  // Step through each image in the DOM, clone it, attach an onload event
  // listener, then set its source to the source of the original image. When
  // that new image has loaded, fire the imageLoaded() callback.
  $("img").each(function (idx, img) {
    $("<img>").on("load", imageLoaded).attr("src", $(img).attr("src"))
  })

  // Do exactly as we had before -- increment the loaded count and if all are
  // loaded, call the allImagesLoaded() function.
  function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded == totalImages) {
      allImagesLoaded()
    }
  }

  function allImagesLoaded() {
    console.log("ALL IMAGES LOADED")
  }
})
```

The trick is all in this line:

```js
$("<img>").on("load", imageLoaded).attr("src", $(img).attr("src"))
```

There's a lot going on in this line, so let's break it down. We _could_ also write this one-liner like this:

```js
// img is a generic <img> element that is not rendered to the DOM.
var newImg = $("<img>")

// When the image is loaded, call imageLoaded() function.
newImg.on("load", imageLoaded)

// Set the source of the new image to match that of the <img> element that has
// been rendered to the DOM.
var src = $(img).attr("src")
newImg.attr("src", src)
```

We add an event listener to this generic image element _before_ adding its source. That way we can be certain the load event listener will capture the load event.

And note that most browsers will cache image downloads, so this doesn't actually result in downloading the image twice, like you may think. But even if the image has been downloaded and cached already, the load event listener will still fire appropriately.

Thus, this is the _safer_ way to ensure all images have been downloaded, and then you can do whatever you want with them.

---

_Note that this example was based on all images on a page. That's certainly not something you need to do. You could scope the images you're targeting to be more specific if you only need to know when images within a certain scope or context have been loaded._
