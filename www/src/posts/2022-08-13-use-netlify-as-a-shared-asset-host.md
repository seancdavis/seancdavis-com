---
title: Use Netlify as a Shared Asset Host
description: >-
  When you need to share media assets across multiple sites, you can take
  advantage of tools you’re already using to make that process simple and
  convenient.
tags:
  - netlify
tweet: >-
  I love finding uncommon ways to use @nelity’s CDN-driven hosting service as a
  way to boost my productivity.
image: /posts/220813/use-netlify-as-a-shared-asset-host-Ck50oQy2.png
seo:
  image: /posts/220813/use-netlify-as-a-shared-asset-host-vy2ftW2D--meta.png
---

While I love using file-based content (Markdown, JSON, etc.) as the source for web properties, I find committing assets to those same repos to be problematic.

## Avoid Committing Assets

Generally, I avoid committing assets to code repositories for three reasons:

1. It can _very quickly_ bloat the size of the repository. This makes everything take longer — collaboration among other developers, production build times, CI runs, etc. And that can have a residual effect on cost.
1. Front-end optimizations are challenging. Some frameworks like Next.js have image-serving capabilities built-in. But there are many services out there that are focused exclusively on optimizations like this, and they won't work when your assets are used within your repository.
1. They _feel_ tied specifically to a single web property, making it more likely that you're going to (unnecessarily) duplicate the asset if using it in another project.

## The Typical Solution

There are two solutions I see most frequently used to curb these problems:

- Use a service like [Cloudinary](https://cloudinary.com/) to host, transform/optimize, and serve assets.
- Move to (or rely on) a CMS with these capabilities. (Many CMSs are beginning to introduce CDN-based image serving, along with transformations.)

## An Alternative Approach with Netlify

If you're already using Netlify to deploy and host web projects, you can take advantage of the service and use it to host shared assets for your projects.

### How it Works

To do this, create a new Git repository exclusively for storing assets. This can be images, fonts, [JavaScript libraries](/posts/use-netlify-host-js-libraries/), or any other files you want to share among your projects.

Then you push these to a new Netlify site. There's no build involved, so assets pushed to your main Git branch are typically available within seconds.

You can even choose to tie a custom domain to your project — e.g. assets.example.com.

### Combining with Netlify Large Media & Git LFS

If you combine this solution with [Netlify's Large Media feature](https://docs.netlify.com/large-media/overview/) (which uses [Git LFS](https://git-lfs.github.com/)), Netlify also provides the ability to [transform images](https://docs.netlify.com/large-media/transform-images/) on the fly, making this solution competitive with other CDN asset providers.

### It's Still Committing Assets

Wait. Isn't this what I said _not_ to do? Yes, sort of.

This repository can get bloated. It requires Git LFS to optimize, and that can get expensive. But, the repo is one in which developers aren't trying to do anything else, which lessens the frustration with bloat.

Because of that, this may not be the answer for _all_ of your assets. But it's a very quick and convenient way to share assets across projects using the tools and services you're already familiar with.
