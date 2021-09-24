---
title: Better Website Performance with Pixelated Placeholder Images
description: "Page load times decrease as the number of images on a page increase. Learn the pixelated placeholder method that mitigates performance issues caused by images without negatively impacting user experience."
tags:
  - javascript
---

Images are notorious for slowing down web pages. All too often images used are larger than they need to be. And in many cases all images are loaded when the page loads, which means a user may not even see all the images without scrolling to the bottom of the page.

One approach to mitigating these increased page load times is to take what I like to call the _pixelated placeholder_ approach. Pixelated placeholders are extremely small versions of the full-size image that are present when the page loads. The small images are stretched to the dimensions of their full-sized self. Then, once the rest of the page contents have properly loaded and the page can be interacted with, we can use a bit of JavaScript to load the full-size images and fade those full-size images smoothly into view. This creates a clean fade-in loading effect similar to this feature popularized by Medium:

![Medium Image Load]({{ "/blog/190109/medium-image-load.gif" | imgix_url }})

Let's look at how you can build a similar type of feature on your website to help increase page performance.

## Setup

For the [HTML](/blog/wtf-is-html/) markup, let's build a grid of images inside a container. For these images, the `src` attribute should be set to the pixelated placeholder and the full-size image URL will be set as the `data-src` attribute.

```html
<div class="container">
  <img
    src="https://images.unsplash.com/photo-1545058803-e4ff5db914d2?auto=format&w=10&h=10&fit=crop"
    data-src="https://images.unsplash.com/photo-1545058803-e4ff5db914d2?auto=format&w=800&h=800&fit=crop"
  />
  <img
    src="https://images.unsplash.com/photo-1545058803-e4ff5db914d2?auto=format&w=10&h=10&fit=crop"
    data-src="https://images.unsplash.com/photo-1545058803-e4ff5db914d2?auto=format&w=800&h=800&fit=crop"
  />
  <img
    src="https://images.unsplash.com/photo-1545238771-1cfdc621c2ea?auto=format&w=10&h=10&fit=crop"
    data-src="https://images.unsplash.com/photo-1545238771-1cfdc621c2ea?auto=format&w=800&h=800&fit=crop"
  />
  <!-- And so on ... -->
</div>
```

Compare one of these image's `src` and `data-src` attributes. Notice the `src` will is a `10px` square image and the full-size is an `800px` square image. I use the same image for the placeholder because it helps create that nice fading effect. Near the end of the article, I'll mention a method for easily creating placeholder versions without having to use Photoshop to resize every image.

The key in getting this to work is making sure there is a container for each image and that it can stretch to 100% width of that container. To accomplish this, I chose to use a four-column grid with the help of [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout). Here's the CSS:

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
  background-color: #aaaaaa;
  width: 100%;
}
```

At this point the page will look something like this:

{% codepen user="seancdavis", id="oNLroxX", title="Pixelated Placeholder Images" %}

Notice this is a grid of `10px` wide images, but they are stretched to fill their container in the four-column grid.

## The JavaScript

The next piece is writing some JavaScript to fade in the full-size image. Here is the JavaScript code with each line commented so you can follow what's going on. Read through this and then we'll look at some of the key features below.

Before you do, note that it is making use of jQuery and also uses ES2015 classes. These two features make for cleaner code. If you choose to avoid jQuery or to support older browsers, it'll be up to you to make the appropriate changes. Otherwise, make [jQuery is loaded](https://code.jquery.com/) on the page prior to running this script.

```js
class PlaceholderImage {
  constructor(el) {
    // Set reference to the pixelated placeholder image.
    this.placeholder = $(el)
    // Wrap the placeholder element so we can perform the transition.
    this.wrapElement()
    // Load the full-size image.
    this.loadImage()
  }

  wrapElement() {
    // Add a "placeholder-image" class to the placeholder. This makes the
    // placeholder positioned relatively, which enables it to sit in front of
    // the absolutely-positioned full-size image during the transition.
    this.placeholder.addClass("placeholder-image")
    // Wrap the placeholder image in a <span> tag that is positioned relatively
    // so the full-size image can be positioned absolutely inside it.
    this.placeholder.wrap('<span class="placeholder-wrapper"></span>')
    // Set a reference to the wrapping element.
    this.wrapper = this.placeholder.parent()
  }

  loadImage() {
    // Prepend a blank image to the wrapper. The "placeholder-loading" class
    // positions it absolutely just behind the placeholder image.
    this.wrapper.prepend('<img class="placeholder-loading">')
    // Set a reference to the image.
    this.image = this.wrapper.find(".placeholder-loading").first()
    // When the image loads, run the transitionImage() function, maintaining the
    // proper scope. This is run before "src" is set so that we can be sure it
    // fires.
    this.image.on("load", $.proxy(this.transitionImage, this))
    // Set the "src" attribute to the value of the "data-src" attribute.
    this.image.attr("src", this.placeholder.data("src"))
  }

  transitionImage(event) {
    // Fade out the placeholder once the full-size image is loaded.
    this.placeholder.fadeTo(1000, 0, () => {
      // After fade is complete, apply the classes that were on the placeholder
      // image (sans "placeholder-image") to the full-size image.
      this.image
        .attr("class", this.placeholder.attr("class"))
        .removeClass("placeholder-image")
      // Remove the placeholder image.
      this.placeholder.remove()
      // Unwrap the full-size image (i.e. delete the <span> element).
      this.image.unwrap()
    })
  }
}

$(document).ready(function () {
  // When the page loads, run the pixelated placeholder process for each image
  // on the page.
  $("img").each((idx, img) => new PlaceholderImage(img))
})
```

When the page loads, the script loops through every image on the page and instantiates the `PlaceholderImage` class, which kicks off loading the full-size image. From there, these are the steps the script follows:

1. Wrap the pixelated placeholder image in a `<span>` tag.
2. Add the full-size image inside the `<span>` tag _before_ the pixelated image so it falls behind the pixelated placeholder. This lets the browser load the full-size image while the user can still only see the placeholder.
3. Once the full-size image is loaded, fade _out_ the pixelated placeholder, giving the illusion that the full-size image is fading _in_.
4. Remove the pixelated placeholder and the `<span>` wrapper, then apply the original classes from the placeholder image to the new full-size image.

Notice that there are three different classes used throughout the script. This is to control the temporary styling with [CSS](/blog/wtf-is-css/) during the loading process. For this to look right, a bit more CSS is required:

```css
.placeholder-wrapper {
  position: relative;
  line-height: 0;
}

.placeholder-image {
  position: relative;
}

.placeholder-loading {
  height: 100%;
  position: absolute;
  width: 100%;
}
```

And this is the result:

{% codepen user="seancdavis", id="QWEXqoq", title="Pixelated Placeholder Images" %}

## Next Steps

That's it in a nutshell. The core of this process that fades in full-size images behind pixelated placeholders is simple. Polishing it and making it work in all scenarios within your website may grow complex over time. I intentionally omitted that complexity from this article so you could focus on the basics and have a foundation on which you can build additional features as needed.

Here are some ideas for next steps you may take with your pixelated placeholders:

### Maintain the Original Image

Notice that the script creates a new image from scratch to load our full-size image. That way we had control over the `load` event listener and would know precisely when the image was loaded.

The downside to this approach is that any necessary attributes present on the pixelated placeholder are lost once the full-size loading process is complete. The script does store a reference to the original classes, but that's it, and you'll probably require much more than that eventually.

One option is to copy all the necessary attributes from the placeholder to the full-size image prior to destroying the placeholder. Or, you could begin by cloning the placeholder so you have all its attributes and temporarily adding the classes you'll use for the transition process. The first option is brittle, while the second option comes with added complexities.

### Target Specific Images

It may be that you don't want to perform this loading process for every image on the page. In that case you may consider the use of a [data attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) to target only the images you care about.

For example, let's say you only wanted to perform this process for images with a `data-pixelated-placeholder` attribute. Then your loop at the bottom of the script might look more like this:

```js
$("img[data-pixelated-placeholder]").each(
  (idx, img) => new PlaceholderImage(img)
)
```

### Support Background Images

Notice that this approach is built specifically for `<img>` elements and does not consider that the browser also has to load background images. That's an entirely separate set of functionality because it requires considering the content within the element with the background image, which can be a tricky problem to solve for.

### Lazy Loading

This approach is just one step in increasing pages slowed down by image loading. It's still true you may spend resources loading images your users never see. That's where lazy loading comes into play. I [have an article on just that subject](/blog/lazy-load-images-intersection-observer-api/) that may help you get started with incorporating lazy loading into this feature.

### Use an Image Processing Library

As I hinted earlier, there are image processing libraries (e.g. [imgix](https://www.imgix.com/)) that will handle create different sized and cropped images of your original image so you don't have to manually crop each image, and so you don't have to use some generic placeholder. imgix comes at a cost, but it has been worth every penny.

And some CMS products like Contentful also have [similar features](https://www.contentful.com/developers/docs/references/images-api/).

Oh, and if you go with imgix, I created [a library that does all this work for you](https://github.com/ample/imgix-optimizer), including support for background images.

### srcset/sizes Attributes

In this example I generically used `800px` square images without any regard for how the images will be displayed on the screen. If you're able to use an image processing service, you can also use the `srcset` and `sizes` attributes to control the size of the image that is loaded. But that will increase the complexity of your script in a significant way.

Alternatively, if using imgix, they have [an imgix.js script](https://ericportis.com/posts/2014/srcset-sizes/) that handles all of that for you. Again, it's worth every penny.

(If you want to learn more about `srcset` and `sizes`, [this article is worth a read](https://ericportis.com/posts/2014/srcset-sizes/).)

### Browser Support

With the use of a JavaScript class, this script will not work in older browsers. If you are required to support older browsers, consider creating a build pipeline that makes use of [Babel.js](https://babeljs.io/) to support older browsers. Or rewrite the script to be more functional.

If you want to take a look at Babel, I [have a five-part series on compiling ES6 (new JS) code with Gulp and Babel](/blog/compile-es6-code-gulp-babel-part-1/).

---

That's all for now. I hope you're able to use this code as a foundation and apply it to your specific situation. And of course, you can always bug me if you feel like something isn't working or if you need someone to help bounce around ideas.
