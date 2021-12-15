---
title: How to Use imgix with Contentful
description: imgix is a powerful image delivery and processing tool that can be
  sourced atop any set of assets with a consistent URL structure, which includes
  Contentful.
tags:
  - contentful
  - imgix
image: /posts/default/default-orange-02.png
---

[imgix](https://www.imgix.com/) is a really great image delivery and manipulation tool. It has [an extensive and powerful API](https://docs.imgix.com/apis/url) which drives processing of the image before delivery. And it caches images by delivering them through a CDN (content delivery network). imgix [does not have a free tier](https://www.imgix.com/pricing), but I find it to be absolutely worth the cost.

Typically we see imgix used most with [cloud storage providers like s3](https://docs.imgix.com/setup/creating-sources/amazon-s3), but it can actually deliver images [from any web folder](https://docs.imgix.com/setup/creating-sources), which essentially means _any set of images with a predictable and consistent URL structure_.

And when you retrieve assets from Contentful, you'll notice they have just that -- a consistent URL structure. It looks like this: `https://images.ctfassets.net/<space_id>/<image_id>/<image_token>/<filename>`.

Notice that each image is accessible behind its `space_id`. This is the crux of how we get imgix to play well with Contentful without letting others abuse your imgix account. The `images.ctfassets.net` domain from which the images are delivered are shared among all Contentful accounts. That means if you added `https://images.ctfassets.net` as your source, anyone could use your imgix account to deliver their Contentful assets.

So, the way you set up imgix just for your Contentful space is to configure a source to use a web folder with the following URL structure: `https://images.ctfassets.net/<space_id>`.

Once you have that in place any image that was available from `https://images.ctfassets.net/<space_id>/<image_id>/<image_token>/<filename>` is now available from `https://<imgix_domain>/<image_id>/<image_token>/<filename>`. Note the difference -- **replace `images.ctfassets.net/<space_id>` with your imgix domain** and -- voila! -- you are serving Contentful assets from imgix and now have the power of the imgix transformations.

### Caveat

One major caveat before we depart from this thrilling monologue. Contentful has [an Images API](https://www.contentful.com/developers/docs/references/images-api/), which uses similar URL parameters to manipulate and deliver images to you.

If you aren't already paying for imgix and if you don't need some of the more fine-grained controls offered by imgix (i.e. if you only need some basic cropping tools), then I'd recommend using the Contentful Images API since you're already paying for it. Contentful's assets are also delivered via a CDN, which means you still have the benefit of caching and quick delivery from all over the world.

In other words, this was an example of how you _could_ enable imgix to serve your Contentful assets, not that you _should_. It, no doubt, complicates your asset delivery, so if you can stick with using the Contentful Images API, do that instead.
