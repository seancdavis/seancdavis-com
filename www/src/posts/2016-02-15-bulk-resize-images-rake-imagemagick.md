---
title: Bulk Resize Images Using Rake and ImageMagick
description: Got a set of images you need all to conform to the same size? Hate
  doing it manually? Me too. Let's write a rake task to solve our challenge.
tags:
  - rake
  - ruby
image: /blog/default/default-yellow-01.png
---

I'm occasionally left with a set of images of all different sizes, when ultimately I want to use them with a specific size. [ImageMagick](http://www.imagemagick.org/script/index.php) and [Rake](https://github.com/ruby/rake) can help us accomplish this without having to mess with Photoshop.

_A word of warning, though_. We're going to crop to a specific gravity (and I'm only going to show you center cropping). So, if the focus of your images is all over the place, this likely won't work for you.

## Step 01: Setup

If you have Rake and ImageMagick ready to go, great, move on! If not, let's get setup.

We'll assume you have a `Gemfile`. But if not, add it to your project root. You'll need at least these gems:

`Gemfile` {.filename}

```ruby
source 'https://rubygems.org'

gem 'rake'
gem 'imagemagick'
```

Once you've added those, install them to your project. You'll want [Bundler](http://bundler.io/) to help with this.

    $ bundle install

To configure rake, you just need a `Rakefile` at your project's root. Throw this quick one-liner in there.

`Rakefile` {.filename}

```ruby
Dir.glob(File.join('lib/tasks/**/*.rake')).each { |file| load file }
```

This essentially says we're adding any `.rake` file in the `lib/tasks` directory to rake.

Okay, let's move on.

## Step 02: Your Files

Now, determine where your files are. I highly suggest making a copy of them, and dumping them all in the `lib/assets/resize` directory in your project (make it if you don't have it). That's what we'll use for our example.

Copies are always good in case we screw something up. Although we'll be careful, right?

## Step 03: The Rake Task

Let's add the rake task to `lib/tasks`. We'll call it `resize.rake`, so it'll go to `lib/tasks/resize.rake`.

To start, I always like to make sure I'm point to right directory, before I start manipulating files. So, let's add this to the task:

`lib/tasks/resize.rake` {.filename}

```ruby
require 'fileutils'

task :resize do
  dir = File.expand_path('../../assets/resize', __FILE__)
  images = Dir.glob("#{dir}/*.*")
  puts images
end
```

You should be returned with a collection of the images you wish to manipulate. Let's move on.

We already have our collection of images, so we're good there. Next, let's make a directory to put the resized versions of the image in.

```ruby
output_dir = "#{dir}/output"
FileUtils.mkdir(output_dir) unless Dir.exists?(output_dir)
```

Let's do it and then walk through it.

```ruby
images.each do |file_path|
  next if File.directory? file_path
  image = Magick::Image::read(file_path).first
  thumb = image.resize_to_fill(200,200)
  filename = file_path.split('/').last
  thumb.write("#{output_dir}/#{filename}")
  puts "Resized: #{filename}"
end
```

- `images.each do |file_path|`

Remember, `images` is our array of file paths to each image in the `lib/assets/resize` directory.

- `next if File.directory? file_path`

This just tells us to go the next item in the loop if we encounter a directory instead of an image.

- `image = Magick::Image::read(file_path).first`

Here we initialize an ImageMagic instance, which is what we'll use to manipulate the image.

- `thumb = image.resize_to_fill(200,200)`

This is the line that performs the resizing. If you change anything in this task, I suspect this is where you'll start. You can read more about your options [here](https://rmagick.github.io/image3.html#resize).

- `filename = file_path.split('/').last`
- `thumb.write("#{output_dir}/#{filename}")`

The next two lines actually write to file.

- `puts "Resized: #{filename}"`

Above, we had stored `filename` in a variable so we could give some feedback, which is nice when we're dealing with many images at one time. And that's what's happening in the line above.

---

That's it! Altogether it looks like this:

`lib/tasks/resize.rake` {.filename}

```ruby
require 'fileutils'
require 'rmagick'

task :resize do
  dir = File.expand_path('../../assets/resize', __FILE__)
  images = Dir.glob("#{dir}/*.*")

  output_dir = "#{dir}/output"
  FileUtils.mkdir(output_dir) unless Dir.exists?(output_dir)

  images.each do |file_path|
    next if File.directory? file_path
    image = Magick::Image::read(file_path).first
    thumb = image.resize_to_fill(200,200)
    filename = file_path.split('/').last
    thumb.write("#{output_dir}/#{filename}")
    puts "Resized: #{filename}"
  end
end
```
