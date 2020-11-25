---
title: "Simple Looping Crossfade Image Slideshow"
description: "A simple way to give the appearance of a full-screen looping slideshow with crossfading animation."
tags:
  - css
  - html
  - javascript
---

With some [CSS](/blog/wtf-is-css/) and a little JavaScript, we can easily provide a crossfade animation to a simple slideshow.

Here's what we're going to be creating:

{% codepen user="seancdavis", id="BxGgKV", title="Crossfade Image Slideshow" %}

**GOTCHA!** There are a few caveats to this particular solution that you should know about up front:

- It is using ES6, which means it won't be supported in Internet Explorer and other older browsers. If you have to support older browsers and are going to use this code directly, you'll want to use an ES6 compiler, like [Babel](https://babeljs.io/) or manually convert the code to plain old JavaScript.
- It also uses jQuery because I have no personal vendetta against it.
- It is only supporting a single slideshow on a page--you'd have to adjust the code to support multiple slideshows on a page.
- The slideshow requires that at least two images be present.

With that, let's get into it.

## The HTML

Let's cover the markup first. With the JavaScript, I'm going to target a `data-slideshow` attribute, which will be our containing element. Within it, we'll place a series of images.

```html
<div class="img-container" data-slideshow>
  <img
    src="//images.unsplash.com/photo-1475872711536-95ec04b9d290?auto=compress,format&w=1440"
  />
  <img
    src="//images.unsplash.com/photo-1471696035578-3d8c78d99684?auto=compress,format&w=1440"
  />
  <img
    src="//images.unsplash.com/photo-1496861083958-175bb1bd5702?auto=compress,format&w=1440"
  />
  <img
    src="//images.unsplash.com/photo-1524388680868-377a2e6bbb1c?auto=compress,format&w=1440"
  />
  <img
    src="//images.unsplash.com/photo-1502164980785-f8aa41d53611?auto=compress,format&w=1440"
  />
</div>
```

## The CSS

By default, we want the container to span the full width and height of the screen and for the images to be positioned absolutely within the container.

The images, in their default state, have an `opacity` of `0` and a `z-index` of `-1`, meaning they are behind the body _and_ invisible.

```css
.img-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100vw;
}

.img-container img {
  height: 100%;
  left: 0;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
}
```

The trick to the whole thing is in the transition. The transition works by placing one image on top of another and fading it out, which makes it look like the image in the back is fading _in_.

To accomplish this, first we have a `.prev` and `.next` class. The `.prev` element sits on top and the `.next` sits below, ready to be "activated."

_Note: Naming is hard. I usually call "prev" either "current" or "active". The problem is that, depending on where you are in the transition period, either "next" or "prev" could be the "active" element. Maybe "top" and "bottom" would make more sense. It's up to you if you want to change it._

```css
.img-container img.next {
  opacity: 1;
  z-index: 1;
}

.img-container img.prev {
  opacity: 1;
  z-index: 2;
}
```

Notice also in both cases the `opacity` is `1`, which means we can see the image fully (well, the one on top, at least).

And last is the actual fade animation, which we will accomplish with a CSS transition.

```css
.img-container img.fade-out {
  opacity: 0;
  transition: visibility 0s 0.5s, opacity 0.5s linear;
  visibility: hidden;
}
```

Given these styles, once we add a `.fade-out` class to the top (prev) element, it will fade out.

## The JavaScript

Let's step through this, (about) one function/method at a time.

First, the class, its constructor and then a plain old script to instantiate them when the page is ready.

```js
class Slideshow {
  constructor() {
    this.initSlides()
    this.initSlideshow()
  }
}

$(document).ready(function () {
  new Slideshow()
})
```

If you run that now, you'll see an error because neither `initSlides()` or `initSlideshow()` are functions within the `Slideshow` class.

First, let's add `initSlides()`:

```js
initSlides() {
  this.container = $('[data-slideshow]');
  this.slides = this.container.find('img');
  this.slides.each((idx, slide) => $(slide).attr('data-slide', idx));
}
```

Here we create a reference to the containing element, which we'll use to find the images (or _an image_ in some cases) within it. Then we loop through each of the images (i.e. the _slides_) and adda a `data-slide` attribute to each with an incremental index. This is how we'll control which slides to work with.

Now, `initSlideshow()`:

```js
initSlideshow() {
  this.imagesLoaded = 0;
  this.currentIndex = 0;
  this.setNextSlide();
  this.slides.each((idx, slide) => {
    $('<img>').on('load', $.proxy(this.loadImage, this)).attr('src', $(slide).attr('src'));
  });
}
```

First, we createa a couple references--`imagesLoaded` is the number of images that have loaded on the page (more on this in a moment) and `currentIndex` is what we're going to use to track which slide is next up.

Then we see we're calling a `setNextSlide()` method we don't have yet, so let's come back to that.

And last, we're looping through the slides again. But this time we're loading an image without adding it to the DOM. Before I explain more, let's see what `loadImage` looks like:

```js
loadImage() {
  this.imagesLoaded++;
  if (this.imagesLoaded >= this.slides.length) { this.playSlideshow() }
}
```

Combined with the loop above, we are listening for images to be loaded to a generic image element. When an image is loaded, it fires this `loadImage()` method which determines whether or not all the images have loaded.

If all the images have loaded, then it's time to call `playSlideshow()` because it's safe to begin the slideshow.

_Note: The reason I solve for loading in this manner is because there's a possibility that when I'm looping through the slides the image has actually loaded already. The reason it's not a big deal ot load an image twice is because the browser caches the file locally so it will speed up the process._

Let's go back and add the `setNextSlide()` method before starting the slideshow.

```js
setNextSlide() {
  this.nextSlide = this.container.find(`[data-slide="${this.currentIndex}"]`).first();
  this.nextSlide.addClass('next');
}
```

This method set a `nextSlide` variable we can reference throughout the class as the image with the index matching that of `currentIndex`. It then adds a `next` class to that element, which we know gives it an opacity and z-index of `1`.

Okay, now let's start the slideshow.

```js
playSlideshow() {
  this.slideshow = window.setInterval(() => { this.performSlide() }, 3500);
}
```

It's pretty simple. We simply create an interval that calls `performSlide()` once during each interval. I set the intervals to 3.5 seconds, but you can use whatever timing you'd like. (However, given our style transitions, I wouldn't go any less than 1 second).

The last method we want is the `performSlide()` method.

```js
performSlide() {
  if (this.prevSlide) { this.prevSlide.removeClass('prev fade-out') }

  this.nextSlide.removeClass('next');
  this.prevSlide = this.nextSlide;
  this.prevSlide.addClass('prev');

  this.currentIndex++;
  if (this.currentIndex >= this.slides.length) { this.currentIndex = 0 }

  this.setNextSlide();

  this.prevSlide.addClass('fade-out');
}
```

This is a four-step process:

1. Remove any relevant classes from the previous slide.
2. The slide we had been referencing as _next_ now becomes _prev_.
3. A new index gets set, making sure to reset itself if we're on the last image. Then use the current index to set the reference to the next slide.
4. Perform the "slide" by fading out the prev element.

---

There's not too much going on when it comes right down to it. Hopefully you can use this as a starting point and build on top of it from there.

You can see the full script [in the CodePen](https://codepen.io/seancdavis/pen/BxGgKV).

---

**References / Credits**:

- [CodePen](https://codepen.io/seancdavis/pen/BxGgKV)
- [Unsplash](https://unsplash.com/)
