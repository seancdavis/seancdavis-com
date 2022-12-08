---
title: Transforming Unsplash Images
description: >-
  Unsplash uses Imgix to serve its images, which means you can transform the
  images before downloading.
tags:
  - quick-tip
tweet: >-
  One hidden gem with @unsplash is that they serve images using @imgix. This
  means you can manipulate images on the fly, before downloading.


  (Just be sure to follow the fair use policy, and always add attribution!)
image: /posts/221208/transforming-unsplash-images-PsQECZEG.png
seo:
  image: /posts/221208/transforming-unsplash-images-RX1EJLpO--meta.png
---

[Unsplash](https://unsplash.com/) is an amazing image service! They provide high-quality images for free from talented photographers located all over the world.

Something I found years ago that I've loved is that [Unsplash uses Imgix](https://imgix.com/customers/unsplash) to serve, transform, and optimize their images.

This means that to use an Unsplash image, you don't _technically_ have to download it. But you can grab the URL, [add your transformation parameters](https://docs.imgix.com/apis/rendering), and get the image you want.

### An Example

Say I search for `mountains` and end up seeing an image I love in the results.

{% post_image alt="", src="/uploads/221208/mountains.jpeg" %}

Instead of downloading. I can copy the image URL.

{% post_image alt="", src="/uploads/221208/copy-image-url.png" %}

This would give me something like this:

```txt
https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80
```

You can see that the parameters in the URL can be manipulated. I could change this to be a square by changing the URL to:

```txt
https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600
```

Which would give me this image:

{% post_image alt="", src="/uploads/221208/mounbtains-square.avif" %}

And thus, we have the power of Imgix's transformations applied to the vast library of Unsplash images.

### Keep the `ixid` Parameter

The one thing you must do to adhere to the Unsplash guidelines is to keep the `ixid` parameter included in every image URL.
