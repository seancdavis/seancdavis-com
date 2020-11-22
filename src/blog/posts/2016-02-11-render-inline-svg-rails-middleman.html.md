---
title: Render an Inline SVG in Rails (or Middleman)
description: You can avoid multiple requests to your server by rendering SVG images inline to the rest of your HTML.
tags:
  - ruby
  - ruby_on_rails
  - middleman
---

I've been using [SVGs](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) a lot lately. Among an array of benefits for using SVG images, there are two that stand above the others in my mind:

1. They are, as their name suggests, _scalable_.
2. The reason they are scalable is because they are text files (if you've looked at them, they just look like XML). That means they can be rendered to an [HTML](/wtf-is-html) page without a request to the server for an image.

Let's address the second point within the context of Ruby -- namely, [Rails](http://rubyonrails.org/) or [Middleman](https://middlemanapp.com/).

First thing's first. The only way to avoid a request to the server for an image is to render them inline. In other words, you wouldn't use `image_tag`, you'd just use some form of `render`, which we'll get into.

Let's look at two ways we can accomplish this.

## Method 01: The Long Way

Since SVGs are really just XML files, we can render them as though they are part of our HTML output. In Rails and Middleman, we call these _partials_ or _partial views_.

To do this, take your SVG file and rename it. You need to **prepend it with an underscore** and use the `html` file extension, and append your templating language's extension.

So, for example, let's say I have a file, `logo.svg`, and I am using eRuby (erb) as my templating system. I would rename the file to `_logo.html.erb`.

Then we need to place it somewhere available to use. In Rails, I'd put it in `app/views/svg/_logo.html.erb`. In Middleman, I'd put it in `source/svg/_logo.html.erb`.

Then, you can add an image simply by rendering the partial.

Rails:

```erb
<%= render :partial => 'svg/logo' %>
```

Middleman:

```erb
<%= partial 'svg/logo' %>
```

Magic!

## Method 02: Dynamic Rendering

The first approach is fine, but there are a few aspects of it I'm not super fond of.

First, we're moving image files out of `app/assets/images` (Rails) or `source/images` (Middleman), where they'd typically (and are semantically expected to) be. Second, you have to rename the file extension. Even though it doesn't change the file's behavior, it feels dirty to me.

So how about we get a little clever?

Instead of rendering a partial every time, what if we just read the file from where it exists within the app? To do so, let's create a helper method.

```ruby
# Rails
def svg(name)
  file_path = "#{Rails.root}/app/assets/images/#{name}.svg"
  return File.read(file_path).html_safe if File.exists?(file_path)
  '(not found)'
end

# Middleman
def svg(name)
  root = Middleman::Application.root
  file_path = "#{root}/source/images/#{name}.svg"
  return File.read(file_path) if File.exists?(file_path)
  '(not found)'
end
```

What we're doing here is looking in the typical location of images in your app for an image with the name you pass it. If we find it, then we read the image and return that result (the XML text). If not, we say "(not found)" instead of causing an error.

So, to render inside a view is as simple as:

```erb
<%= svg 'logo' %>
```

### Boost Performance With Fragment Caching

After publishing this post, I received a tip from [Hans Gerwitz](http://hans.gerwitz.com/) on [fragment caching](http://guides.rubyonrails.org/caching_with_rails.html) (with the Rails approach).

All you need to do is wrap the method's output in a `cache` block. But, you'd likely only want to cache if you find the file. So, something like this should do the trick.

```ruby
# Rails
def svg(name)
  file_path = "#{Rails.root}/app/assets/images/#{name}.svg"
  if File.exists?(file_path)
    cache { File.read(file_path).html_safe }
  else
    '(not found)'
  end
end
```

_Note: I have not yet used the approach, so not certain this will work as expected._

I asked Hans about busting the cache. While it's not an issue in development (you're not usually caching in development), he simply busts the cache on every deploy, so it becomes a non-issue.

### Add a (Dynamic) Fallback

If you want to get extra clever with it, you can have a fallback. For example, if you don't find the svg, then you want to render a png with that name. If we used that example, then the Rails approach might look something like this:

```ruby
# Rails
def svg(name)
  file_path = "#{Rails.root}/app/assets/images/#{name}.svg"
  return File.read(file_path).html_safe if File.exists?(file_path)
  fallback_path = "#{Rails.root}/app/assets/images/png/#{name}.png"
  return image_tag("png/#{name}.png") if File.exists?(fallback_path)
  '(not found)'
end
```

It's not pretty, but something like it may come in handy.

## Tips!

I'll wrap this up by saying that I have not done any performance benchmark studies here. It's quite possible these approaches are slower than rendering an image. I will say I like them and I've had success with them.

Although I do tend to look out for file size. Avoid using SVGs when they are larger than their PNG counterpart. That means it's complex. Generally, I try to avoid using SVG when excess layering, masking, shadows, or gradients are involved. For example, [this Apple](http://vignette1.wikia.nocookie.net/logopedia/images/0/02/Monochrome-Apple.png/revision/latest?cb=20100708111537) would be more complex than [its flat, monochromatic counterpart](http://cdn.osxdaily.com/wp-content/uploads/2010/10/giant-apple-logo-bw.png)
