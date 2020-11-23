---
title: When to Use JPGs, PNGs and GIFs on the Web
description: Each filetype has its own place on the web. See where they fit in.
---

The other day my boss asked me to send a graphic. I sent a PNG, but was informed it needed to be a JPG. That seemed an appropriate opportunity to utter my generation's mantra -- _Why?_ Like many conversations that begin with, _I need this filetype instead of that_, I found it wasn't really a need.

Regardless, it led me do some research on _the difference between a PNG and JPG_. For sport, I added GIF files into the mix, because ... well, why not?

Let's step through some use cases to show which filetype is be best.

## Photographs

**Type: JPG**

### Why?

JPG is generally the best file type for digital photography, especially on the web. To understand this, you have to understand the difference between lossy and lossless file compression.

A JPG is a lossy compression of your photographic image, while a PNG provides lossless compression. The biggest difference between lossy and lossless compression is the output. A lossy compression uses an algorithm to very slightly alter each individual pixel so that color is repeatable and file size can be compressed. A lossless compression reduces file size for transmission, but will put everything back together. So, in general, a lossy compression results in a smaller file size and permanently alters the original file.

This makes JPGs ideal for photographic images, especially for the web, as they can compress photos to much smaller file sizes than PNGs without too much noticeable difference in quality.

### Exceptions

The one exception to this guideline would be if you need any transparency in your photo. In you want to preserve transparency, you'll want a PNG.

## Graphic Artwork

**Type: PNG**

### Why?

If you're storing and using locally or using in other artwork programs, you should (obviously) store these file types as their original (vector) art files, be it AI, EPS, PSD, and so on. The advantage to using PNG or JPG for graphic artwork on the web is that, by using lossless compression, the PNG is better able to maintain the sharp edges on lines.

### Web Icons

I'd use PNG only to create complex artwork files you couldn't have otherwise created with CSS. Today, [CSS](/wtf-is-css) is capable of enabling you to create many web elements. And you can't beat CSS for crisp, clear images. Therefore, things like buttons and gradient backgrounds should never be created with an artwork program, but should be created using CSS.

An even better alternative to this is to consider SVG files, which will maintain their vector form even on the web, although their support is more limited.

## Animations

**Type: GIF**

GIF really isn't useful for anything today other than animations. If you're using it for anything else, you're doing something wrong. Really the only practical use, other than animations, is transparency in older browsers. At this point, that means IE6 and earlier. And if you're still supporting IE6, we need to be having a different discussion.

---

**References**

- [What’s the Difference Between JPG, PNG, and GIF?](http://www.howtogeek.com/howto/30941/whats-the-difference-between-jpg-png-and-gif/)
- [Web Designer’s Guide to PNG Image Format](http://sixrevisions.com/web_design/web-designers-guide-to-png-image-format/)
