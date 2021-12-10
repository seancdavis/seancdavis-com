---
title: Use Inline Style Attributes on SVG Elements to Avoid Overwriting Styles
description: When SVGs starting looking weird on your website, it might be
  because their styles are being overwritten.
tags:
  - css
  - svg
image: /posts/default/default-pink-03.png
---

For the past few months, I've been working on a fun project with a lot of animation and iconography. I used it as an excuse to dive into SVGs, and to attempt to use SVG elements as much as possible.

It was going well, for awhile. Then, all of a sudden, some of the SVGs started behaving funny. Their outlines changed color. Part of them were missing.

I figured it was clipping masks, and spent some time down that rabbit hole.

_By the way, if you can, you should expand you objects before exporting to SVG, and avoid attempting to export clipping masks. Its behavior doesn't seem to be consistent._

Anyways, I had an _AHA!_ moment when diving deeper into SVGs recently. By default, Adobe Illustrator tries to save space by abstracting the [CSS](/posts/wtf-is-css/) directives and using classes to target them. If you look near the top of your SVG file, you might see something like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 19.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="1532 -160.8 3264.6 521.8" style="enable-background:new 1532 -160.8 3264.6 521.8;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:#356680;}
    .st1{fill:#58A6AE;}
    .st2{fill:#FFFFFF;}
    .st3{fill:#E6E7E8;}
    .st4{fill:#3C7337;}
  </style>
  <!-- Here's where the artwork goes ... -->
</svg>
```

And then you'd see `.st0` used throughout the SVG.

Well, Adobe Illustrator is so generic in its class names that if you build two separate SVG files in two separate Illustrator projects, it's likely you'll have a conflict. And because CSS _cascades_, whichever SVG is loaded _last_ on the page will be the one that controls the styles for any classes it declares.

That's going to lead to unintended results _eventually_.

To get around this, Illustrator provides the option to put these styles inline. Yes, it may make the file a bit bigger, but it's worth it.

When you are saving to SVG, just choose _Style Attributes_ **not** Style Elements.

{% post_image
    alt="Adobe Illustrator Inline Styles",
    src="/posts/160317/svg-inline-styles.png",
    classes="my-0",
    flatten=true %}

Do that and then you'll see the styles spread throughout and avoid those nasty conflicts!
