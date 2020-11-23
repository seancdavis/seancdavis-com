---
title: Convert PDF to Image with Dragonfly and Rails
tags:
  - ruby_on_rails
description: Converting a PDF to an image using Rails and Dragonfly is actually quite simple. Check it out.
---

With other uploaders in rails, it's not super straightforward to convert a PDF to an image. But, by using Dragonfly's [ImageMagick plugin](http://markevans.github.io/dragonfly/imagemagick), it's real simple.

Make sure you're using the ImageMagick plugin.

`config/initializers/dragonfly.rb` {.filename}

```ruby
Dragonfly.app.configure do
  plugin :imagemagick
end
```

And you'll want [GhostScript](http://www.ghostscript.com) installed on your machine.

The markup for it, though is simple. If you want a small, `200x200` thumbnail of a pdf, it's as simple as the following.

```erb
<%= image.image.thumb('200x200#', :format => 'png', :frame => 0).url %>
```

_Note: This assumes you have an `image` object that has an uploader mounted to an `image` accessor. You'll want to update to your application._

---

**References:**

- [Converting PDFs to PNGs with Dragonfly](http://stackoverflow.com/a/24576788/2241124)
