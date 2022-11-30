---
title: Capturing Screenshots for Documentation and Blog Posts
description: >-
  Images can be a valuable aid to written content. But getting them right is
  time-consuming without the right tools and processes in place.
tags:
  - documentation
  - productivity
image: >-
  /posts/221130/capturing-screenshots-for-documentation-and-blog-posts-P2Edhh8n.png
seo:
  image: >-
    /posts/221130/capturing-screenshots-for-documentation-and-blog-posts-x0XxrEh9--meta.png
---

Adding a screenshot to a piece of documentation or a blog post typically requires a series of actions:

1. **Capture:** First, you have to capture the screenshot you want to present.
1. **Edit/Annotate:** Crop, mark up, compress, and make other changes to help the viewer focus on what you're trying to communicate.
1. **Upload:** Put the screenshot file in some location that can be consumed by the site's code.
1. **Beautify (optional):** Make it shine to capture and further focus the reader's attention. (May come before Step 3 in some cases.)

Let's walk through each of these, looking at the tools and processes I use, along with alternatives and other approaches I've found along the way.

## 1. Capture

The first step is actually capturing the image that we want to work with.

I'm currently using [CleanShot X](https://cleanshot.com/) for this. I'm in love with this product. It has made me so efficient with both capturing _and_ annotating/editing screenshots (Step 2).

{% youtube_embed id="FZbICrBKWIU" %}

It works by taking over the native Mac OS X screenshot controls, then providing you with a number of options for annotating, cropping, sharing, etc.

### Alternative Screenshot Tools

I've used many others in the past and have never been truly happy. The native Mac OS X tooling has evolved to be somewhat useful, but these focused products are _significantly_ more productive and feature-full.

The only alternative I've come across recently that seems to match (or perhaps _surpass_) CleanShot's feature set is [shottr](https://shottr.cc/).

### Setting up for a Capture

Depending on the tooling you're using, there's a lot of magic you can introduce to edit an image after you've captured it. But, you also want to set yourself up for success.

Here are a few tips I've learned to make the editing process easier:

- **Be Realistic:** You want to capture what your readers are actually going to see. Avoid presenting scenarios that users are unlikely to encounter.
- **Use Defaults:** To aid with realism, avoid introducing a lot of customizations to what is seen on screen. For example, if capturing within a browser, either omit the window around the browser or use a "profile" that doesn't have plugins, extensions, custom theming, etc. All of these will be distracting and take away from what you're looking to communicate.
- **Remove Distractions:** Similar to using default, be sure to remove other distractions that don't help the user. For example, if showing your desktop, remove icons from your desktop.
- **Zoom In / Focus:** You can certainly crop, zoom, rotate, and scale later, but it's easier if you don't have to. Present the information in the best possible way when capturing. Only show the user what they need to get the context.
- **Balance Padding:** Balance your whitespace and your padding as much as possible when capturing. You don't have to obsess over it, but it's also best to not have to rely on cropping within these annotation tools, as it may not be flexible enough to capture exactly what you need. But when capturing, you can control the boundaries down to the pixel.

## 2. Annotate

In my case, I'm able to use CleanShot for both capturing and annotation. In the past, I've used native Mac OS X controls, or less impressive tools like [Skitch](https://evernote.com/products/skitch).

{% post_image alt="", src="/uploads/221130/CleanShot_2022-09-14_at_06.51.112x.png" %}

When this step is complete, there should be an image that can focus the reader on exactly what is being presented.

### Tips for Annotating

Here are a few tips to consider while annotating an image:

- **Use Bright Colors:** Use a bright and bold color that doesn't clash with the other content on screen (usually red works well). You want readers to _immediately_ see what you've annotated.
- **Use Counters:** When wanting to highlight more than two elements within your image, use a counter (number inside a bold-colored circle) and list the items above or below the image in text.
- **Obfuscate Sensitive Information:** If there's something sensitive on screen, like an API key, that's okay, but be sure to obfuscate it. Tools like CleanShot X and shottr have several options for making sensitive information illegible.

### Optimize File Size

If you're not using a service that will aid in the performance of your image files, be sure to optimize them before uploading.

{% post_image alt="", src="/uploads/221130/CleanShot_2022-09-14_at_06.52.492x.png" %}

I use [ImageOptim](https://imageoptim.com/mac), but there are many tools that can get the job done.

## 3. Upload

Where you put the images depends on how you are going to consume these images.

{% post_image alt="", src="/uploads/221130/CleanShot_2022-09-14_at_06.54.332x.png" %}

I have a number of different scenarios that I follow today:

- For my blog, I use [Transmit](https://panic.com/transmit/) to upload the images to S3, which I then consume using [Imgix](https://imgix.com/).
- For documentation at [Stackbit](https://www.stackbit.com/), we are currently using images directly in the Git repo. I first optimize them and then commit them to Git locally.
- For other projects at Stackbit, we're using [Cloudinary](https://cloudinary.com/), so I upload the images directly.

### Use an Image Delivery Service

Like most of these steps, there is no perfect solution. The one thing I can recommend is that you use a service like Imgix or Cloundinary (or a CMS). These are built to deliver images from a CDN, which optimizes performance for users consuming the images over the web. And most come with some image manipulation API to enable you to transform images on the fly just by changing parameters in the URL.

## (Bonus) Beautify

There are three options when it comes to beautifying the image:

1. **Don't do it:** When writing content for the web, it's not always necessary.
1. **Before you upload:** You can use a design tool like [Figma](https://www.figma.com/) to manually add your style to these screenshots. There are also tools like [Pika](https://pika.style/) that provide a more templated, turnkey solution.
1. **On the fly:** Instead of manipulating the image, you can use components/CSS on your site to present the image in a more refined way without creating an additional image.

### Choosing the Right Option

My take is that it depends on your scenario and the goal of your content. As a few examples:

- If you're trying to move fast, ignore it. In many cases (but certainly not all), it's your written content that is far more important.
- To test that it wouldn't help your case, try using something quick like Pika on a few pieces of content and not on others. Which ones do better? Is that related to the images? While your data would be more accurate if you perform a true A/B test, even something simple like this may provide you with useful information.
- For evergreen content (like documentation), be cautious to provide too much styling to images _before_ uploading. Anything that ties your image to some brand or style is locked in. To evolve the site's look and feel may mean regenerating every image.

All that is to say, it doesn't hurt to make something more refined. Just make sure it's serving you well.

---

This was the process I follow for capturing and presenting screenshots for the technical writing I do today. Take this and apply it however it best suits your work. And let me know what works well for you — I'm always interested to learn new tools and techniques.
