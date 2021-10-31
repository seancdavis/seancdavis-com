---
title: Lazy Load Images Using Intersection Observer API
description: Use just a little JavaScript and you'll be able to postpone loading
  images until they are available in the viewport.
tags:
  - javascript
image: /blog/default/default-orange-03.png
---

Our goal here is simple. We want to load images only when we can see them within the [viewport](https://developer.mozilla.org/en-US/docs/Glossary/Viewport).

It used to be that figuring out whether an element was present within the viewport was a heavy and imprecise operation. For example, you could look at every element you care about every time a scroll event is fired and look for its position on the screen relative to the top left corner and compare that to the current scroll position. Yes, it was a nightmare.

Fortunately, today JavaScript comes packed with a powerful feature in its [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) that makes figuring out which elements are within the viewport nice and simple.

Before we get to this API, let's look at the structure of the markup I'm going to use in the example. After that, we will add the necessary JavaScript and to achieve lazy loading.

## Image Grid

With the help of [Unsplash's embedding feature](https://source.unsplash.com/), I'll use a grid of images to demonstrate the lazy loading process:

```html
<div class="container">
  <img src="https://source.unsplash.com/random/500x500" />
  <img src="https://source.unsplash.com/random/500x502" />
  <img src="https://source.unsplash.com/random/500x504" />
  <img src="https://source.unsplash.com/random/500x506" />
  <!-- And so on ... -->
</div>
```

_Note: The dimensions change slightly from image to image so Unsplash delivers a different image for each `<img>` element._

With a little [CSS](/blog/wtf-is-css/), the images can be displayed in a four-column grid using [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/):

```css
:root {
  font-size: 16px;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem;
}

img {
  width: 100%;
}
```

This is the result:

{% codepen user="seancdavis", id="yLJdPJx", title="Pixelated Placeholder Images" %}

This is not an ideal way to load images on a page because we're loading all the images when the page loads, including some that users may never see unless they scroll. This slows down the load time for the page, ultimately resulting in a longer duration before users can interact with the page's content.

So, for the next step, we're going to introduce the idea of a placeholder image.

## Placeholder Image

With a placeholder image, the source of the image is a small and consistent (shared) image, such that there is only a single placeholder image shared among all (to-be lazy loaded) elements on the page. But, we don't want to lose the reference to what we want the `src` attribute ultimate will be, so we store that value as a [data attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) (`data-src`) on the image, like so:

```html
<img
  src="https://via.placeholder.com/10"
  data-src="https://source.unsplash.com/random/500x500"
/>
<img
  src="https://via.placeholder.com/10"
  data-src="https://source.unsplash.com/random/500x502"
/>
<img
  src="https://via.placeholder.com/10"
  data-src="https://source.unsplash.com/random/500x504"
/>
<!--- And so on ... -->
```

Now when the page loads, only the single placeholder image is loaded, so content can be rendered and interacted with sooner. In the next section we'll use JavaScript to set each image's `src` attribute to its `data-src` attribute (showing the image we want) after page loads and when the image intersects the user's viewport.

Note that the key to the placeholder trick is being able to set the image width to `100%` or some other knowable width. That way we can have a really small image (`10px` wide in this example) stretched to the appropriate size that loads quickly.

This is what we get with only placeholder images (without the necessary JavaScript):

{% codepen user="seancdavis", id="rNLEYMR", title="Pixelated Placeholder Images" %}

## Lazy Loader

Last, it's time for the JavaScript. Before we do that, there's one more piece to the markup. We're not going to assume every image should be lazy loaded. Instead, we'll have to explicitly ask for lazy loading to affect an image by adding a `data-lazy-load` attribute to each image we want lazy loaded.

```html
<img
  src="https://via.placeholder.com/10"
  data-src="https://source.unsplash.com/random/500x500"
  data-lazy-load
/>
<img
  src="https://via.placeholder.com/10"
  data-src="https://source.unsplash.com/random/500x502"
  data-lazy-load
/>
<img
  src="https://via.placeholder.com/10"
  data-src="https://source.unsplash.com/random/500x504"
  data-lazy-load
/>
<!--- And so on ... -->
```

Now we can write the JavaScript. Here it is, commented to help you understand what's going on:

```js
;(function () {
  // Initialize Intersection Observer. The argument passed here is the callback
  // function that should be run when the observer is triggered.
  var observer = new IntersectionObserver(onIntersect)
  // Observe every element with the "data-lazy-load" attribute for it to
  // intersect the screen.
  document.querySelectorAll("[data-lazy-load]").forEach(function (img) {
    observer.observe(img)
  })

  // This is the callback function when the observer is triggered. entries is an
  // array of all observable elements for which the function was triggered, and
  // observer is our observer instance.
  function onIntersect(entries, observer) {
    // Step through each entry in the entries array ...
    entries.forEach(function (entry) {
      // Don't do anything if the element has already been processed or if it
      // isn't currently intersecting. The Intersection Observer also fires when
      // an element leaves the viewport, which is why we need this check.
      if (entry.target.getAttribute("data-processed") || !entry.isIntersecting)
        return true
      // Set the images source to the value of the "data-source" attribute. This
      // is why we were storing the source we ultimately want to load in a data
      // attribute.
      entry.target.setAttribute("src", entry.target.getAttribute("data-src"))
      // Add a new attribute to the image called "data-processed" and set it to
      // true. We do this so we only process each element a single time and we
      // don't try to reload an image that's already been loaded.
      entry.target.setAttribute("data-processed", true)
    })
  }
})()
```

Hopefully the comments are enough to follow the code. The one thing missing is that that the code is wrapped in an anonymous function (`(function() {})()`) that gets run automatically when the script is loaded. This is a common method for [keeping JavaScript code local](/blog/two-ways-to-keep-javascript-local/) so the variables and functions don't bleed out into other JS code used throughout the site.

Note that the Intersection Observer API is not supported by Internet Explorer. If you need IE support, you'll want to load [the polyfill](https://github.com/w3c/IntersectionObserver) prior to your code.

When we put it all together, this is what we get:

{% codepen user="seancdavis", id="JjKQORP", title="Pixelated Placeholder Images" %}

## Ways To Improve

That's all it takes to get started, but as you can see, it's not super polished. Here are a few ideas on where to go from here:

- Protect against elements not being images, if necessary. We used `data-lazy-load` as the specification for lazy loading an image, but we don't validate that it's an image, enabling a developer to add the attribute to any element. (Or, maybe you want to allow other types of elements for your particular scenario.)
- Play with the options for `IntersectionObserver`. There is an optional second argument when initialize the observer which is an options object. One option is `rootMargin` which enables you to consider elements as intersecting prior to them hitting the viewport, which may be desirable if you don't want the user to see the loading process.
- Fade in images rather than replacing them, since replacing them has a flash of no content while the browser downloads the image. I wrote [an article on the subject](/blog/better-website-performance-pixelated-placeholder-images/) that should help to get you started.
- Load placeholder images that will match the dimensions of the resulting image so the page content doesn't jump as images are loaded.
