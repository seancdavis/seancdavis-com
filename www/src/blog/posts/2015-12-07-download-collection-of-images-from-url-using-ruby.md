---
title: Download a Collection of Images from URLs using Ruby
description: A quick method and loop to download a collection of images with Ruby.
tags:
  - ruby
---

So there are a set of URLs you'd like to download as images. I'll show you how you can do that with ruby. You could use this [in a command line script](/blog/command-line-scripts-using-ruby/), a rake task, or anywhere else in your code.

## 01: Create URL Collection

First, let's assume we have a set of URLs. It doesn't really matter where they come from (a form input, hard-coded, etc.). Let's first define these URLs as an array.

```ruby
urls = [
  'http://petsfans.com/wp-content/uploads/2014/11/edfsaf.jpg',
  'http://dailynewsdig.com/wp-content/uploads/2012/06/funny-cats.jpg',
  'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg'
]
```

## 02: Method To Download An Image From URL

Next, let's write a method that converts a URL of an image into a local image file.

It's important that wherever you place or write this method, you've included the [`OpenURI`](http://ruby-doc.org/stdlib-2.1.0/libdoc/open-uri/rdoc/OpenURI) class.

```ruby
require 'open-uri'

def download_image(url, dest)
  open(url) do |u|
    File.open(dest, 'wb') { |f| f.write(u.read) }
  end
end
```

This is just a quick little method. `open(url)` will open the URL you've passed it. And then `File.open ...` and `f.write ...` work together to create and open a local file and then write the contents of the url to that file.

The `'wb'` is the _mode_ in which we open the local file. [This StackOverflow answer](http://stackoverflow.com/a/3682374/2241124) pulls out the modes from the Ruby docs.

## 03: Loop Through The URLs

Okay, now let's create a little loop to step through the array and download each of its items.

```ruby
urls.each { |url| download_image(url, url.split('/').last) }
```

Here we're stepping through the array of `urls` and then running our `download_image` method we just created (which means that method needs to already be defined when you run this loop).

Perhaps the only odd-looking thing is `url.split('/').last`. It just takes the segment of the URL _after_ the last slash to create a local file with the same filename.

## 04: More Features?

That gets the trick done pretty simply, but you could take it much farther if you wanted to.

You could add some fallbacks, or `rescue` blocks, in case you run into an error. You could prevent the loop from crapping out just because you have one bad URL.

You could also create a directory to dump these files in, since right now they are just going to dump them in the directory in which the code is being run.

---

[Here's a link to a gist of the code put together](https://gist.github.com/seancdavis/0438bfdfe799d60a1365).
